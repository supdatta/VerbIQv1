import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bot, 
  MessageSquare, 
  Settings, 
  Brain, 
  Zap, 
  Sparkles, 
  ArrowLeft, 
  Mic, 
  Send, 
  Crown,
  History,
  User,
  Activity,
  Cpu,
  ShieldCheck,
  Volume2,
  Clock
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import { toast } from "@/components/ui/use-toast";
import AudioRecorder from "@/components/AudioRecorder";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { AnalysisResult } from "@/types";
import { useAuth } from "@/contexts/AuthContext";

interface Message {
  id: string;
  text: string;
  sender: "ai" | "user";
  timestamp: Date;
}

const AIInterviewer = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || !user?.isPremium) {
      navigate("/premium", { replace: true });
      toast({
        title: "Premium Access Required",
        description: "Upgrade to Pro to unlock the AI Interviewer.",
        variant: "destructive",
      });
    }
  }, [user, isAuthenticated, navigate]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I am your AI Interviewer. I've been configured to help you practice for high-stakes interviews. I'll be evaluating your tone, confidence, and content. Shall we begin? \n\nLet's start with a classic: Tell me about yourself and your background.",
      sender: "ai",
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isRecordingOpen, setIsRecordingOpen] = useState(false);
  const [interviewStep, setInterviewStep] = useState(0);

  const interviewQuestions = [
    "That's interesting. What would you say is your greatest professional strength?",
    "I see. And on the flip side, what do you consider to be your greatest weakness, and how are you working to improve it?",
    "Tell me about a time you faced a significant challenge at work or in a project. How did you handle it?",
    "Why do you want to work for this company specifically? What draws you to our mission?",
    "Where do you see yourself professionally in five years?",
    "Finally, do you have any questions for me about the role or the company culture?"
  ];
  const [behavior, setBehavior] = useState({
    tone: "Professional",
    difficulty: "Medium",
    personality: "Supportive"
  });

  const [memories, setMemories] = useState([
    { id: 1, text: "Tends to use 'um' and 'like' during technical explanations.", date: "2 days ago" },
    { id: 2, text: "Excellent eye contact and posture during the last session.", date: "Yesterday" },
    { id: 3, text: "Struggles with 'Tell me about yourself' questions.", date: "Today" }
  ]);

  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addRealtimeMemory = (text: string) => {
    const newMemory = {
      id: Date.now(),
      text,
      date: "Just now"
    };
    setMemories(prev => [newMemory, ...prev.slice(0, 4)]); // Keep last 5
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    
    // Add realtime memory based on user input
    if (inputText.length > 10) {
      addRealtimeMemory(`User is discussing: "${inputText.substring(0, 30)}${inputText.length > 30 ? '...' : ''}"`);
    }

    setInputText("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      // Get next question
      const nextQuestion = interviewStep < interviewQuestions.length 
        ? interviewQuestions[interviewStep]
        : "That concludes our interview session today. You've provided some solid insights. Do you have any final thoughts or would you like to review any specific part?";
      
      setInterviewStep(prev => prev + 1);

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: `I've noted your response. ${nextQuestion}`,
        sender: "ai",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const [lastAnalysis, setLastAnalysis] = useState<AnalysisResult | null>(null);
  const [lastEvaluationTime, setLastEvaluationTime] = useState<string | null>(null);

  const handleAudioResult = (result: AnalysisResult) => {
    setIsRecordingOpen(false);
    setLastAnalysis(result);
    setLastEvaluationTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    
    // Add user's transcription
    const userMsg: Message = {
      id: Date.now().toString(),
      text: result.transcription 
        ? `🎤 ${result.transcription}` 
        : `🎤 [Voice Message Sent]`,
      sender: "user",
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);

    // Add realtime memory based on analysis metrics
    addRealtimeMemory(`Analyzed speech: ${result.confidence_score}% confidence with ${result.detected_emotion} tone.`);

    setIsTyping(true);
    
    // Construct a more structured and accurate AI response
    setTimeout(() => {
      const isMismatched = result.detected_emotion.toLowerCase() !== behavior.tone.toLowerCase();
      const feedbackText = result.feedback && result.feedback.length > 0 
        ? result.feedback[0] 
        : "I've analyzed your delivery.";

      let introMessage = "";
      if (isMismatched) {
        introMessage = `I've processed your response. While you're aiming for a ${behavior.tone} delivery, I actually detected a ${result.detected_emotion} tone.`;
      } else {
        introMessage = `I've processed your response. Your ${behavior.tone} delivery was well-executed.`;
      }

      // Get next question
      const nextQuestion = interviewStep < interviewQuestions.length 
        ? interviewQuestions[interviewStep]
        : "That concludes our interview session today. You've provided some solid insights. Do you have any final thoughts or would you like to review any specific part?";
      
      setInterviewStep(prev => prev + 1);

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: `${introMessage} ${feedbackText}\n\n${nextQuestion}`,
        sender: "ai",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);

    toast({
      title: "Analysis Complete",
      description: `Grade: ${result.grade || 'A'} • Confidence: ${result.confidence_score}%`,
    });
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navbar />

        <div className="pt-24 pb-16 px-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
              <div className="flex items-center gap-4">
                <Link to="/dashboard">
                  <Button variant="ghost" size="icon" className="retro-button">
                    <ArrowLeft className="w-5 h-5" />
                  </Button>
                </Link>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/80 to-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                    <Bot className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                      VerbIQ Bot
                    </h1>
                    <p className="text-sm text-muted-foreground">Advanced Behavioral Analysis & Memory Mode</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
              </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Behavior Control */}
              <div className="lg:col-span-3 space-y-6 order-2 lg:order-1">
                <div className="retro-card p-5 bg-card sticky top-24">
                  <div className="flex items-center gap-2 mb-6">
                    <Settings className="w-5 h-5 text-primary" />
                    <h2 className="font-bold text-lg">Behavior Control</h2>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Interview Tone</label>
                      <div className="grid grid-cols-2 gap-2">
                        {["Professional", "Casual", "Stressful", "Friendly"].map(t => (
                          <button
                            key={t}
                            onClick={() => setBehavior(prev => ({ ...prev, tone: t }))}
                            className={`px-3 py-2 text-[10px] font-medium rounded-lg border-2 transition-all ${
                              behavior.tone === t 
                                ? "bg-primary text-primary-foreground border-primary shadow-[2px_2px_0_0_#000000]" 
                                : "bg-muted text-muted-foreground border-transparent hover:border-border"
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Difficulty Level</label>
                      <div className="grid grid-cols-1 gap-2">
                        {["Easy", "Medium", "Hard"].map(d => (
                          <button
                            key={d}
                            onClick={() => setBehavior(prev => ({ ...prev, difficulty: d }))}
                            className={`px-3 py-2 text-[10px] font-medium rounded-lg border-2 transition-all ${
                              behavior.difficulty === d 
                                ? "bg-accent text-accent-foreground border-accent shadow-[2px_2px_0_0_#000000]" 
                                : "bg-muted text-muted-foreground border-transparent hover:border-border"
                            }`}
                          >
                            {d}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">AI Personality</label>
                      <select 
                        value={behavior.personality}
                        onChange={(e) => setBehavior(prev => ({ ...prev, personality: e.target.value }))}
                        className="w-full bg-muted border-2 border-border rounded-lg p-2 text-xs focus:outline-none focus:border-primary"
                      >
                        <option>Supportive</option>
                        <option>Critical</option>
                        <option>Analytical</option>
                        <option>Stoic</option>
                      </select>
                    </div>

                    <Button 
                      onClick={() => {
                        toast({
                          title: "Behavior Updated",
                          description: `Bot is now ${behavior.tone} and ${behavior.personality}.`,
                        });
                      }}
                      className="w-full retro-button bg-primary text-primary-foreground mt-4 text-xs py-5"
                    >
                      Update AI Behavior
                    </Button>

                    <Button 
                      onClick={() => {
                        setMessages([
                          {
                            id: Date.now().toString(),
                            text: "Interview reset. Let's start over.\n\nTell me about yourself and your background.",
                            sender: "ai",
                            timestamp: new Date()
                          }
                        ]);
                        setInterviewStep(0);
                        setLastAnalysis(null);
                        toast({
                          title: "Interview Reset",
                          description: "The conversation has been cleared.",
                        });
                      }}
                      variant="outline"
                      className="w-full retro-button bg-card mt-2 text-[10px] py-4 border-2"
                    >
                      Reset Session
                    </Button>
                  </div>
                </div>
              </div>

              {/* Middle Column: AI & Chat */}
              <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
                {/* AI Visualizer */}
                <div className="retro-card p-6 bg-card relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4">
                    <div className="flex gap-2">
                      <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                      <span className="text-[10px] font-mono text-success uppercase tracking-widest">Live Analysis</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center justify-center py-4">
                    <motion.div
                      animate={{ 
                        scale: isTyping ? [1, 1.1, 1] : 1,
                        rotate: isTyping ? [0, 5, -5, 0] : 0
                      }}
                      transition={{ duration: 0.5, repeat: isTyping ? Infinity : 0 }}
                      className="w-24 h-24 bg-primary/10 rounded-full border-4 border-primary flex items-center justify-center relative mb-4"
                    >
                      <Bot className="w-12 h-12 text-primary" />
                      <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-background border-2 border-primary rounded-full flex items-center justify-center shadow-lg">
                        <Cpu className="w-4 h-4 text-primary animate-spin-slow" />
                      </div>
                    </motion.div>
                    <h3 className="text-lg font-bold text-foreground mb-1">VerbIQ Bot</h3>
                    <p className="text-xs text-muted-foreground text-center max-w-md">
                      Simulating <span className="text-primary font-bold">{behavior.tone}</span> • <span className="text-primary font-bold">{behavior.personality}</span>
                    </p>
                  </div>
                </div>

                {/* Chat Interface */}
                <div className="retro-card flex flex-col h-[550px] bg-card">
                  <div className="p-4 border-b-2 border-border flex items-center justify-between bg-muted/30">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-primary" />
                      <span className="font-bold text-xs uppercase tracking-widest">Conversation Log</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Volume2 className="w-4 h-4 text-muted-foreground cursor-pointer hover:text-primary transition-colors" />
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
                    {messages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div className={`max-w-[85%] p-4 rounded-2xl border-2 ${
                          msg.sender === "user" 
                            ? "bg-primary text-primary-foreground border-primary shadow-[4px_4px_0_0_#000000]" 
                            : "bg-muted border-border shadow-[4px_4px_0_0_hsl(var(--border))]"
                        }`}>
                          <p className="text-sm leading-relaxed">{msg.text}</p>
                          <span className="text-[10px] opacity-50 mt-2 block">
                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-muted border-2 border-border p-4 rounded-2xl flex gap-1 shadow-[4px_4px_0_0_hsl(var(--border))]">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" />
                          <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce delay-100" />
                          <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce delay-200" />
                        </div>
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </div>

                  <div className="p-4 border-t-2 border-border bg-muted/30">
                    <div className="flex gap-3">
                      <Input
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Type your response..."
                        className="retro-input bg-background h-12"
                      />
                      <Button onClick={handleSendMessage} className="retro-button bg-primary text-primary-foreground aspect-square p-0 w-12 h-12">
                        <Send className="w-5 h-5" />
                      </Button>
                      <Dialog open={isRecordingOpen} onOpenChange={setIsRecordingOpen}>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="retro-button bg-card aspect-square p-0 w-12 h-12 border-2">
                            <Mic className="w-5 h-5 text-primary" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="retro-card border-4 border-border bg-background sm:max-w-md">
                           <div className="py-12 flex flex-col items-center">
                             <h3 className="font-heading text-xl mb-8 text-center">VOICE INTERVIEW</h3>
                             <AudioRecorder 
                               context={`AI Interviewer | Tone: ${behavior.tone} | Difficulty: ${behavior.difficulty} | Personality: ${behavior.personality}${inputText ? ` | Topic: ${inputText}` : ""}`} 
                               onResult={handleAudioResult} 
                             />
                             <p className="mt-8 text-xs text-muted-foreground text-center max-w-xs">
                               Our AI will analyze your pitch, tone, and emotions in real-time.
                             </p>
                           </div>
                         </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: AI Analysis & Metrics */}
              <div className="lg:col-span-3 space-y-6 order-3">
                <div className="retro-card p-5 bg-card border-2 border-primary/30 sticky top-24">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Activity className="w-5 h-5 text-primary" />
                      <h2 className="font-bold text-lg uppercase tracking-wider">Live Metrics</h2>
                    </div>
                    <div className={`text-xl font-black ${
                      lastAnalysis?.grade === 'S' ? 'text-secondary' : 
                      lastAnalysis?.grade === 'A' ? 'text-success' : 
                      'text-primary'
                    }`}>
                      {lastAnalysis?.grade || '—'}
                    </div>
                  </div>
                  {lastAnalysis && lastEvaluationTime && (
                     <div className="flex items-center gap-1 mb-6 text-[9px] text-muted-foreground uppercase font-mono">
                       <Clock className="w-3 h-3" />
                       Last Evaluation: {lastEvaluationTime}
                     </div>
                   )}

                  {lastAnalysis ? (
                    <div className="space-y-5">
                      {/* Emotion & Tone */}
                      <div className="p-3 bg-muted/50 border-2 border-border rounded-xl">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-bold uppercase text-muted-foreground">Detected Tone</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                            lastAnalysis.detected_emotion.toLowerCase() === behavior.tone.toLowerCase()
                              ? "bg-success/20 text-success"
                              : "bg-destructive/20 text-destructive"
                          }`}>
                            {lastAnalysis.detected_emotion.toLowerCase() === "disgust" || lastAnalysis.detected_emotion.toLowerCase() === "angry" 
                              ? `INAPPROPRIATE (${lastAnalysis.detected_emotion})` 
                              : lastAnalysis.detected_emotion}
                          </span>
                        </div>
                        <p className={`text-xs font-medium leading-relaxed italic ${
                          lastAnalysis.detected_emotion.toLowerCase() === behavior.tone.toLowerCase()
                            ? "text-success"
                            : "text-destructive"
                        }`}>
                          "{lastAnalysis.detected_emotion.toLowerCase() === behavior.tone.toLowerCase() 
                            ? `Perfect match with ${behavior.tone} goal.` 
                            : `Significant mismatch with ${behavior.tone} goal.`}"
                        </p>
                      </div>

                      {/* Performance Metrics */}
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-[10px] font-bold uppercase">
                            <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-yellow-500" /> Confidence</span>
                            <span className="text-primary">{lastAnalysis.confidence_score.includes('%') ? lastAnalysis.confidence_score : `${lastAnalysis.confidence_score}%`}</span>
                          </div>
                          <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden border border-border/50">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: lastAnalysis.confidence_score.includes('%') ? lastAnalysis.confidence_score : `${lastAnalysis.confidence_score}%` }}
                              className="h-full bg-primary"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-[10px] font-bold uppercase">
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-secondary" /> Pause Ratio</span>
                            <span className="text-secondary">{lastAnalysis.pause_ratio || '0%'}</span>
                          </div>
                          <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden border border-border/50">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: lastAnalysis.pause_ratio || '0%' }}
                              className="h-full bg-secondary"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-[10px] font-bold uppercase">
                            <span className="flex items-center gap-1"><Brain className="w-3 h-3 text-accent" /> Engagement</span>
                            <span className="text-accent">{lastAnalysis.metrics?.engagement || 75}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden border border-border/50">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${lastAnalysis.metrics?.engagement || 75}%` }}
                              className="h-full bg-accent"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Suggested Response (Shortened) */}
                      <div className="pt-4 border-t-2 border-border/50">
                        <label className="text-[10px] font-bold uppercase text-muted-foreground block mb-2">Key Improvement</label>
                        <p className="text-[11px] text-foreground leading-relaxed">
                          {lastAnalysis.feedback[1] || lastAnalysis.feedback[0]}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="py-12 text-center space-y-4 opacity-50">
                      <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto">
                        <Cpu className="w-6 h-6" />
                      </div>
                      <p className="text-[11px] uppercase font-bold tracking-widest">Awaiting Input...</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default AIInterviewer;
