// npm install assemblyai

import { AssemblyAI } from 'assemblyai'

const client = new AssemblyAI({
  apiKey: "API_KEY"
})

const audioUrl =
  'https://assembly.ai/sports_injuries.mp4'

const config = {
  audio_url: audioUrl
}

const run = async () => {
  const transcript = await client.transcripts.transcribe(config)
  console.log(transcript.text)
}