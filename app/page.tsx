"use client";
import React, { useEffect, useState } from 'react'
import { handleFileUpload } from './api/upload-pdf/route';
import { error } from 'console';
import {doc, onSnapshot,getFirestore} from 'firebase/firestore';
import { app } from './utils/firebaseConfig';


const db = getFirestore(app);


const page = () => {
  const [genRes,setGenRes] = useState<string[]>([]);
  const [loading,setLoading] = useState<boolean>(false);
  const [loaded,setLoaded] = useState<boolean>(false);
  const [docId,setDocId] = useState<string | null>(null);



  const uploadFile = async (e:React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setGenRes([]);
    const formData = new FormData();
    formData.append('resume', file);
    setLoading(true);
    const response =await  handleFileUpload(formData);
    if (response?.success && response.docId){
      setDocId(response.docId);
      setLoading(false);
      
    }
    else{
      setLoading(false);
      console.log("Error:", response?.error);
    }
  }

  useEffect( ()=> {
    if (!docId) return;

    const unsub = onSnapshot(doc(db,"resume_roasts",docId), (snapshot) => {
      const data = snapshot.data();

      if (data?.status === 'completed'){
        setGenRes(data.roastData || []);
        setLoading(false);
        setLoaded(true);
        setDocId(null);
      }
      else if (data?.status === "error"){
        alert("AI FAiled");
      }
    })

    return () => unsub();

  },[docId])



  return (
    <div className='flex flex-col items-center justify-center h-[100vh] w-full space-y-[50px] bg-[#03071e]'>
      <p>Resume Roaster</p>
      <div className='space-y-[50px] flex items-center flex-col'>
        <p>Upload Your Resume and let yourself be down to earth</p>
        <p>Know Your resume scores as well as what job you are currently suitable for</p>
        <div>
          <form >
            <input type="file" accept='.pdf' className='border border-dashed flex flex-col bg-[#7a0045] cursor-pointer' name='resume' onChange={uploadFile}  />
          </form>
        </div>
      </div>
      <div>{loaded && (<div>{genRes.map((item,id) => (
        <div key={id} className='flex flex-col space-y-[20px]'>
          <div >{item}</div>

        </div>
      ))}</div>)}</div>
    </div>
  )
}

export default page