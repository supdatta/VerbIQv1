import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowRight, Check, Gamepad2, Mail, User, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import { useAuth } from "@/contexts/AuthContext";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);

    login(username, "12345");

    toast({
      title: "Account Created!",
      description: "Welcome to VerbIQ, Player!",
    });
    navigate("/dashboard", { replace: true });
  };

  const benefits = [
    "Unlimited practice sessions",
    "AI-powered feedback",
    "Track your progress",
    "Access all modules"
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-background scanlines">
        <Navbar />

        <div className="min-h-screen flex items-center justify-center px-6 pt-24 pb-12">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-secondary/20 blur-3xl animate-float" />
            <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-accent/20 blur-3xl animate-float" style={{ animationDelay: "1s" }} />
            
            {/* Grid pattern */}
            <div 
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `
                  linear-gradient(var(--border) 1px, transparent 1px),
                  linear-gradient(90deg, var(--border) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px'
              }}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 w-full max-w-md"
          >
            <div className="retro-card p-8 md:p-10 glow-yellow">
              {/* Decorative corners */}
              <div className="absolute top-2 left-2 w-6 h-6 border-t-4 border-l-4 border-secondary" />
              <div className="absolute top-2 right-2 w-6 h-6 border-t-4 border-r-4 border-secondary" />
              <div className="absolute bottom-2 left-2 w-6 h-6 border-b-4 border-l-4 border-secondary" />
              <div className="absolute bottom-2 right-2 w-6 h-6 border-b-4 border-r-4 border-secondary" />
              
              <div className="text-center mb-6">
                <p className="text-muted-foreground">
                  Create your account to start
                </p>
              </div>

              {/* Benefits */}
              <div className="mb-6 space-y-2">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 text-muted-foreground"
                  >
                    <div className="w-6 h-6 bg-accent border-2 border-border flex items-center justify-center">
                      <Check className="w-4 h-4 text-accent-foreground" />
                    </div>
                    {benefit}
                  </motion.div>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground flex items-center gap-2">
                    <Mail className="w-4 h-4 text-secondary" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="retro-input h-12 text-lg"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username" className="text-foreground flex items-center gap-2">
                    <User className="w-4 h-4 text-secondary" />
                    Username
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Choose a username"
                    className="retro-input h-12 text-lg"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-foreground flex items-center gap-2">
                    <Lock className="w-4 h-4 text-secondary" />
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create a password"
                      className="retro-input h-12 text-lg pr-12"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full retro-button bg-secondary text-secondary-foreground h-14 text-lg"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-5 h-5 border-4 border-secondary-foreground/30 border-t-secondary-foreground animate-spin" />
                      CREATING...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      CREATE ACCOUNT
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-muted-foreground">
                  Already a player?{" "}
                  <Link to="/login" className="text-primary hover:underline font-bold">
                    SIGN IN
                  </Link>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Signup;
