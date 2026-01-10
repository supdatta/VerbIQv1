import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, BookOpen, ChevronRight, HelpCircle, MessageSquare, Check, X, ArrowRight, RefreshCw } from "lucide-react";
import { modules, interviewQuestions } from "@/data/modules";
import { AnalysisResult, ContextType } from "@/types";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import AudioRecorder from "@/components/AudioRecorder";
import ResultsCard from "@/components/ResultsCard";
import { useAuth } from "@/contexts/AuthContext";

// Debate points and counterpoints
const debateTopics = [
  {
    topic: "Remote Work vs Office Work",
    level1: {
      points: [
        { text: "Remote work increases productivity", counter: "Studies show mixed results on productivity" },
        { text: "Remote work saves commute time", counter: "Commute time provides work-life separation" },
        { text: "Office fosters better collaboration", counter: "Digital tools enable effective remote collaboration" }
      ]
    },
    level2: {
      points: [
        "Remote work reduces operational costs",
        "Office environment ensures data security",
        "Remote work enables global talent hiring"
      ]
    },
    level3: {
      points: [
        "Hybrid models offer the best of both worlds",
        "Company culture is harder to build remotely"
      ]
    }
  }
];

// Group discussion topics
const gdTopics = [
  {
    topic: "Should AI Replace Human Jobs?",
    keyPoints: [
      "AI creates new job categories while automating existing ones",
      "Reskilling workforce is essential for the transition",
      "AI should augment human capabilities, not replace them",
      "Ethical considerations around job displacement",
      "Economic impact on different sectors"
    ],
    suggestedApproach: "Balance economic benefits with social responsibility"
  }
];

