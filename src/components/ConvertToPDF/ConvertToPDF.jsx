import React, { useState } from 'react';
import { PDFViewer, Document, Page, Text, Image } from '@react-pdf/renderer';

const ConvertToPDF = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [pdfDocument, setPdfDocument] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleJsonInputChange = (event) => {
    setJsonInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const parsedJSONdata = JSON.parse(jsonInput);
      const generatedPDF = renderPDF(parsedJSONdata);
      setPdfDocument(generatedPDF);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Invalid JSON format');
    }
  };

  const renderPDF = (data) => {
    return (
      <Document>
        {data.questions.map((question, index) => (
          <Page key={index}>
            <Text>{question.title}</Text>
            {question.elements.map((element, idx) =>
              element.type === 'text' ? (
                <Text key={idx}>{element.value}</Text>
              ) : element.type === 'image' ? (
                <Image key={idx} src={element.value} />
              ) : null
            )}
          </Page>
        ))}
      </Document>
    );
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <p>Input your JSON file here</p>
          <center>
            <br />
            <br />
            <textarea
              id="jsonInput"
              name="jsonInput"
              value={jsonInput}
              onChange={handleJsonInputChange}
              rows={25}
              cols={80}
              placeholder="Enter JSON"
            />
          </center>
        </div>
        <br />
        <center>
          <input className="btn" type="submit" />
          <br />
          See PDF Below
          <br />
          {loading && <p>Loading PDF...</p>}
        </center>
      </form>
      <br />
      <br />
      <div style={{ width: '100%', height: '800px' }}>
        <PDFViewer style={{ width: '100%', height: '100%' }}>
          {pdfDocument}
        </PDFViewer>
      </div>
    </div>
  );
};

export default ConvertToPDF;
