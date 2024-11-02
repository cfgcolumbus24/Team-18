import React from 'react';
import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import { useNavigate } from 'react-router-dom';

function Analytics() {

    const navigate = useNavigate();
    const [query, setQuery] = useState('');

    const[history, setMessageHistory] = useState(["Message 1", "Message 2"])

    const returnToPreviousPage = () => {
        navigate("/home");
    }

    const handleMessage = () => {
        setMessageHistory([...history, query]);
        console.log(history);
        setQuery('');
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
