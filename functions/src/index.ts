import * as v2 from 'firebase-functions';
import * as admin from 'firebase-admin';
import {GoogleGenAI} from "@google/genai";
import { onDocumentCreated } from 'firebase-functions/v2/firestore';

admin.initializeApp();


v2.setGlobalOptions({region: "asia-south1",maxInstances:10,timeoutSeconds:60,memory:'1GiB'});

const ai = new GoogleGenAI({
    apiKey:process.env.GEMINI_API_KEY
})

export const roastResume = onDocumentCreated({document: "resume_roasts/{docId}",region: 'asia-south1'} ,async (event) => {
    const data = event.data?.data();
    const docId = event.params.docId;

    if (!data || data.status !== "processing") return;

    try {
        v2.logger.info(`Roasting Resume: ${docId}`);
        const response = await ai.models.generateContent({
            model:"gemini-2.5-flash",
            contents: [
                { text: "Parse this resume document and analyze it and do the following: 1.Name of the person,2.give a roast of the resume in the a paragraph,3.provide a score out of 100 in the next line,4.get the most suitable job for the resume,5.provide insights in a funny manner on how to improve his resume.Note that each data is to be seperated with '$' sign,dont highlight  texts with any kind of formatting "},
                {
                    inlineData:{
                        mimeType:'application/pdf',
                        data: data.base64data
                    }
                }
            ]
        })
        const text = response.text?.split('$').map((item) => item.trim()).filter( (item) => item.length> 0)

        await event.data?.ref.update({
            status:"completed",
            roastData:text,
            base64data: admin.firestore.FieldValue.delete(),
            processedAt: admin.firestore.FieldValue.serverTimestamp()
        });

        v2.logger.info(`FINISHED ROASTING: ${docId}`);
    }
    catch(error){
        v2.logger.error("Roast failed:",error);
        await event.data?.ref.update({status: "Error",error:"Something happened with gemini"})
    }
})

