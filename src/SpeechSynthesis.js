import React, { useState } from 'react';

const SpeechToTextWithTimeout = () => {
  const [transcript, setTranscript] = useState('');
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);


  const startRecognition = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setTranscript(transcript);
      setListening(false); // Stop listening when speech is recognized
    };
    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setListening(false); // Stop listening on error
    };
    recognition.onend = () => {
      setListening(false); // Stop listening when speech recognition ends
    };
    recognition.maxDuration = 5000; // Set maximum duration to 5 seconds (5000 milliseconds)
    setListening(true); // Start listening
    recognition.start();
  };
  const speakText = () => {
    if (transcript) {
      const utterance = new SpeechSynthesisUtterance(transcript);
      window.speechSynthesis.speak(utterance);
      setSpeaking(true);
      utterance.onend = () => {
        setSpeaking(false);
      };
    }
  };

  return (
    <div>
      <button onClick={startRecognition} disabled={listening}>
        {listening ? 'Listening...' : 'Start Speech Recognition'}
      </button>
      <p>Transcript: {transcript}</p>
      <button onClick={speakText} disabled={!transcript || speaking}>
        Speak Transcription
      </button>
    </div>
  );
};

export default SpeechToTextWithTimeout;
