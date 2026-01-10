import { motion } from "framer-motion";
import { Check, Star, Crown, ArrowLeft, Sparkles, Zap, Shield, Rocket } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";

const Premium = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: "FREE",
      price: "₹0",
      description: "Perfect for getting started",
      features: [
        "Basic Practice Modules",
        "Public Tips & Tricks",
        "3 AI Analysis per day",
        "Community Support"
      ],
      buttonText: "CURRENT PLAN",
      buttonVariant: "outline" as const,
      highlight: false
    },
    {
      name: "PRO",
      price: "₹999",
      description: "The complete VerbIQ experience",
      features: [
        "Unlimited AI Interviewer",
        "Real-time Memory Bot",
        "Advanced Voice Analytics",
        "Priority AI Processing",
        "All Premium Modules",
        "Exclusive Strategy Tips"
      ],
      buttonText: "GO PREMIUM",
      buttonVariant: "default" as const,
      highlight: true
    }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-background scanlines">
        <Navbar />

        <div className="pt-24 pb-16 px-6">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border-2 border-primary/20 rounded-full text-primary font-bold mb-6">
                <Crown className="w-5 h-5" />
                UPGRADE TO PREMIUM
              </div>
              <h1 className="text-4xl md:text-6xl font-heading mb-6">
                Unlock Your Full <span className="text-primary">Potential</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Get unlimited access to the AI Interviewer, advanced analytics, and 
                personalized coaching with VerbIQ Pro.
              </p>
            </motion.div>

            {/* Pricing Grid */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {plans.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`retro-card p-8 flex flex-col relative ${
                    plan.highlight ? 'border-primary glow-yellow' : ''
                  }`}
                >
                  {plan.highlight && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                      <Star className="w-4 h-4 fill-current" />
                      MOST POPULAR
                    </div>
                  )}

                  <div className="mb-8">
                    <h3 className="text-2xl font-heading mb-2">{plan.name}</h3>
                    <div className="flex items-baseline gap-1 mb-4">
                      <span className="text-5xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                    <p className="text-muted-foreground">{plan.description}</p>
                  </div>

                  <div className="space-y-4 mb-8 flex-grow">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-3">
                        <div className={`p-1 rounded-full ${plan.highlight ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>
                          <Check className="w-4 h-4" />
                        </div>
                        <span className="text-foreground/80">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button 
                    className={`w-full h-14 text-lg font-bold ${
                      plan.highlight 
                        ? 'bg-primary hover:bg-primary/90 text-white' 
                        : 'bg-card text-foreground hover:bg-muted'
                    } retro-button`}
                    variant={plan.buttonVariant}
                    onClick={() => plan.highlight && alert("Premium feature coming soon! Thank you for your interest.")}
                  >
                    {plan.buttonText}
                  </Button>
                </motion.div>
              ))}
            </div>

            {/* Features Showcase */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              {[
                { icon: Zap, label: "Instant Analysis" },
                { icon: Shield, label: "Private Data" },
                { icon: Rocket, label: "Skill Growth" },
                { icon: Sparkles, label: "AI Insights" }
              ].map((feat, i) => (
                <motion.div
                  key={feat.label}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex flex-col items-center gap-3 p-4 bg-card/50 border-2 border-border rounded-xl"
                >
                  <feat.icon className="w-6 h-6 text-primary" />
                  <span className="text-sm font-bold text-center">{feat.label}</span>
                </motion.div>
              ))}
            </div>

            {/* Back Button */}
            <div className="text-center">
              <Button 
                variant="ghost" 
                onClick={() => navigate(-1)}
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Premium;
