import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bulma/css/bulma.min.css';
import './analytics.css'
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

function Analytics() {

    const navigate = useNavigate();
    const [query, setQuery] = useState('');

    const[history, setMessageHistory] = useState([])

    const returnToPreviousPage = () => {
        navigate("/home");
    }

    //Code to handle each message from the user 
    const handleMessage = async () => {
        const chat = model.startChat({
            history: history
        })
        const question = query;
        setQuery('');
        const newHistory = [...history, {role: 'user', parts: [{text: question}]}];
        setMessageHistory(newHistory);
        const result = await chat.sendMessage(question);
        setMessageHistory([...newHistory, {role: 'model', parts: [{text: result.response.text()}]}]);
    }

  return (
    <div>
        <Navbar />
        <button class="button ml-4 has-background-info has-text-black" onClick={returnToPreviousPage}>Back</button>
        <h1 class="is-size-1 has-text-centered">Prediction Generator</h1>
        <div className="chat-container">
            {history.map((message, index) => {
                if (message.role === "user") {
                    return(
                        <div key={index} class="Container has-background-light has-text-black has-text-right mx-6">
                            <p class="is-size-5">{message.parts[0].text}</p>
                    </div>)
                } else {
                    return(
                        <div key={index} class="Container has-background-success has-text-black has-text-left mx-6">
                            <p class="is-size-5">{message.parts[0].text}</p>
                    </div>)
                }
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
