import React, { useEffect, useState } from 'react'
import Header from "../Components/Header"
import Footer from "../Components/Footer"
import Preview from '../Components/Preview'
import { Link, useParams } from 'react-router-dom'
import { addHistoryAPI, getResumeAPI } from '../services/allAPI'
import { FaFileDownload } from "react-icons/fa";
import { IoIosRefreshCircle } from "react-icons/io";
import { FaBackward } from "react-icons/fa";
import Edit from '../Components/Edit'
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas'


function ViewResume() {
  const {id}=useParams()
  const [resume,setResume]=useState({})
  useEffect(()=>{
    getResumeDetails()
  },[])
  const getResumeDetails= async()=>{
    const result=await getResumeAPI(id)
    console.log(result);
    if(result.status==200){
      setResume(result.data)
    }
    
  }
  const handleDownloadResume=async ()=>{
  // create pdf
  const doc = new jsPDF();
  const preview=document.getElementById("preview")
  // take scrst of preview -hjtml2canvas
  const canvas=await html2canvas(preview,{scale:2})
  // console.log(canvas);
  // convert canvas to image
  const resumeImg = canvas.toDataURL('image/png')
  console.log(resumeImg);
  // add scrst to pdf
  const imgWidth = doc.internal.pageSize.getWidth()
  const imgHeight = doc.internal.pageSize.getHeight()
  doc.addImage(resumeImg,'PNG',0,0,imgWidth,imgHeight)
  // download pdf
  doc.save(`${resume.username}-resume.pdf`)
  // local time data = new Data
  const localTimeData = new Date()
   console.log(localTimeData);
  const timeStamp = `${localTimeData.toLocaleDateString()},${localTimeData.toLocaleTimeString()}`
  console.log(timeStamp);
  try{
    await addHistoryAPI({timeStamp,resumeImg})
  }
  catch(er)
  {
    console.log(er);
    
  }
  
  
  }
  return (
    <> 
    <div>  
    <div className="container my-5">
        <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-6 col-12">
            <div className="d-flex justify-content-center align-items-center mt-5">
              <button onClick={handleDownloadResume} className='btn fs-4 text-primary'><FaFileDownload/></button>
               <Edit resumeDetails={resume} setresumeDetails={setResume}/>
               <Link to={'/history'} className= 'fs-3 text-primary'><IoIosRefreshCircle /></Link>
               <Link to={'/resume'} className='fs-3 ms-2 text-success'>< FaBackward/></Link>
            </div>
            
              <div id='preview'><Preview resumeDetails={resume}/></div>  
            </div>
            <div className="col-md-2"></div>
        </div>
    </div>
    </div>
    </>
   
  )
}

export default ViewResume