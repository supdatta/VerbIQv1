import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Square, Loader2, Zap } from "lucide-react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { AnalysisResult, ContextType } from "@/types";
import { useAuth } from "@/contexts/AuthContext";

interface AudioRecorderProps {
  context: ContextType;
  onResult: (result: AnalysisResult) => void;
}

const AudioRecorder = ({ context, onResult }: AudioRecorderProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);
  const { toast } = useToast();
  const { isAuthenticated, freeUsesRemaining, decrementFreeUses } = useAuth();

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const startRecording = async () => {
    if (!isAuthenticated && freeUsesRemaining <= 0) {
      toast({
        title: "Free trials exhausted",
        description: "Please login to continue using the AI Coach.",
        variant: "destructive",
      });
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Check for supported mime types for better compatibility
      const mimeType = MediaRecorder.isTypeSupported("audio/webm;codecs=opus") 
        ? "audio/webm;codecs=opus" 
        : "audio/webm";
        
      const mediaRecorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: "audio/webm" });
        stream.getTracks().forEach((track) => track.stop());
        await analyzeAudio(audioBlob);
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      timerRef.current = window.setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      toast({
        title: "Microphone access denied",
        description: "Please allow microphone access to use the recorder.",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const analyzeAudio = async (audioBlob: Blob) => {
    setIsAnalyzing(true);

    const formData = new FormData();
    formData.append("file", audioBlob, "recording.webm");
    formData.append("context", context);

    const baseUrl = localStorage.getItem("emergency_api_url") || "http://127.0.0.1:5000";

    try {
      const response = await axios.post(
        `${baseUrl}/analyze`,
        formData,
        {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
          timeout: 60000, 
        }
      );

      if (!isAuthenticated) {
        decrementFreeUses();
      }

      onResult(response.data);
    } catch (error) {
      console.error("AI Coach Analysis Error:", error);
      let errorMessage = "Please try again later. The analysis service is temporarily unavailable.";
      
      if (axios.isAxiosError(error)) {
        if (error.message === "Network Error") {
          errorMessage = `Network Error: Could not connect to ${baseUrl}. Please ensure your backend is running and the API URL in Settings (gear icon) is correct.`;
        } else if (error.response?.status === 500) {
          errorMessage = "Server Error: The backend is experiencing issues.";
        }
      }
      
      toast({
        title: "AI Coach is sleeping",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Recording Status */}
      <AnimatePresence mode="wait">
        {isRecording && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-3"
          >
            <span className="w-4 h-4 bg-destructive animate-blink" />
            <span className="font-heading text-xs text-destructive">REC {formatTime(recordingTime)}</span>
          </motion.div>
        )}
        {isAnalyzing && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-3"
          >
            <Loader2 className="w-6 h-6 animate-spin text-secondary" />
            <span className="font-heading text-xs text-secondary">ANALYZING...</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Microphone Button */}
      <motion.div
        className="relative"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Pulse Animation */}
        {isRecording && (
          <>
            <motion.div
              className="absolute inset-0 bg-destructive/30 rounded-full"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <motion.div
              className="absolute inset-0 bg-destructive/20 rounded-full"
              animate={{ scale: [1, 2, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
            />
          </>
        )}

        <Button
          size="lg"
          onClick={isRecording ? stopRecording : startRecording}
          disabled={isAnalyzing}
          className={`relative z-10 w-32 h-32 rounded-full border-4 border-border transition-all duration-300 flex items-center justify-center ${
            isRecording
              ? "bg-destructive hover:bg-destructive/90"
              : "bg-gradient-to-br from-primary to-chart-5 hover:from-primary/90 hover:to-chart-5/90"
          }`}
          style={{
            boxShadow: isRecording 
              ? "0 0 30px rgba(255, 0, 0, 0.5), inset 0 0 20px rgba(0, 0, 0, 0.2)"
              : "0 0 30px rgba(var(--primary), 0.5), inset 0 0 20px rgba(0, 0, 0, 0.1)"
          }}
        >
          {isRecording ? (
            <Square className="w-10 h-10 text-white" />
          ) : (
            <Mic className="w-10 h-10 text-primary-foreground" />
          )}
        </Button>
      </motion.div>

      {/* Instructions */}
      <p className="text-muted-foreground text-center max-w-xs">
        {isRecording
          ? "Click to stop and analyze"
          : "Click to start recording"}
      </p>

      {/* Free Uses Counter */}
      {!isAuthenticated && (
        <div className="retro-card px-6 py-3 flex items-center gap-3">
          <Zap className="w-5 h-5 text-secondary" />
          <span className="text-muted-foreground">Free trials: </span>
          <span className={`font-heading text-sm ${freeUsesRemaining > 0 ? "text-secondary" : "text-destructive"}`}>
            {freeUsesRemaining}
          </span>
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;
