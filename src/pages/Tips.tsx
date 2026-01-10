import { motion } from "framer-motion";
import { ArrowLeft, Lightbulb, Mic, Brain, Target, Clock, Users, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";

const Tips = () => {
  const generalTips = [
    {
      icon: Mic,
      title: "Master Your Voice",
      color: "bg-primary",
      tips: [
        "Speak at a moderate pace—not too fast, not too slow",
        "Vary your pitch to maintain interest",
        "Use pauses strategically for emphasis",
        "Project your voice without shouting",
        "Record yourself to identify patterns"
      ]
    },
    {
      icon: Brain,
      title: "Mental Preparation",
      color: "bg-orange-600",
      tips: [
        "Visualize success before speaking",
        "Practice deep breathing to calm nerves",
        "Prepare key points, not scripts",
        "Embrace nervousness as excitement",
        "Focus on delivering value, not perfection"
      ]
    },
    {
      icon: Target,
      title: "Body Language",
      color: "bg-amber-500",
      tips: [
        "Maintain appropriate eye contact",
        "Use open, confident posture",
        "Gesture naturally to emphasize points",
        "Avoid fidgeting or closed postures",
        "Smile genuinely when appropriate"
      ]
    },
    {
      icon: Clock,
      title: "Time Management",
      color: "bg-orange-500",
      tips: [
        "Know your time limits beforehand",
        "Practice with a timer regularly",
        "Prioritize key messages upfront",
        "Leave room for questions or discussion",
        "Learn to wrap up gracefully"
      ]
    },
    {
      icon: Users,
      title: "Audience Awareness",
      color: "bg-amber-600",
      tips: [
        "Research your audience beforehand",
        "Adapt your language to their level",
        "Read the room and adjust accordingly",
        "Acknowledge different perspectives",
        "Engage with questions and feedback"
      ]
    },
    {
      icon: Lightbulb,
      title: "Continuous Improvement",
      color: "bg-orange-400",
      tips: [
        "Seek feedback after every presentation",
        "Watch recordings of yourself speaking",
        "Learn from speakers you admire",
        "Practice in low-stakes environments",
        "Celebrate small wins and progress"
      ]
    }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-background scanlines">
        <Navbar />

        <div className="pt-24 pb-16 px-6">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <Link to="/dashboard">
                <Button className="retro-button bg-card text-foreground mb-4">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  BACK TO MODULES
                </Button>
              </Link>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-primary border-4 border-border flex items-center justify-center glow-yellow">
                  <Lightbulb className="w-8 h-8 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="font-heading text-lg text-foreground">
                    TIPS & TRICKS
                  </h1>
                  <p className="text-muted-foreground text-lg">Universal principles for effective communication</p>
                </div>
              </div>
            </motion.div>

            {/* Tips Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {generalTips.map((category, index) => {
                const Icon = category.icon;
                return (
                  <motion.div
                    key={category.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="retro-card p-6 hover:translate-y-[-4px] transition-transform duration-300"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-12 h-12 ${category.color} border-4 border-border flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <h2 className="font-heading text-xs text-foreground">
                        {category.title.toUpperCase()}
                      </h2>
                    </div>
                    <ul className="space-y-3">
                      {category.tips.map((tip, tipIndex) => (
                        <li
                          key={tipIndex}
                          className="flex items-start gap-3 text-muted-foreground"
                        >
                          <span className={`w-2 h-2 ${category.color} mt-2 flex-shrink-0`} />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>

            {/* Quote Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-12 retro-card p-8 text-center glow-yellow relative overflow-hidden"
            >
              {/* Decorative corners */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-primary" />
              <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-primary" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-primary" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-primary" />
              
              <Sparkles className="w-10 h-10 mx-auto mb-4 text-primary animate-float" />
              <blockquote className="text-2xl md:text-3xl text-foreground mb-4">
                "The way we communicate with others and with ourselves ultimately determines 
                the quality of our lives."
              </blockquote>
              <cite className="text-primary font-bold text-lg">— Tony Robbins</cite>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Tips;
