import React, { useEffect, useState, useRef } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import 'bulma/css/bulma.min.css';
import './analytics.css';
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

function Analytics() {
    const navigate = useNavigate();

    const [query, setQuery] = useState('');
    const [history, setMessageHistory] = useState([]);
    const chatContainerRef = useRef(null);

    const returnToPreviousPage = () => {
        navigate("/home");
    };

    const handleMessage = async () => {
        if (query.trim() === '') return; // Prevent sending empty messages
        const chat = model.startChat({ history: history });
        const question = query;
        setQuery('');
        const newHistory = [...history, { role: 'user', parts: [{ text: question }] }];
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
        <div>
            <Navbar />
            <button className="button ml-4 has-background-info has-text-black" onClick={returnToPreviousPage}>Back</button>
            <h1 className="is-size-1 has-text-centered">AI Analysis</h1>
            <div className="chat-container" ref={chatContainerRef}>
                {history.map((message, index) => (
                    <div key={index} className={`chat-bubble ${message.role}`}>
                        <p className="is-size-5">{message.parts[0].text}</p>
                    </div>
                ))}
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
