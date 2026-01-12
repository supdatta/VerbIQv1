## 🚀 VerbIQ – The LeetCode for Soft Skills
AI-powered speech, emotion & confidence analysis using TensorFlow + Gemini
VerbIQ is an AI backend that analyzes spoken audio and provides data-driven feedback on communication skills—tone, confidence, pauses, and delivery—along with context-aware coaching.
This repository contains the Google Colab + Flask + Ngrok backend used to expose the API publicly.

🔑 Getting Your ngrok Auth Token (IMPORTANT)

VerbIQ uses ngrok to expose the Flask server publicly.
You must set an ngrok auth token, or the server will not work.

👉 Follow this Colab guide: (IMP)

🔗 https://colab.research.google.com/drive/1PyLCIKYX7X_ef30yJepgDOajhepb2360?authuser=1#scrollTo=HnisTGHip9n7

1. Open the link above
2. Sign in with your Google account
3. If prompted, ask permissions to access ngrok
4. Run the cells shown in the notebook
5. Copy your ngrok auth token
6. Paste it into the settings icon and test for connection!!

##🧠 What This Backend Does
🎙️ Accepts audio recordings via REST API
📊 Extracts ML-based speech features (MFCCs, pacing, pauses)
🤖 Runs a TensorFlow emotion/confidence model
🧠 Uses Gemini AI only when confidence is low
📦 Returns structured JSON output
🌐 Exposes API publicly using ngrok

## 🛠️ Tech Stack
Python
TensorFlow / Keras
Librosa
Flask + Flask-CORS
Gemini API
ngrok
Google Colab

📁 Dataset Structure (Required)
Your dataset must follow this structure (RAVDESS-style):
archive.zip
└── audio_speech_actors_01-24/
    ├── Actor_01/
    │   ├── 03-01-01-01-01-01-01.wav
    │   ├── 03-01-02-01-01-01-01.wav
    ├── Actor_02/
    ├── ...
Steps:




⚠️ If you see a permissions popup — allow it. That’s normal.


Gemini is only invoked when model confidence is low, not for every request.

## 📡 API Usage
Endpoint
POST /analyze

Form Data
file: audio file (.wav, .mp3, .webm)
context: Interview Prep | Group Discussion | Debate

## ⚠️ Common Issues
404 on ngrok URL → Use /analyze, not /
Model shape mismatch → Delete old .keras file and retrain
No audio files detected → Check dataset path after extraction
Gemini errors → Invalid key or quota exceeded

## 📈 Why VerbIQ Is Different
ML-first (TensorFlow), not prompt-first
Gemini used strategically, not blindly
Real metrics, not generic advice
Designed for interviews, debates & leadership scenarios

🧩 Future Enhancements
Accent normalization
Speaker diarization
Longitudinal progress tracking
On-device inference
SaaS dashboard

## 🧠 Final Word
VerbIQ isn’t another “AI feedback tool.”
It’s structured practice for real-world communication—measured, repeatable, and brutally honest.

Speak smarter. Track progress. Win conversations.
