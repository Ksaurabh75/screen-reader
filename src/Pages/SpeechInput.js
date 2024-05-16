import React, { useState } from 'react';
import styled from 'styled-components';
import { guidedTexts } from './Page1';

const InputWithLabel = styled.div`
display: flex;
flex-direction: column;
label {
    font-weight: 500;
    margin: 16px;
}
`;
const InputText = styled.input`
    padding: 12px 16px;
    border : 1px solid #ccc;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 300;
    max-width: 250px;
    
`;
const SpeechInput = ({label, id, onFocus}) => {
  const [inputValue, setInputValue] = useState("");
  const [listening, setListening] = useState(false);
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const SpeechGrammarList =
    window.SpeechGrammarList || window.webkitSpeechGrammarList;
  const SpeechRecognitionEvent =
    window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;
  const synth = window.speechSynthesis;

  const recognition = React.useMemo(() => {
    let recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.maxDuration = 2000;
    recognition.onstart = () => {
      setListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputValue(transcript);
    };
    recognition.onend = () => {
      setListening(false);
    };
    return recognition;
  }, []);

  
  const handleInputFocus = () => {
    onFocus(id);
    const utterance = new SpeechSynthesisUtterance(`Please enter ${label}. ${guidedTexts[id]}`);
    utterance.rate = 0.7; // Adjust speech rate (0.1 - 10)
    synth.speak(utterance);
    utterance.onend = () => {
      // When speech synthesis of label is done, start speech recognition
      recognition.start();
    };
  };

  React.useEffect(() => {
    if (listening) {
      setTimeout(() => {
        recognition.stop();
        setListening(false);
      }, 5000);
    } else {
        recognition.stop();
    }
  }, [listening]);

  return (
    <InputWithLabel>
      <label htmlFor={id}>{label}</label>
      <div>
        <InputText
          id={id}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={handleInputFocus}
        />
        {listening && <p>Listening...</p>}
        {/* <button onClick={handleToggleListening}>
          {listening ? "Stop Listening" : "Start Listening"}
        </button> */}
      </div>
    </InputWithLabel>
  );
};

export default SpeechInput;
