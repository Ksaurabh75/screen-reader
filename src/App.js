import React from 'react';
import './App.css';
import Page1, { StyledButton } from './Pages/Page1';
import { SelectionObserver } from './SelectionObserver';
import styled from 'styled-components';

const MainContainer = styled.div`
.askGia{
  position: absolute;
  top: 0;
  left: 0;
  display: none;
}
`


function App() {
  // const [announcement, setAnnouncement] = React.useState('Initial announcement')
  const [showAskGIA, setShowAskGia] = React.useState(true);
  const [query, setQuery] = React.useState('');
  const [selectedText, setSelectedText] = React.useState('');
  const selectionObserver = React.useMemo(()=>{
    const showAskGIAButton = (range) => {
      setShowAskGia(!!range);
      const askGiaBtn = document.getElementById('ask-gia-btn');
      if (range && askGiaBtn) {
        const rect = range.getBoundingClientRect();
        askGiaBtn.style.top = `${rect.top}px`;
        askGiaBtn.style.left = `${rect.right}px`;
        askGiaBtn.style.display = 'block';
        setQuery(range.toString());
      } else {
        askGiaBtn.style.display = 'none';
      }
    }
    const hidAskGiaButton = () => {
      setShowAskGia(false);
      const askGiaBtn = document.getElementById('ask-gia-btn');
      askGiaBtn.style.display = 'none';
    }
    let so = new SelectionObserver((range) => {
      if (range) {
        showAskGIAButton(range);
        console.log("**** Selection happend *****", range)
      } else {
        hidAskGiaButton();
        console.log("**** Cleared selection *****");
      }
    }, document.body);
    return so;
  }, []) 
  return (
    <MainContainer>
      <Page1 selectedText={selectedText} />
      {<StyledButton className='askGia' id="ask-gia-btn" onClick={()=>{
        setSelectedText(query);
      }} > Ask Gia</StyledButton>}
    </MainContainer>
  );
}

export default App;
