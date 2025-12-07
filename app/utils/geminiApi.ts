'use server';
import {GoogleGenAI} from "@google/genai";

const ai  = new GoogleGenAI({
    apiKey:process.env.GEMINI_API_KEY
});

export async function handleApiCall(){
    try {
        
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: "Explain how AI works in a few words",
          });
          console.log(response.text);
          return response.text;
    }
    catch(error){
        console.error(error);
        return "Error happend when calling gemini api";
    }
}
    