const Practice = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { addToHistory } = useAuth();
  const [selectedLesson, setSelectedLesson] = useState(0);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [showQuestions, setShowQuestions] = useState(false);
  const [currentDebatePoint, setCurrentDebatePoint] = useState(0);
  const [userResponses, setUserResponses] = useState<string[]>([]);
  const [showCounter, setShowCounter] = useState(false);

  const module = modules.find((m) => m.id === moduleId);

  if (!module) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center retro-card p-12">
            <BookOpen className="w-14 h-14 mx-auto mb-4 text-destructive" />
            <h1 className="text-2xl font-bold text-foreground mb-4">Module Not Found</h1>
            <Link to="/dashboard">
              <Button className="retro-button bg-primary text-primary-foreground">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Modules
              </Button>
            </Link>
          </div>
        </div>
      </PageTransition>
    );
  }

  const currentLesson = module.lessons[selectedLesson];
  const currentDebateTopic = debateTopics[0];
  const currentGDTopic = gdTopics[0];

  const getContext = (): ContextType => {
    switch (moduleId) {
      case "interview":
        return "Interview";
      case "group-discussion":
        return "Group Discussion";
      case "debate":
        return "Debate";
      default:
        return "Interview";
    }
  };

  const renderDebateContent = () => {
    const level = selectedLesson + 1;
    
    if (level === 1) {
      // Level 1: Points and counterpoints shown
      return (
        <div className="space-y-6">
          <div className="retro-card p-4 bg-muted">
            <h4 className="font-semibold text-foreground mb-2">Topic: {currentDebateTopic.topic}</h4>
            <p className="text-sm text-muted-foreground">Practice identifying and responding to arguments</p>
          </div>
          
          <div className="space-y-4">
            {currentDebateTopic.level1.points.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                className={`point-card ${currentDebatePoint === index ? 'active' : ''} ${index < currentDebatePoint ? 'completed' : ''}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    index < currentDebatePoint ? 'bg-success text-success-foreground' : 
                    index === currentDebatePoint ? 'bg-primary text-primary-foreground' : 
                    'bg-muted text-muted-foreground'
                  }`}>
                    {index < currentDebatePoint ? <Check className="w-4 h-4" /> : index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground mb-2">
                      <span className="text-primary">Point:</span> {point.text}
                    </p>
                    {(showCounter || index < currentDebatePoint) && (
                      <motion.p 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="text-muted-foreground text-sm border-l-2 border-accent pl-3"
                      >
                        <span className="text-accent font-medium">Counter:</span> {point.counter}
                      </motion.p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {currentDebatePoint < currentDebateTopic.level1.points.length && (
            <div className="flex gap-3 justify-center">
              <Button 
                onClick={() => setShowCounter(true)}
                className="retro-button bg-accent text-accent-foreground"
                disabled={showCounter}
              >
                Reveal Counter
              </Button>
              <Button 
                onClick={() => {
                  setCurrentDebatePoint(prev => prev + 1);
                  setShowCounter(false);
                }}
                className="retro-button bg-primary text-primary-foreground"
              >
                Next Point
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}
        </div>
      );
    } else {
      // Level 2 & 3: Only points shown, user provides counter
      const points = level === 2 ? currentDebateTopic.level2.points : currentDebateTopic.level3.points;
      return (
        <div className="space-y-6">
          <div className="retro-card p-4 bg-muted">
            <h4 className="font-semibold text-foreground mb-2">Topic: {currentDebateTopic.topic}</h4>
            <p className="text-sm text-muted-foreground">
              {level === 2 ? 'Practice providing counterarguments' : 'Advanced debate practice'}
            </p>
          </div>
          
          <div className="space-y-4">
            {points.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                className={`point-card ${currentDebatePoint === index ? 'active' : ''}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    currentDebatePoint === index ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">
                      <span className="text-primary">Point:</span> {point}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2 italic">
                      Record your counterargument below
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      );
    }
  };

  const renderInterviewContent = () => (
    <div className="space-y-4">
      <button
        onClick={() => setShowQuestions(!showQuestions)}
        className="w-full flex items-center justify-between text-left retro-card p-4"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <HelpCircle className="w-5 h-5 text-accent" />
          </div>
          <span className="font-semibold text-foreground">
            Common Questions & Answers
          </span>
        </div>
        <ChevronRight
          className={`w-5 h-5 text-muted-foreground transition-transform ${
            showQuestions ? "rotate-90" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {showQuestions && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4 overflow-hidden"
          >
            {interviewQuestions.map((q, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="retro-card p-5"
              >
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-primary" />
                  "{q.question}"
                </h4>
                <p className="text-muted-foreground mb-3">
                  <span className="text-primary font-medium">Approach:</span> {q.approach}
                </p>
                <p className="text-sm text-muted-foreground/80 italic border-l-2 border-accent pl-3">
                  Example: "{q.example}"
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  const renderGDContent = () => (
    <div className="space-y-6">
      <div className="retro-card p-5 bg-muted">
        <h4 className="font-semibold text-foreground mb-2">Topic: {currentGDTopic.topic}</h4>
        <p className="text-sm text-muted-foreground">{currentGDTopic.suggestedApproach}</p>
      </div>
      
      <div className="space-y-3">
        <h4 className="font-semibold text-foreground flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-primary" />
          Key Points to Discuss
        </h4>
        {currentGDTopic.keyPoints.map((point, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-3 text-muted-foreground"
          >
            <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 text-primary text-sm font-medium">
              {index + 1}
            </span>
            <span>{point}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navbar />

        <div className="pt-24 pb-16 px-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <Link to="/dashboard">
                <Button variant="ghost" className="mb-4">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Modules
                </Button>
              </Link>
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                  moduleId === 'interview' ? 'bg-primary' : 
                  moduleId === 'group-discussion' ? 'bg-accent' : 
                  'bg-chart-3'
                }`}>
                  <BookOpen className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">
                    {module.title}
                  </h1>
                  <p className="text-muted-foreground">{module.subtitle}</p>
                </div>
              </div>
            </motion.div>

            {/* Main Content */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left Panel - Lessons */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-6"
              >
                {/* Lesson Tabs */}
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {module.lessons.map((lesson, index) => (
                    <button
                      key={lesson.id}
                      onClick={() => {
                        setSelectedLesson(index);
                        setCurrentDebatePoint(0);
                        setShowCounter(false);
                      }}
                      className={`px-6 py-3 border-2 border-border whitespace-nowrap font-medium rounded-lg transition-all duration-200 ${
                        selectedLesson === index
                          ? "bg-primary text-primary-foreground shadow-[3px_3px_0_0_hsl(var(--border))]"
                          : "bg-card text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      Level {index + 1}
                    </button>
                  ))}
                </div>

                {/* Current Lesson */}
                <motion.div
                  key={currentLesson.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="retro-card p-6"
                >
                  <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
                    {currentLesson.duration}
                  </div>
                  <h2 className="text-xl font-semibold text-foreground mb-2">
                    {currentLesson.title}
                  </h2>
                  <p className="text-muted-foreground mb-6">{currentLesson.description}</p>

                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-primary" />
                    Key Tips
                  </h3>
                  <ul className="space-y-3">
                    {currentLesson.tips.map((tip, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3 text-muted-foreground"
                      >
                        <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span>{tip}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                {/* Module-specific content */}
                {moduleId === "debate" && renderDebateContent()}
                {moduleId === "interview" && renderInterviewContent()}
                {moduleId === "group-discussion" && renderGDContent()}
              </motion.div>

              {/* Right Panel - Recorder */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="retro-card p-8 flex flex-col items-center justify-center min-h-[500px] relative"
              >
                <div className="text-center mb-8">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center ${
                    moduleId === 'interview' ? 'bg-primary/10' : 
                    moduleId === 'group-discussion' ? 'bg-accent/10' : 
                    'bg-chart-3/10'
                  }`}>
                    <BookOpen className={`w-8 h-8 ${
                      moduleId === 'interview' ? 'text-primary' : 
                      moduleId === 'group-discussion' ? 'text-accent' : 
                      'text-chart-3'
                    }`} />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground mb-2">
                    Practice Arena
                  </h2>
                  <p className="text-muted-foreground">
                    Record your response and get instant AI feedback
                  </p>
                </div>

                <AudioRecorder
                  context={getContext()}
                  onResult={(analysisResult) => {
                    setResult(analysisResult);
                    if (module && currentLesson) {
                      addToHistory({
                        moduleId: module.id,
                        moduleTitle: module.title,
                        lessonTitle: currentLesson.title,
                        result: analysisResult,
                      });
                    }
                  }}
                />

                <div className="mt-8 text-center">
                  <div className="inline-block px-4 py-2 bg-muted border-2 border-border rounded-lg">
                    <span className="text-muted-foreground">Context: </span>
                    <span className="text-primary font-medium">{getContext()}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Results Modal */}
        <AnimatePresence>
          {result && (
            <ResultsCard result={result} onClose={() => setResult(null)} />
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
};

export default Practice;
