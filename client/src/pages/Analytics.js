import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import 'bulma/css/bulma.min.css';

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

function Analytics() {

    //Get filtered patient data passed from home screen
    const patientData = useLocation();
    const data = JSON.stringify(patientData.state);
    
    const navigate = useNavigate();

    const [query, setQuery] = useState('');
    const[history, setMessageHistory] = useState([{role: 'user', parts: [{text: data}]}])

    //Function to navigate back to home
    const returnToPreviousPage = () => {
        navigate("/home");
    }

    //Code to handle a submitted query by 1) Updating the chat history and 2) calling the genAI API
    const handleMessage = async () => {
        //Create an LLM chat using the saved history
        const chat = model.startChat({
            history: history
        })

        //Save the question asked by the user
        const question = query;
        setQuery('');

        //Update history
        const newHistory = [...history, {role: 'user', parts: [{text: question}]}];
        setMessageHistory(newHistory);
        
        //Send user question to LLM and store result in history
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
                console.log("INDEX", index)
                if (index > 0) {
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
