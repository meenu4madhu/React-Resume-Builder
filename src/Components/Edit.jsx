import React, { useState,useRef } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { MdEditDocument } from "react-icons/md";
import TextField from '@mui/material/TextField';
import { FaXmark } from "react-icons/fa6";
import { updateResumeAPI } from '../services/allAPI';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  maxHeight:'80vh',
  overflowY:'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
function Edit({resumeDetails,setresumeDetails}) {
    const [open,setOpen]=useState(false)
    const skillRef=useRef()
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const addSkill=(skill)=>{
    if(resumeDetails.userSkills.includes(skill))
    {
      alert("The given skill already added, please add another!!!!")
    }
    else{
      setresumeDetails({...resumeDetails,userSkills:[...resumeDetails.userSkills,skill]})
      // to clear add skill text box
      skillRef.current.value=""
    }
  }
const removeSkill=(skill)=>{
  setresumeDetails({...resumeDetails,userSkills:resumeDetails.userSkills.filter(item=>item!=skill)})
}
const handleResumeUpdate = async()=>{
  const{id,username,jobTitle,location}=resumeDetails
  if(!username && !jobTitle && !location){
   alert("Please fill the form completely!!!")
  }
  else{
    console.log("API Call");
    try{
      const result = await updateResumeAPI(id,resumeDetails)
      console.log(result);
      if(result.status==200)
      {
        alert("Resume Updated Successfully!")
        handleClose()
      }
      
    }catch(err)
    {
      console.log(err);
      
    }
    
  }
}

  return (
    <div>
        <button onClick={handleOpen} className='btn fs-4 text-warning'><MdEditDocument/>
        </button>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Resume Details
          </Typography>
          <Box id="modal-modal-description" sx={{ mt: 2 }}>
            {/* personal */}
             <div>
                    <h3>Personal Details</h3>
                    <div className=" row p-3">
                        <TextField value={resumeDetails.username} onChange={e=>setresumeDetails({...resumeDetails,username:e.target.value})} id="standard-fname" label="Full Name" variant="standard" />
                        <TextField value={resumeDetails.jobTitle} onChange={e=>setresumeDetails({...resumeDetails,jobTitle:e.target.value})} id="standard-title" label="Job Title" variant="standard" />
                        <TextField value={resumeDetails.location} onChange={e=>setresumeDetails({...resumeDetails,location:e.target.value})} id="standard-location" label="Location" variant="standard" />
                    </div>
                    </div>
                    {/* contact */}
                    <div>
                            <h3>Contact Details</h3>
                              <div className=" row p-3">
                                <TextField value={resumeDetails.email} onChange={e=>setresumeDetails({...resumeDetails,email:e.target.value})} id="standard-email" label="Email" variant="standard" />
                                <TextField value={resumeDetails.mobile} onChange={e=>setresumeDetails({...resumeDetails,mobile:e.target.value})} id="standard-ph" label="Phone Number" variant="standard" />
                                <TextField value={resumeDetails.github} onChange={e=>setresumeDetails({...resumeDetails,github:e.target.value})} id="standard-git" label="Github Profile Link" variant="standard" />
                                <TextField value={resumeDetails.linedin} onChange={e=>setresumeDetails({...resumeDetails,linedin:e.target.value})} id="standard-linkedin" label="Linkedin Profile Link" variant="standard" />
                                <TextField value={resumeDetails.portfolio} onChange={e=>setresumeDetails({...resumeDetails,portfolio:e.target.value})} id="standard-portfolio" label="Portfolio Link" variant="standard" />
                            </div>
                        </div>
                        {/* education */}
                        <div>
                                <h3>Educational Details</h3>
                                <div className=" row p-3">
                                    <TextField value={resumeDetails.course}  onChange={e=>setresumeDetails({...resumeDetails,course:e.target.value})} id="standard-course" label="Course Name" variant="standard" />
                                    <TextField value={resumeDetails.college} onChange={e=>setresumeDetails({...resumeDetails,college:e.target.value})} id="standard-college" label="College Name " variant="standard" />
                                    <TextField value={resumeDetails.university} onChange={e=>setresumeDetails({...resumeDetails,university:e.target.value})} id="standard-unv" label="University" variant="standard" />
                                    <TextField value={resumeDetails.passoutyear} onChange={e=>setresumeDetails({...resumeDetails,passoutyear:e.target.value})} id="yp" label="Year of Passout" variant="standard" />
                                    
                                </div>
                            </div>
                            {/* professional */}
                            <div>
                                    <h3>Professional Details</h3>
                                     <div className=" row p-3">
                                        <TextField value={resumeDetails.jobType} onChange={e=>setresumeDetails({...resumeDetails,jobType:e.target.value})} id="standard-job" label="Job or Internship" variant="standard" />
                                        <TextField value={resumeDetails.company} onChange={e=>setresumeDetails({...resumeDetails,company:e.target.value})} id="standard-cmp" label="Company Name" variant="standard" />
                                        <TextField value={resumeDetails.cLocation} onChange={e=>setresumeDetails({...resumeDetails,cLocation:e.target.value})} id="standard-cmploc" label="Company Location" variant="standard" />
                                        <TextField value={resumeDetails.duration} onChange={e=>setresumeDetails({...resumeDetails,duration:e.target.value})} id="standard-dur" label="Duration" variant="standard" />
                                        
                                    </div>
                                </div>
                                {/* skill */}
                                <div>
        <h3>Skills</h3>
        <div className="d-flex align-items-center justify-content-between p-3 w-100">
           <input ref={skillRef} type="text" placeholder='Add Skills' className='form-control' />
           <Button onClick={()=>addSkill(skillRef.current.value)} variant='text'>ADD</Button>
        </div>
        <h5>Added Skills : </h5>
        <div className="d-flex flex-wrap justify-content-between my-3">
          { resumeDetails.userSkills?.length>0?
          resumeDetails.userSkills?.map((skill,index)=>(
            <Button key={index} variant='contained' className='m-1'>
              {skill}<FaXmark onClick={()=>removeSkill(skill)} className='ms-2 cursor-pointer'/>
              </Button>
          )):
          <p className='fw-bolder'>NO Skills are added Yet!</p>
          }
          
        </div>
    </div>
                                {/* summary */}
                                <div>
                                        <h3>Summary</h3>
                                        <div className="p-3 row">
                                          <TextField onChange={e=>setresumeDetails({...resumeDetails,summary:e.target.value})} id="standard-basic-summary" label="Write a short summary of yourself" variant="standard" multiline rows={7} defaultValue={'A Full Stack Developer is a software professional who can work on both the front end (the part of a website or app users see and interact with) and the back end (the server, database, and logic behind the scenes).They handle the complete development process, from designing user interfaces using technologies like HTML, CSS, and JavaScript (React, Angular, etc.) to managing databases and servers using Node.js, Express.js, Python, PHP, or Java along with MongoDB, MySQL, or PostgreSQL.'}/>
                                        </div>
                                    </div>
                                    {/* button update */}
                                    <div>
                                      <button onClick={handleResumeUpdate} className='btn btn-warning text-light'>Update</button>
                                    </div>
                                    
          </Box>
        </Box>
      </Modal>
    </div>
  )
}

export default Edit