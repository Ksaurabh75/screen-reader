import React, { useCallback, useRef, useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import pdfFile from "./test2.pdf";
import styled from "styled-components";

import "./Sample.css";
import { StyledButton } from "./Page1";

function traverseAndConcatenateText(node) {
  let concatenatedText = '';

  if (node === null) {
      return concatenatedText;
  }

  for (let i = 0; i < node.childNodes.length; i++) {
      const childNode = node.childNodes[i];
      if (childNode.nodeType === Node.TEXT_NODE) {
          concatenatedText += childNode.textContent.trim();
      } else if (childNode.nodeType === Node.ELEMENT_NODE) {
          const tagName = childNode.tagName.toLowerCase();
          if (tagName === 'h1' || tagName === 'h2' || tagName === 'h3' || tagName === 'h4' || tagName === 'h5' || tagName === 'h6' ||
              tagName === 'p' || tagName === 'span') {
              concatenatedText += childNode.textContent.trim();
          } else {
              concatenatedText += traverseAndConcatenateText(childNode);
          }
      }
  }

  return concatenatedText;
}

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
};

const resizeObserverOptions = {};

const maxWidth = 800;
const ControlsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  .language{
    font-size: 14px;
    background-color: #f5f5f5;
    border-radius: 8px;
    cursor: pointer;
    padding: 12px;
    label {
      margin: 0 8px;
    }
  }
`;

function PDFViewer({ setEmbedStatus, onTempQueryChange, onTempQueryResponseChange }) {
  const [file, setFile] = useState("You Don't Know JS - Types & Grammar.pdf");
  const [numPages, setNumPages] = useState();
  const [containerRef, setContainerRef] = useState(null);
  const [containerWidth, setContainerWidth] = useState();
  const renderedPages = useRef(0);
  const [language, setLanguage] = useState(window.navigator.language);


  const summarisePdf = () =>{
    const Id = Math.ceil(Math.random() * 10000);
    onTempQueryChange({requestGroupId:`${Id}`, message:`Please summarize this Pdf`});
    const pdfContent = document.querySelector('.react-pdf__Document');
    const textContent = traverseAndConcatenateText(pdfContent);
    console.log("**** Text Content is ", textContent );

    fetch('http://localhost:5000/summarize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "queryData": textContent, "lang":language }),
    }).then((res)=>{
      return res.text();
    }).then((data)=>{
      onTempQueryResponseChange({requestGroupId:`${Id}`, message:data});
      console.log("**** Summarized Data is ", data);
    })
  }

  const onResize = useCallback((entries) => {
    const [entry] = entries;

    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);

  function onFileChange(event) {
    renderedPages.current = 0;
    const { files } = event.target;
    const file = files ? files[0] : null;
    if (file) {
      console.log("**** File is ", file);
    }

    if (files && files[0]) {
      setFile(files[0] || null);
      setEmbedStatus({
        docType: "PDF",
        docContainerId: "viewer1",
        status: "loading",
      });
    }
  }

  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages);
  }

  function onPageRenderSuccess() {
    renderedPages.current += 1;
    if (renderedPages.current === numPages) {
      setEmbedStatus({
        docType: "PDF",
        docContainerId: "viewer1",
        status: "rendered",
      });
    }
  }

  return (
    <div className="Example">
      <header></header>
      <ControlsContainer>
        <StyledButton onClick={() => summarisePdf()}>
          Summarise Document
        </StyledButton>
        <div className="language">
          <label for="language">Choose Language</label>

          <select
            name="language"
            id="language"
            onChange={(event) => {
              setLanguage(event.target.value);
            }}>
            <option selected = {window.navigator.language.toLowerCase() === "en-us" || window.navigator.language.toLowerCase() === "en-gb"} value="en-us">English</option>
            <option selected = {window.navigator.language.toLowerCase() === "fr"} value="fr">French</option>
            <option selected = {window.navigator.language.toLowerCase() === "hi"} value="hi">Hindi</option>
            <option selected = {window.navigator.language.toLowerCase() === "de"} value="de">German</option>
          </select>
        </div>
      </ControlsContainer>

      <div className="Example__container">
        <div className="Example__container__document" ref={setContainerRef}>
          <Document
            file={pdfFile}
            onLoadSuccess={onDocumentLoadSuccess}
            options={options}>
            {Array.from(new Array(numPages || 0), (el, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                width={
                  containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth
                }
                onRenderSuccess={onPageRenderSuccess}
                scale={0.6}
              />
            ))}
          </Document>
        </div>
      </div>
    </div>
  );
}

export default PDFViewer;
