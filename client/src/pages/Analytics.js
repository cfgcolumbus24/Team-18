import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import 'bulma/css/bulma.min.css';
import './analytics.css';
import { FaArrowLeft } from 'react-icons/fa';
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

function Analytics() {
    const navigate = useNavigate();

    //Get filtered patient data passed from home screen
    const patientData = useLocation();
    const data = JSON.stringify(patientData.state);

    const [query, setQuery] = useState('');
    const [history, setMessageHistory] = useState([{role: 'user', parts: [{text: data}]}]);
    const chatContainerRef = useRef(null);

    //Return back to main page
    const returnToPreviousPage = () => {
        navigate("/home");
    };

    const handleMessage = async () => {
        if (query.trim() === '') return; // Prevent sending empty messages
        const chat = model.startChat({ history: history });
        const originQuery = query;
        const question = `I am providing you a database of information 
                          concerning patients at NetCare Access. Please answer 
                          the question by the user below solely based off the 
                          data table you are given. If the user asks anything 
                          that can not be answered or derived from table please 
                          respond with 'The table does not provide enough 
                          information to answer this question'. Also when 
                          prompted with a question only provide an answer to 
                          the question do not output all the logic you did to 
                          calculate, the answers should be short and percise.` 
                          + query;

        setQuery('');
        const newHistory = [...history, { role: 'user', parts: [{ text: originQuery }] }];
        setMessageHistory(newHistory);
        
        const result = await chat.sendMessage(question);
        setMessageHistory([...newHistory, { role: 'model', parts: [{ text: result.response.text() }] }]);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent adding a new line
            handleMessage(); // Call the handleMessage function
        }
    };

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [history]);

    return (
        <div className="mt-2">
            <button className="button ml-4 is-link has-text-white" onClick={returnToPreviousPage}>            
                <FaArrowLeft style={{ marginRight: '8px' }} /> Go Back</button>
            <h1 className="is-size-1 has-text-centered">AI Analysis</h1>
            <div className="chat-container" ref={chatContainerRef}>

                {history.map((message, index) => {
                    if (index !== 0) {
                        return(<div key={index} className={`chat-bubble ${message.role}`}>
                            <p className="is-size-5">{message.parts[0].text}</p>
                        </div>)
                    }
                })}
            </div>
            <div className="container mx-6 mt-3">
                <div className="input-group">
                    <textarea
                        className="textarea"
                        placeholder="Ask me a question about the data you selected!"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button className="button has-background-info has-text-black ml-2" onClick={handleMessage}>Submit</button>
                </div>
            </div>
        </div>
    );
}

export default Analytics;
