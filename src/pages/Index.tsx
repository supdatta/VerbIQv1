import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Mic, Brain, TrendingUp, Zap, Cpu, Terminal, Sparkles, Code, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleViewModules = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  const features = [
    {
      icon: Mic,
      title: "Voice Analysis",
      description: "Record your speech and get instant AI-powered feedback on delivery, tone, and clarity."
    },
    {
      icon: Brain,
      title: "Smart Coaching",
      description: "Personalized coaching tips tailored to interviews, debates, and group discussions."
    },
    {
      icon: TrendingUp,
      title: "Track Progress",
      description: "Monitor your improvement with detailed analytics and performance insights."
    }
  ];

  const steps = [
    { number: "01", title: "Record", icon: Mic, description: "Speak naturally on your chosen topic" },
    { number: "02", title: "Analyze", icon: Cpu, description: "Our AI processes your tone and content" },
    { number: "03", title: "Improve", icon: Sparkles, description: "Get personalized feedback and metrics" }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-background overflow-hidden bg-grid-slate-100">
        <Navbar />

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-6 pt-24">
          {/* Decorative Elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Floating Icons */}
            <motion.div 
              animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[20%] left-[10%] p-4 bg-primary/10 rounded-2xl border-2 border-primary/20 hidden lg:block"
            >
              <Zap className="w-8 h-8 text-primary" />
            </motion.div>
            <motion.div 
              animate={{ y: [0, 20, 0], rotate: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute top-[60%] right-[15%] p-4 bg-accent/10 rounded-2xl border-2 border-accent/20 hidden lg:block"
            >
              <Brain className="w-10 h-10 text-accent" />
            </motion.div>
            <motion.div 
              animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-[20%] left-[15%] p-3 bg-secondary/10 rounded-full border-2 border-secondary/20 hidden lg:block"
            >
              <Terminal className="w-6 h-6 text-secondary" />
            </motion.div>
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-[15%] right-[10%] p-3 bg-primary/5 rounded-full border border-dashed border-primary/30 hidden lg:block"
            >
              <Code className="w-12 h-12 text-primary/40" />
            </motion.div>

            {/* Glowing Orbs */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[140px]" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            {/* Existing Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border-2 border-primary/20 rounded-full text-[#FF4500] text-sm font-medium mb-8">
                <span className="w-2 h-2 bg-[#FF4500] rounded-full animate-pulse-soft" />
                The Leetcode for Soft Skills
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-foreground mb-6 text-5xl md:text-7xl font-bold tracking-tight"
            >
              Master the{" "}
              <span className="gradient-pixel-orange-red block md:inline">Art of Speech</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              Practice interviews, debates, and group discussions with AI-powered 
              feedback. Level up your communication skills and land your dream opportunities.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link to="/dashboard">
                <Button 
                  size="lg" 
                  className="retro-button bg-[#FF4500] text-white px-10 py-7 text-xl hover:bg-[#FF4500]/90 border-[#FF4500] shadow-[4px_4px_0_0_#8B0000] active:shadow-none active:translate-x-1 active:translate-y-1"
                >
                  Start Practicing
                  <ArrowRight className="w-6 h-6 ml-2" />
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg" 
                className="retro-button bg-card px-10 py-7 text-xl border-2 border-border"
                onClick={handleViewModules}
              >
                View Modules
              </Button>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-6 h-10 border-2 border-border rounded-full flex items-start justify-center p-1"
            >
              <motion.div className="w-1.5 h-3 bg-[#FF4500] rounded-full" />
            </motion.div>
          </motion.div>
        </section>

        {/* How it Works Section */}
        <section className="py-32 px-6 relative overflow-hidden">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                How <span className="gradient-pixel-orange-red">VerbIQ</span> Works
              </h2>
              <div className="w-24 h-1.5 bg-primary mx-auto rounded-full mb-6" />
            </motion.div>

            <div className="grid md:grid-cols-3 gap-12 relative">
              {/* Connecting Lines (Desktop) */}
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 border-t-2 border-dashed border-border -translate-y-1/2 z-0" />
              
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className="relative z-10 flex flex-col items-center text-center"
                  >
                    <div className="w-20 h-20 bg-card border-4 border-border rounded-2xl flex items-center justify-center mb-6 shadow-[6px_6px_0_0_hsl(var(--border))] group hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
                      <Icon className="w-10 h-10 text-primary group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="absolute -top-4 -right-4 text-4xl font-bold opacity-10 font-mono">
                      {step.number}
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-3">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-32 px-6 bg-muted/30 border-y-2 border-border relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Cpu className="w-64 h-64" />
          </div>
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                AI-Powered <span className="gradient-pixel-orange-red">Excellence</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Our intelligent system leverages Gemini AI to analyze every aspect of your communication skills
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="retro-card-hover p-10 bg-card group"
                  >
                    <div className="w-16 h-16 bg-[#FF4500]/10 border-2 border-[#FF4500]/20 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-colors">
                      <Icon className="w-8 h-8 text-[#FF4500] group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      {feature.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Tech Stack/Integrations Section */}
        <section className="py-20 px-6 border-b-2 border-border">
          <div className="max-w-6xl mx-auto flex flex-wrap justify-center items-center gap-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center gap-2 font-bold text-xl"><Brain className="w-6 h-6" /> Gemini AI</div>
            <div className="flex items-center gap-2 font-bold text-xl"><Code className="w-6 h-6" /> React + TS</div>
            <div className="flex items-center gap-2 font-bold text-xl"><Zap className="w-6 h-6" /> Tailwind</div>
            <div className="flex items-center gap-2 font-bold text-xl"><Terminal className="w-6 h-6" /> Flask</div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="retro-card p-12 md:p-20 relative overflow-hidden group"
            >
              {/* Background Glow */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 rounded-full blur-[80px] group-hover:bg-primary/30 transition-colors" />
              
              <div className="relative z-10">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8 border-2 border-primary/20">
                  <Trophy className="w-10 h-10 text-primary" />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                  Ready to Level Up?
                </h2>
                <p className="text-xl text-muted-foreground mb-12 max-w-lg mx-auto leading-relaxed">
                  Join the hackathon project that's changing how people prepare for high-stakes communication.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/signup">
                    <Button 
                      size="lg" 
                      className="retro-button bg-[#FF4500] text-white px-12 py-8 text-xl shadow-[6px_6px_0_0_#8B0000] active:shadow-none active:translate-x-1 active:translate-y-1"
                    >
                      Start Practicing Now
                      <ArrowRight className="w-6 h-6 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 border-t-2 border-border bg-card">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col items-center md:items-start gap-4">
              <div className="flex items-center gap-2">
                <img 
                  src="/logo-sheet.png" 
                  alt="VerbIQ Logo" 
                  className="logo-expanded"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <span className="font-bold gradient-pixel-orange-red text-2xl hidden">VerbIQ</span>
              </div>
              <p className="text-sm text-muted-foreground max-w-xs text-center md:text-left">
                The ultimate platform for mastering soft skills through AI-powered feedback.
              </p>
            </div>
            
            <div className="flex gap-8 text-sm font-bold uppercase tracking-widest text-muted-foreground">
              <Link to="/dashboard" className="hover:text-primary transition-colors">Modules</Link>
              <Link to="/login" className="hover:text-primary transition-colors">Login</Link>
              <Link to="/signup" className="hover:text-primary transition-colors">Join</Link>
            </div>

            <div className="flex flex-col items-center md:items-end gap-2">
              <p className="text-sm font-mono text-muted-foreground">
                © 2026 VerbIQ | Hackathon Project
              </p>
              <div className="flex gap-4">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" title="Systems Online" />
                <span className="text-[10px] uppercase tracking-tighter text-muted-foreground">Systems Online</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </PageTransition>
  );
};

export default Index;
