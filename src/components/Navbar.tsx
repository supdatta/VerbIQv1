import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { LogOut, Menu, X, Settings, Globe, Shield, Check, AlertCircle } from "lucide-react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface ApiSettingsProps {
  apiUrl: string;
  setApiUrl: (url: string) => void;
  isTesting: boolean;
  testStatus: 'idle' | 'success' | 'error';
  testConnection: () => Promise<void>;
  saveApiUrl: () => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  trigger?: React.ReactNode;
}

const ApiSettingsDialog = ({ 
  apiUrl, 
  setApiUrl, 
  isTesting, 
  testStatus, 
  testConnection, 
  saveApiUrl, 
  isOpen, 
  setIsOpen,
  trigger
}: ApiSettingsProps) => (
  <Dialog open={isOpen} onOpenChange={setIsOpen}>
    {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
    <DialogContent className="sm:max-w-[425px] retro-card border-2 border-border bg-card p-0 overflow-hidden">
      <div className="bg-primary/10 px-6 py-4 border-b-2 border-border flex items-center gap-3">
        <Globe className="w-5 h-5 text-primary" />
        <DialogTitle className="font-heading text-lg">Network Settings</DialogTitle>
      </div>
      
      <div className="p-6 space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Backend Endpoint
            </label>
            {testStatus === 'success' && (
              <span className="text-[10px] font-bold text-success flex items-center gap-1 bg-success/10 px-2 py-0.5 rounded-full">
                <Check className="w-3 h-3" /> ONLINE
              </span>
            )}
            {testStatus === 'error' && (
              <span className="text-[10px] font-bold text-destructive flex items-center gap-1 bg-destructive/10 px-2 py-0.5 rounded-full">
                <AlertCircle className="w-3 h-3" /> OFFLINE
              </span>
            )}
          </div>
          
          <div className="relative group">
            <Input 
              value={apiUrl} 
              onChange={(e) => setApiUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'v' && (e.ctrlKey || e.metaKey)) {
                  e.stopPropagation();
                }
              }}
              placeholder="https://xxxx.ngrok-free.app"
              className="retro-input pr-10 h-12 font-mono text-sm"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
              <Globe className="w-4 h-4" />
            </div>
          </div>
          
          <p className="text-xs text-muted-foreground leading-relaxed italic">
            Connect to your local AI engine or ngrok tunnel. Do not include <code className="bg-muted px-1 rounded">/analyze</code> at the end.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Button 
            onClick={testConnection} 
            disabled={isTesting}
            variant="outline"
            className={`h-11 retro-button border-2 transition-all ${
              testStatus === 'success' ? 'border-success/50 text-success' : 
              testStatus === 'error' ? 'border-destructive/50 text-destructive' : ''
            }`}
          >
            {isTesting ? (
              <span className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Settings className="w-4 h-4" />
                </motion.div>
                VERIFYING...
              </span>
            ) : "TEST CONNECTION"}
          </Button>
          
          <Button 
            onClick={saveApiUrl} 
            className="h-11 bg-primary text-white retro-button glow-pink"
          >
            APPLY SETTINGS
          </Button>
        </div>
      </div>
    </DialogContent>
  </Dialog>
);

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [apiUrl, setApiUrl] = useState(localStorage.getItem("emergency_api_url") || "http://127.0.0.1:5000");
  const [isTesting, setIsTesting] = useState(false);
  const [testStatus, setTestStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const testConnection = async () => {
    setIsTesting(true);
    setTestStatus('idle');
    try {
      // Clean URL for testing
      let testUrl = apiUrl.replace(/\/+$/, "");
      if (testUrl.endsWith("/analyze")) {
        testUrl = testUrl.replace(/\/analyze$/, "");
      }

       // We use a POST to /analyze with empty data or a GET to / as a health check
       // Given the user's backend, let's try a simple GET first
       await axios.get(testUrl, { 
         timeout: 5000,
         headers: {
           "ngrok-skip-browser-warning": "true",
         }
       });
       
       setTestStatus('success');
       toast({
        title: "Connection Successful",
        description: "Backend is reachable!",
      });
    } catch (error) {
      setTestStatus('error');
      toast({
        title: "Connection Failed",
        description: "Could not reach the backend. Please check the URL and ensure the server is running.",
        variant: "destructive",
      });
    } finally {
      setIsTesting(false);
    }
  };

  const saveApiUrl = () => {
    // Trim trailing slashes and remove /analyze if present
    let cleanedUrl = apiUrl.trim().replace(/\/+$/, "");
    if (cleanedUrl.endsWith("/analyze")) {
      cleanedUrl = cleanedUrl.replace(/\/analyze$/, "");
    }
    
    if (!cleanedUrl.startsWith("http")) {
      cleanedUrl = "http://" + cleanedUrl;
    }

    localStorage.setItem("emergency_api_url", cleanedUrl);
    setApiUrl(cleanedUrl);
    toast({
      title: "Settings Saved",
      description: `Backend target updated to: ${cleanedUrl}`,
    });
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navLinks = [
    ...(isAuthenticated ? [
      { to: "/dashboard", label: "Modules" },
      { to: "/ai-interviewer", label: "AI Interviewer", isPremium: true }
    ] : []),
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <div className="max-w-7xl mx-auto">
        <div className="bg-card border-2 border-border rounded-lg shadow-[3px_3px_0_0_hsl(var(--border))] px-6 py-3 flex items-center">
          <div className="flex-1 flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <img 
                src="/logo-sheet.png" 
                alt="VerbIQ Logo" 
                className="logo-small"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <span className="font-semibold text-lg gradient-pixel-orange-red hidden">
                VerbIQ
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center justify-center flex-1 gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-colors duration-300 flex items-center gap-1 ${
                  location.pathname === link.to
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="flex-1 flex items-center justify-end gap-4">
            <div className="hidden md:flex items-center gap-4">
              <ModeToggle />
              
              {/* API Settings */}
              <ApiSettingsDialog 
                apiUrl={apiUrl}
                setApiUrl={setApiUrl}
                isTesting={isTesting}
                testStatus={testStatus}
                testConnection={testConnection}
                saveApiUrl={saveApiUrl}
                isOpen={isSettingsOpen}
                setIsOpen={setIsSettingsOpen}
                trigger={
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary transition-colors">
                    <Settings className="w-5 h-5" />
                  </Button>
                }
              />

              {isAuthenticated ? (
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">
                    Welcome, <span className="text-primary font-medium">{user?.username}</span>
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </div>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="ghost" size="sm">
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden mt-2 retro-card p-4"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-foreground hover:text-primary transition-colors flex items-center justify-between"
              >
                {link.label}
              </Link>
              ))}
              {isAuthenticated ? (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between px-2">
                    <span className="text-sm text-muted-foreground">Settings</span>
                    <ApiSettingsDialog 
                      apiUrl={apiUrl}
                      setApiUrl={setApiUrl}
                      isTesting={isTesting}
                      testStatus={testStatus}
                      testConnection={testConnection}
                      saveApiUrl={saveApiUrl}
                      isOpen={isSettingsOpen}
                      setIsOpen={setIsSettingsOpen}
                      trigger={
                        <Button variant="ghost" size="icon" className="text-muted-foreground">
                          <Settings className="w-5 h-5" />
                        </Button>
                      }
                    />
                  </div>
                  <Button variant="ghost" onClick={handleLogout} className="justify-start">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </div>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full">Login</Button>
                  </Link>
                  <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full bg-primary text-primary-foreground">Sign Up</Button>
                  </Link>
                </>
              )}
              <div className="flex justify-start">
                <ModeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
