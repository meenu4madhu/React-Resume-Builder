import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { FaXmark } from "react-icons/fa6";

const steps = ['Basic Information', 'Contact Details', 'Educational Details','Work Experience','Skills & Certifications','Review & Submit'];

function UserInputs() {
  const skillSuggestionArray=['NODE JS','REACT JS','MONGODB','EXPRESS JS','HTML','CSS','PYTHON','JAVASCRIPT','JAVA','C++','DJANGO','FLASK','SQL','POWER BI','EXCEL','DATA ANALYSIS']
 const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
//  create state for storing resume details
const [resumeDetails,setresumeDetails]=React.useState({
  username:"",
  jobTitle:"",
  location:"",
  email:"",
  mobile:"",
  github:"",
  linedin:"",
  portfolio:"",
  course:"",
  college:"",
  university:"",
  passoutyear:"",
  jobType:"",
  company:"",
  cLocation:"",
  duration:"",
  userSkills:[],
  summary:""
})
// reference to skill input tag
const skillRef=React.useRef()
console.log(resumeDetails);

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

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

  const renderSteps=(stepCount)=>{
   switch(stepCount)
   {
    case 0: return(<div>
        <h3>Personal Details</h3>
        <div className=" row p-3">
            <TextField value={resumeDetails.username} onChange={e=>setresumeDetails({...resumeDetails,username:e.target.value})} id="standard-fname" label="Full Name" variant="standard" />
            <TextField value={resumeDetails.jobTitle} onChange={e=>setresumeDetails({...resumeDetails,jobTitle:e.target.value})} id="standard-title" label="Job Title" variant="standard" />
            <TextField value={resumeDetails.location} onChange={e=>setresumeDetails({...resumeDetails,location:e.target.value})} id="standard-location" label="Location" variant="standard" />
        </div>
    </div>
    )
    case 1: return(<div>
        <h3>Contact Details</h3>
          <div className=" row p-3">
            <TextField value={resumeDetails.email} onChange={e=>setresumeDetails({...resumeDetails,email:e.target.value})} id="standard-email" label="Email" variant="standard" />
            <TextField value={resumeDetails.mobile} onChange={e=>setresumeDetails({...resumeDetails,mobile:e.target.value})} id="standard-ph" label="Phone Number" variant="standard" />
            <TextField value={resumeDetails.github} onChange={e=>setresumeDetails({...resumeDetails,github:e.target.value})} id="standard-git" label="Github Profile Link" variant="standard" />
            <TextField value={resumeDetails.linedin} onChange={e=>setresumeDetails({...resumeDetails,linedin:e.target.value})} id="standard-linkedin" label="Linkedin Profile Link" variant="standard" />
            <TextField value={resumeDetails.portfolio} onChange={e=>setresumeDetails({...resumeDetails,portfolio:e.target.value})} id="standard-portfolio" label="Portfolio Link" variant="standard" />
        </div>
    </div>
    )
    case 2: return(<div>
        <h3>Educational Details</h3>
        <div className=" row p-3">
            <TextField value={resumeDetails.course}  onChange={e=>setresumeDetails({...resumeDetails,course:e.target.value})} id="standard-course" label="Course Name" variant="standard" />
            <TextField value={resumeDetails.college} onChange={e=>setresumeDetails({...resumeDetails,college:e.target.value})} id="standard-college" label="College Name " variant="standard" />
            <TextField value={resumeDetails.university} onChange={e=>setresumeDetails({...resumeDetails,university:e.target.value})} id="standard-unv" label="University" variant="standard" />
            <TextField value={resumeDetails.passoutyear} onChange={e=>setresumeDetails({...resumeDetails,passoutyear:e.target.value})} id="yp" label="Year of Passout" variant="standard" />
            
        </div>
    </div>
    )
    case 3: return(<div>
        <h3>Professional Details</h3>
         <div className=" row p-3">
            <TextField value={resumeDetails.jobType} onChange={e=>setresumeDetails({...resumeDetails,jobType:e.target.value})} id="standard-job" label="Job or Internship" variant="standard" />
            <TextField value={resumeDetails.company} onChange={e=>setresumeDetails({...resumeDetails,company:e.target.value})} id="standard-cmp" label="Company Name" variant="standard" />
            <TextField value={resumeDetails.cLocation} onChange={e=>setresumeDetails({...resumeDetails,cLocation:e.target.value})} id="standard-cmploc" label="Company Location" variant="standard" />
            <TextField value={resumeDetails.duration} onChange={e=>setresumeDetails({...resumeDetails,duration:e.target.value})} id="standard-dur" label="Duration" variant="standard" />
            
        </div>
    </div>
    )
    case 4: return(<div>
        <h3>Skills</h3>
        <div className="d-flex align-items-center justify-content-between p-3 w-100">
           <input ref={skillRef} type="text" placeholder='Add Skills' className='form-control' />
           <Button onClick={()=>addSkill(skillRef.current.value)} variant='text'>ADD</Button>
        </div>
        <h5>Suggestions</h5>
        <div className="d-flex flex-wrap justify-content-between my-3">
          {
          skillSuggestionArray.map((item,index)=>(
            <Button onClick={()=>addSkill(item)} key={index} variant='outlined'className='m-2'>{item}</Button>
          ))
          }
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
    )
    case 5: return(<div>
        <h3>Summary</h3>
        <div className="p-3 row">
          <TextField onChange={e=>setresumeDetails({...resumeDetails,summary:e.target.value})} id="standard-basic-summary" label="Write a short summary of yourself" variant="standard" multiline rows={7} defaultValue={'A Full Stack Developer is a software professional who can work on both the front end (the part of a website or app users see and interact with) and the back end (the server, database, and logic behind the scenes).They handle the complete development process, from designing user interfaces using technologies like HTML, CSS, and JavaScript (React, Angular, etc.) to managing databases and servers using Node.js, Express.js, Python, PHP, or Java along with MongoDB, MySQL, or PostgreSQL.'}/>
        </div>
    </div>
    )
    default: return null
   }
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
          {/* render contents according to steps */}
          <Box>
            {renderSteps(activeStep)}
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}

export default UserInputs