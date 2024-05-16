import React, { useState, useEffect } from 'react';

const TextToSpeech = () => {
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [textToSpeak, setTextToSpeak] = useState('');

  useEffect(() => {
    // Fetch available voices when component mounts
    const fetchVoices = () => {
      const synth = window.speechSynthesis;
      const availableVoices = synth.getVoices();
      setVoices(availableVoices);
      setSelectedVoice(availableVoices.find(voice => voice.default));
    };

    // Add event listener for when voices change
    window.speechSynthesis.onvoiceschanged = fetchVoices;

    // Cleanup
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const speakText = () => {
    if (selectedVoice && textToSpeak) {
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.voice = selectedVoice;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleVoiceChange = event => {
    const selectedVoiceIndex = event.target.value;
    setSelectedVoice(voices[selectedVoiceIndex]);
  };

  return (
    <div>
      <h1>Text to Speech</h1>
      <select onChange={handleVoiceChange}>
        {voices.map((voice, index) => (
          <option key={index} value={index}>
            {`${voice.name} (${voice.lang})`}
          </option>
        ))}
      </select>
      <textarea
        rows="4"
        cols="50"
        value={textToSpeak}
        onChange={e => setTextToSpeak(e.target.value)}
        placeholder="Enter text to speak..."
      />
      <button onClick={speakText}>Speak</button>
    </div>
  );
};

export default TextToSpeech;
