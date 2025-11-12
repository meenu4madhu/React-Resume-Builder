import React from 'react'
import UserInputs from '../Components/UserInputs'
import Preview from '../Components/Preview'

function UserForm() {
  //  create state for storing resume details
  const [resumeDetails,setresumeDetails]=React.useState({
    username:"",
    jobTitle:"",
    location:"",
    email:"",
    mobile:"",
    github:"",
    likedin:"",
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
  return (
    <div className='container'>
      <div className="row p-5">
        <div className="col-lg-6">
          <UserInputs resumeDetails={resumeDetails} setresumeDetails={setresumeDetails}/>
        </div>
        <div className="col-lg-6">
         {
          resumeDetails.username &&
          <Preview resumeDetails={resumeDetails}/>}
        </div>
      </div>

    </div>
  )
}

export default UserForm