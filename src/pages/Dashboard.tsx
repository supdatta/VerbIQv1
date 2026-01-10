import { motion } from "framer-motion";
import { Briefcase, Users, Scale, Lightbulb, History, GraduationCap, BarChart3, Calendar, Trophy, Target, Settings, Save, Sparkles, Bot, ArrowRight } from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import SolarSystem from "@/components/SolarSystem";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("modules");
  const history = user?.history || [];

  useEffect(() => {
    if (location.state && (location.state as any).tab) {
      setActiveTab((location.state as any).tab);
    }
  }, [location.state]);

  const getGradeColor = (score: string) => {
    const numScore = parseInt(score);
    if (numScore >= 80) return "text-success";
    if (numScore >= 60) return "text-primary";
    return "text-accent";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navbar />

        <div className="pt-28 pb-16 px-6">
          <div className="max-w-6xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex flex-col items-center mb-12">
                <TabsList className="grid w-full max-w-md grid-cols-2 gap-4 bg-transparent h-auto p-0">
                  <TabsTrigger 
                    value="modules" 
                    className="retro-button data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex items-center gap-2 py-4"
                  >
                    <GraduationCap className="w-5 h-5" />
                    Training
                  </TabsTrigger>
                  <TabsTrigger 
                    value="progress" 
                    className="retro-button data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex items-center gap-2 py-4"
                  >
                    <BarChart3 className="w-5 h-5" />
                    Progress
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="modules">
                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-center mb-8"
                >
                  <h1 className="text-foreground mb-4">
                    Training <span className="gradient-text">Modules</span>
                  </h1>
                  <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                    Click on any module to start practicing. Each orbit represents a different skill track.
                  </p>
                </motion.div>

                {/* Premium AI Interviewer Promo */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mb-12"
                >
                  <Link to="/ai-interviewer">
                    <div className="retro-card p-8 bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-yellow-500/10 border-yellow-500/50 hover:border-yellow-500 transition-all group relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4">
                        <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse" />
                      </div>
                      <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                        <div className="w-20 h-20 bg-gradient-to-br from-primary/80 to-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                          <Bot className="w-10 h-10 text-white" />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                          <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                            <h2 className="text-2xl font-bold">VerbIQ Bot</h2>
                          </div>
                          <p className="text-muted-foreground max-w-2xl">
                            Unlock our most advanced AI coach. Experience behavioral analysis, persistent memory of your speech habits, and fully customizable interviewer personalities.
                          </p>
                        </div>
                        <Button className="retro-button bg-yellow-500 hover:bg-yellow-600 text-black font-bold flex items-center gap-2 px-8 py-6">
                          Launch Interviewer
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  </Link>
                </motion.div>

                {/* Solar System Visualization */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative"
                >
                  <SolarSystem />
                </motion.div>
              </TabsContent>

              <TabsContent value="progress">
                <div className="space-y-8">
                  {/* Stats Cards */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                  >
                    <div className="stat-card">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Trophy className="w-5 h-5 text-primary" />
                        </div>
                        <span className="text-muted-foreground font-medium">Exercises</span>
                      </div>
                      <div className="stat-value text-foreground">{history.length}</div>
                      <p className="text-sm text-muted-foreground mt-2">Keep it up!</p>
                    </div>
                    
                    <div className="stat-card">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                          <Target className="w-5 h-5 text-accent" />
                        </div>
                        <span className="text-muted-foreground font-medium">Avg Score</span>
                      </div>
                      <div className="stat-value text-foreground">
                        {history.length > 0
                          ? Math.round(history.reduce((acc, curr) => acc + (parseInt(curr.result.confidence_score) || 0), 0) / history.length)
                          : 0}%
                      </div>
                      <div className="progress-retro mt-3">
                        <div 
                          className="progress-retro-fill" 
                          style={{ 
                            width: `${history.length > 0 ? Math.round(history.reduce((acc, curr) => acc + (parseInt(curr.result.confidence_score) || 0), 0) / history.length) : 0}%` 
                          }} 
                        />
                      </div>
                    </div>
                    
                    <div className="stat-card">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-chart-3/10 rounded-lg flex items-center justify-center">
                          <GraduationCap className="w-5 h-5 text-chart-3" />
                        </div>
                        <span className="text-muted-foreground font-medium">Mastered</span>
                      </div>
                      <div className="stat-value text-foreground">
                        {new Set(history.map(h => h.moduleId)).size} / 3
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">Modules explored</p>
                    </div>
                  </motion.div>

                  {/* History */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold flex items-center gap-3">
                      <History className="w-5 h-5 text-primary" />
                      Recent Activity
                    </h2>
                    
                    {history.length === 0 ? (
                      <div className="retro-card p-12 text-center">
                        <GraduationCap className="w-14 h-14 mx-auto mb-4 text-muted-foreground" />
                        <p className="text-muted-foreground text-lg">No exercises taken yet. Start your journey!</p>
                      </div>
                    ) : (
                      <div className="grid gap-4">
                        {history.map((item, index) => (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="retro-card p-6 hover:translate-y-[-2px] transition-transform"
                          >
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                                  {item.moduleId === "interview" && <Briefcase className="w-6 h-6 text-primary" />}
                                  {item.moduleId === "group-discussion" && <Users className="w-6 h-6 text-accent" />}
                                  {item.moduleId === "debate" && <Scale className="w-6 h-6 text-chart-3" />}
                                </div>
                                <div>
                                  <h3 className="font-semibold text-foreground">{item.lessonTitle}</h3>
                                  <p className="text-sm text-muted-foreground">{item.moduleTitle}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-8">
                                <div className="text-center">
                                  <p className="text-xs text-muted-foreground uppercase mb-1">Emotion</p>
                                  <p className="font-medium text-foreground">{item.result.detected_emotion}</p>
                                </div>
                                <div className="text-center">
                                  <p className="text-xs text-muted-foreground uppercase mb-1">Score</p>
                                  <p className={`font-bold text-xl ${getGradeColor(item.result.confidence_score)}`}>
                                    {item.result.confidence_score}
                                  </p>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                  <Calendar className="w-4 h-4" />
                                  <span className="text-sm">{formatDate(item.date)}</span>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* Legend */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-6 mt-8"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Briefcase className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="text-muted-foreground text-sm">Interviews</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 text-accent-foreground" />
                </div>
                <span className="text-muted-foreground text-sm">Group Discussions</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-chart-3 rounded-full flex items-center justify-center">
                  <Scale className="w-4 h-4 text-white" />
                </div>
                <span className="text-muted-foreground text-sm">Debates</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Lightbulb className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="text-muted-foreground text-sm">Tips & Tricks</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Dashboard;
