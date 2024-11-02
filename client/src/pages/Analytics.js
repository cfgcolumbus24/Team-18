import React from 'react';
import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

//npm install @google/generative-ai

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI('API_KEY');
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//Upload the file and specify a display name.
const uploadResponse = await fileManager.uploadFile("media/gemini.pdf", {
    mimeType: "application/pdf",
     displayName: "Gemini 1.5 PDF",
   }); 

function Analytics() {

    const navigate = useNavigate();
    const [query, setQuery] = useState('');

    const[history, setMessageHistory] = useState(["Message 1", "Message 2"])

    const returnToPreviousPage = () => {
        navigate("/home");
    }

    const handleMessage = async () => {
        setMessageHistory([...history, query]);
        console.log(history);
        setQuery('');
        const result = await model.generateContent([
            {fileData: {
                mimeType: uploadResponse.file.mimeType,
                fileUri: uploadResponse.file.uri,
               }},
            {text: prompt},
        ]);
        console.log(result);
    }

  return (
    <div>
        <Navbar />
        <button class="button ml-4 has-background-info has-text-black" onClick={returnToPreviousPage}>Back</button>
        <h1 class="is-size-1 has-text-centered">Prediction Generator</h1>
        <div class="Container has-background-info mx-6">
            {history.map((message, index) => {
                return(
                    <div key={index} class="Container has-background-light has-text-black has-text-rightmx-6">
                        <p class="is-size-5">{message}</p>
                </div>)
            })}
        </div>
        <div class="Container mx-6 mt-3">
            <textarea class="textarea" placeholder="Ask me a question about the data you selected!" value={query} onChange={(e) => {setQuery(e.target.value)}}></textarea>
            <button class="button has-background-link mt-1" onClick={handleMessage}>Submit</button>
        </div>
    </div>
  );
}

export default Analytics;