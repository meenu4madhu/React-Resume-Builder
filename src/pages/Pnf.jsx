import React from 'react'
import { Link } from 'react-router-dom'

function Pnf() {
  return (
    <div style={{height:'80vh'}} className='d-flex justify-content-center align-items-center my-5 p-5  flex-column'>
    <img width={'40%'} src="https://cdn.dribbble.com/userupload/20420676/file/original-aac8f7f838812fa53cd92617fad5f892.gif" alt="page not found" />
    <h1>404!</h1>
    <h4>Page Not Found</h4>
    <Link className='btn btn-success' to={'/'}>Go to Home</Link>
    </div>
  )
}

export default Pnf