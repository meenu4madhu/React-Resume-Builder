import React from 'react'
import { MdAttachEmail } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaWhatsapp } from "react-icons/fa6";
import { RiFacebookCircleLine } from "react-icons/ri";
import { GrInstagram } from "react-icons/gr";
function Footer() {
  return (
    <div style={{backgroundColor:'purple',color:'white',height:'300px'}} className='d-flex justify-content-center align-items-center p-5 flex-column '>
        <h3>Contact Us</h3>
        <h5 className='fw-bolder'><MdAttachEmail />resumebulider34@gmail.com</h5>
        <h5><BsFillTelephoneFill />1234567890</h5>
        <h4>Connect With Us</h4>
        <div className='d-flex justify-content-center fs-4 my-3 '>
            <FaWhatsapp  className='me-3'/>
            <RiFacebookCircleLine  className='me-3'/>
            <GrInstagram />
        </div>
        <p>Design & build with ❤️ using react</p>
    </div>
  )
}

export default Footer