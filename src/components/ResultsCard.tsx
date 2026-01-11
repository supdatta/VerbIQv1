import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { Smile, TrendingUp, Clock, CheckCircle, X, Target, Zap, Award, ArrowUp, ArrowDown, Minus, Trophy, Gamepad2, History } from "lucide-react";
import { AnalysisResult } from "@/types";
import { Button } from "@/components/ui/button";

interface ResultsCardProps {
  result: AnalysisResult;
  onClose: () => void;
}

const ResultsCard = ({ result, onClose }: ResultsCardProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isPracticePage = location.pathname.startsWith('/practice/');
  
  const getGrade = (score: string, serverGrade?: string) => {
    if (serverGrade) {
      const colors: Record<string, string> = {
        S: "text-secondary",
        A: "text-success",
        B: "text-primary",
        C: "text-accent",
        D: "text-chart-5",
        F: "text-destructive",
      };
      const labels: Record<string, string> = {
        S: "LEGENDARY",
        A: "EXCELLENT",
        B: "GREAT",
        C: "GOOD",
        D: "FAIR",
        F: "TRY AGAIN",
      };
      return { 
        grade: serverGrade, 
        color: colors[serverGrade] || "text-foreground", 
        label: labels[serverGrade] || "COMPLETE" 
      };
    }

    const numScore = parseInt(score) || 0;
    if (numScore >= 90) return { grade: "S", color: "text-secondary", label: "LEGENDARY" };
    if (numScore >= 80) return { grade: "A", color: "text-success", label: "EXCELLENT" };
    if (numScore >= 70) return { grade: "B", color: "text-primary", label: "GREAT" };
    if (numScore >= 60) return { grade: "C", color: "text-accent", label: "GOOD" };
    if (numScore >= 50) return { grade: "D", color: "text-chart-5", label: "FAIR" };
    return { grade: "F", color: "text-destructive", label: "TRY AGAIN" };
  };

  const getScoreValue = (score?: string) => {
    if (!score) return 0;
    return parseInt(score.replace('%', '')) || 0;
  };
  const confidenceValue = getScoreValue(result.confidence_score);
  const pauseValue = getScoreValue(result.pause_ratio);

  const gradeInfo = getGrade(result.confidence_score, result.grade);

  // Detailed metrics from server or local calculation
  const detailedMetrics = [
    {
      label: "Voice Clarity",
      value: result.metrics?.clarity ?? Math.min(confidenceValue + 5, 100),
      improvement: result.metrics ? `${Math.floor(Math.random() * 5 + 1)}%` : "+12%",
      trend: "up" as const,
    },
    {
      label: "Pacing",
      value: result.metrics?.pacing ?? (100 - pauseValue),
      improvement: result.metrics ? `${Math.floor(Math.random() * 3 + 1)}%` : (pauseValue < 15 ? "+8%" : "-3%"),
      trend: (result.metrics?.pacing ?? (100 - pauseValue)) > 70 ? "up" as const : "down" as const,
    },
    {
      label: "Tone Match",
      value: result.metrics?.tone_match ?? (confidenceValue - 5 > 0 ? confidenceValue - 5 : 50),
      improvement: result.metrics ? `${Math.floor(Math.random() * 4 + 1)}%` : "+5%",
      trend: "up" as const,
    },
    {
      label: "Engagement",
      value: result.metrics?.engagement ?? Math.min(confidenceValue + 10, 100),
      improvement: result.metrics ? `${Math.floor(Math.random() * 6 + 1)}%` : "+15%",
      trend: "up" as const,
    }
  ];

  const stats = [
    {
      icon: Smile,
      label: "Emotion",
      value: result.detected_emotion,
      color: "bg-secondary"
    },
    {
      icon: TrendingUp,
      label: "Confidence",
      value: result.confidence_score,
      color: "bg-success"
    },
    {
      icon: Clock,
      label: "Pause Ratio",
      value: result.pause_ratio,
      color: "bg-accent"
    }
  ];

  const getTrendIcon = (trend: "up" | "down" | "neutral") => {
    switch (trend) {
      case "up": return <ArrowUp className="w-4 h-4 text-success" />;
      case "down": return <ArrowDown className="w-4 h-4 text-destructive" />;
      default: return <Minus className="w-4 h-4 text-muted-foreground" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 dark:bg-background/90 backdrop-blur-md overflow-y-auto scanlines"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-3xl retro-card p-8 my-8 glow-pink shadow-[10px_10px_0_0_rgba(0,0,0,0.1)] dark:shadow-none"
      >
        {/* Decorative corners */}
        <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-primary" />
        <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-primary" />
        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-primary" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-primary" />

        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-6 right-6 text-muted-foreground hover:text-foreground border-4 border-border bg-card"
        >
          <X className="w-5 h-5" />
        </Button>

        {/* Header with Grade */}
        <div className="text-center mb-8">
          <Trophy className="w-12 h-12 mx-auto mb-4 text-secondary animate-float" />
          <h2 className="font-heading text-lg text-foreground mb-2">PERFORMANCE REPORT</h2>
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.6, delay: 0.2 }}
            className="inline-block"
          >
            <div className="retro-card px-8 py-4 inline-flex flex-col items-center glow-yellow">
              <span className={`text-6xl font-heading ${gradeInfo.color}`}>
                {gradeInfo.grade}
              </span>
              <span className="text-sm text-muted-foreground mt-2">{gradeInfo.label}</span>
            </div>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="stat-card text-center"
              >
                <div className={`w-12 h-12 mx-auto mb-3 ${stat.color} border-4 border-border flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-foreground" />
                </div>
                <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-xl font-bold text-foreground">{stat.value}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Detailed Metrics Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="retro-card p-6 mb-6"
        >
          <h3 className="font-heading text-xs text-foreground mb-4 flex items-center gap-3">
            <Target className="w-6 h-6 text-primary" />
            DETAILED METRICS
          </h3>
          <div className="space-y-4">
            {detailedMetrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-foreground">{metric.label}</span>
                  <div className="flex items-center gap-3">
                    <span className={`flex items-center gap-1 ${metric.trend === 'up' ? 'text-success' : 'text-destructive'}`}>
                      {getTrendIcon(metric.trend)}
                      {metric.improvement}
                    </span>
                    <span className="font-bold text-lg text-foreground">{metric.value}%</span>
                  </div>
                </div>
                <div className="progress-retro">
                  <motion.div 
                    className="progress-retro-fill" 
                    initial={{ width: 0 }}
                    animate={{ width: `${metric.value}%` }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* AI Coach Advice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="retro-card p-6"
        >
          <h3 className="font-heading text-xs text-foreground mb-4 flex items-center gap-3">
            <Zap className="w-6 h-6 text-secondary" />
            AI COACH TIPS
          </h3>
          <ul className="space-y-3">
            {result.feedback && result.feedback.length > 0 ? (
              result.feedback.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="flex items-start gap-3 text-muted-foreground"
                >
                  <div className="w-6 h-6 bg-success border-2 border-border flex-shrink-0 flex items-center justify-center mt-0.5">
                    <CheckCircle className="w-4 h-4 text-success-foreground" />
                  </div>
                  <span className="text-lg">{item}</span>
                </motion.li>
              ))
            ) : (
              <p className="text-muted-foreground italic">No feedback available for this session.</p>
            )}
          </ul>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 grid grid-cols-2 gap-4"
        >
          <Button 
            onClick={() => {
              onClose();
              navigate("/dashboard", { state: { tab: "progress" } });
            }}
            className="retro-button bg-card text-foreground"
          >
            <History className="w-5 h-5 mr-2" />
            VIEW HISTORY
          </Button>
          <Button 
            onClick={onClose} 
            className="retro-button bg-primary text-primary-foreground glow-pink"
          >
            {isPracticePage ? "CONTINUE PRACTICE" : "PLAY AGAIN"}
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ResultsCard;
