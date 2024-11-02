let mediaRecorder;
let recordedChunks = [];


const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");
const downloadLink = document.getElementById("downloadLink");

async function startRecording() {

    const stream = await navigator.mediaDevices.getUserMedia({audio: true });

    //'audio/mp4' is not directly supported, so WebM is an alternative
    mediaRecorder = new MediaRecorder(stream, {
        mimeType: "audio/webm" 
    });

    recordedChunks = [];

    mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
            recordedChunks.push(event.data);
        }
    };

    // Enable the stop button and disable the start button
    stopButton.disabled = false;
    startButton.disabled = true;

    // Start recording
    mediaRecorder.start();
    console.log("Recording started...");
}


function stopRecording() {
    // Stop the recording
    mediaRecorder.stop();
    console.log("Recording stopped...");

    // When the recording stops, process and automatically download the audio file
    mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunks, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);

        // Automatically create and click a download link
        const downloadLink = document.createElement("a");
        downloadLink.href = url;
        downloadLink.download = "recording.mp4"; 
        downloadLink.style.display = "none"; 
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink); 

        startButton.disabled = false;
        stopButton.disabled = true;

        URL.revokeObjectURL(url);
    };
}
startButton.addEventListener("click", startRecording);
stopButton.addEventListener("click", stopRecording);
