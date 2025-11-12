import React from 'react'
import { Link } from 'react-router-dom'
import { MdDelete } from "react-icons/md";
import { Box, Paper } from '@mui/material';
import  { useState, useEffect } from 'react';
import { getHistoryAPI, removeHistoryAPI } from '../services/allAPI';


function History() {
  

  const [allHistory,setAllHistory] = useState([])
  useEffect(()=>{
    getHistoryDetails()
  },[])

  const getHistoryDetails = async ()=>{
    try{
      const result = await getHistoryAPI()
    console.log(result)
    if(result.status==200){
      setAllHistory(result.data)
    }
    }catch(err){
      console.log(err)
    }
  }
const deleteHistory=async(id)=>{
try{
  await removeHistoryAPI(id)
  getHistoryDetails()

}catch(err)
{
  console.log(err);
  
}
}

return (
    <div>
      <h1 className="text-center my-5">Downloaded Resume History</h1>
      <Link to={'/resume'} className='float-end me-5' style={{ marginTop: '-80px' }}>Back</Link>
      <Box component="section" className="container-fluid">
        <div className="row">
          {
            allHistory.length > 0 ? allHistory ?.map((item) => (
              <div className="col-md-4" key={item?.id}>
                <Paper elevation={3} sx={{ my: 5, p: 5, textlign: 'center' }} >
                  <div className="d-flex justify-content-between align-items-center">
                    <h6>Review At: {item?.timeStamp
                    }</h6>
                    <button onClick={()=>deleteHistory(item?.id)} className="btn text-danger fs-5"><MdDelete /></button>
                  </div>
                  <div className="border rounded p-3 ">
                    <img width={'200px'} height={'200px'} src={item?.
                      resumeImg
                    } alt="resume" className="img-fluid" />
                  </div>
                </Paper>
              </div>
            ))

              : <p>resume not dowloaded yet</p>
           }


        </div>

      </Box>
    </div>
  )
}

export default History