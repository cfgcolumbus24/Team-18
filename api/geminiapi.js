//npm install @google/generative-ai

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI('API_KEY');
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//Upload the file and specify a display name.
const uploadResponse = await fileManager.uploadFile("media/gemini.pdf", {
   mimeType: "application/pdf",
    displayName: "Gemini 1.5 PDF",
  });

const prompt = `I am providing you a json database of information for the 
                company NetCare Access. Please answer the question by the 
                user below solely based off the data table you are given. 
                If the user asks anything that can not be derived from the 
                table please respond with 'The table does not provide 
                enough information to answer this question'.`;

async function main() {

const result = await model.generateContent([
    {fileData: {
        mimeType: uploadResponse.file.mimeType,
        fileUri: uploadResponse.file.uri,
       }},
    {text: prompt},
  ]);

console.log(result.response.text());

}

main();

