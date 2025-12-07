"use server";
// import {GoogleGenAI} from "@google/genai";


// const ai = new GoogleGenAI({
//     apiKey: process.env.GEMINI_API_KEY
// })

// export const handleFileUpload = async (formData:FormData) => {
//     const file = formData.get("resume") as File;

//     if (!file) return { success: false, error: "No file uploaded" };

//     try {
//         const buffer = await file.arrayBuffer();
//         const base64data = Buffer.from(buffer).toString('base64');

        
//             const response = await ai.models.generateContent({
//                 model:"gemini-2.5-flash",
//                 contents: [
//                     { text: "Parse this resume document and analyze it and do the following: 1.Name of the person,2.give a roast of the resume in the a paragraph,3.provide a score out of 100 in the next line,4.get the most suitable job for the resume,5.provide insights in a funny manner on how to improve his resume.Note that each data is to be seperated with '$' sign,dont highlight  texts with any kind of formatting "},
//                     {
//                         inlineData:{
//                             mimeType:'application/pdf',
//                             data: base64data
//                         }
//                     }
//                 ]
//             })
//             const text = response.text?.split('$').map((item) => item.trim()).filter( (item) => item.length> 0) || [];
//             const result = { success: true,data:text}
//             console.log(result);
//             return (result);
       

//     }
//     catch(error) {
//         return {success: false,error: "Failed to process data"}
//         console.log("Error occured when uploading file",error);
//     }
// }


import { adminDb } from "@/app/utils/firebaseAdmin";

export const handleFileUpload = async (formData:FormData) => {
    const file = formData.get("resume") as File;
    if (!file) return { success:false,error:"No File Uploaded"};

    try {
        const buffer = await file.arrayBuffer();
        const base64data = Buffer.from(buffer).toString('base64');

        const docRef = await adminDb.collection("resume_roasts").add({
            base64data:base64data,
            status:'processing',
            createdAt:new Date()
        });

        return {success: true,docId:docRef.id}
    }
    catch(error){
        console.log("Error occured:",error);
        return {success: false, error:"Error occured in uploading resume to db"};
    }
}