import React, { useCallback, useRef, useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import pdfFile from "./test.pdf";

import "./Sample.css";

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

function PDFViewer({ setEmbedStatus }) {
  const [file, setFile] = useState("You Don't Know JS - Types & Grammar.pdf");
  const [numPages, setNumPages] = useState();
  const [containerRef, setContainerRef] = useState(null);
  const [containerWidth, setContainerWidth] = useState();
  const renderedPages = useRef(0);

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
      <header>
      </header>
      <a href={pdfFile} target="_blank" rel="noreferrer">
        <p>Click to open PDF file in a new tab</p>
      </a>
      <div className="Example__container">
        <div className="Example__container__load">
          <label htmlFor="file">Load from file:</label>{" "}
          <input onChange={onFileChange} type="file" />
        </div>
        <div className="Example__container__document" ref={setContainerRef}>
          <Document
            file={pdfFile}
            onLoadSuccess={onDocumentLoadSuccess}
            options={options}
          >
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
