
import { Route, Routes } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/LandingPage.jsx'
import ResumeGenerator from './pages/ResumeGenerator.jsx'
import History from './pages/History.jsx'
import UserForm from './pages/UserForm.jsx'
import Pnf from './pages/Pnf.jsx'
import Header  from './Components/Header'
import Footer from './Components/Footer'
function App() {
 
  return (
    <>
    <Header/>
    <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/resume' element={<ResumeGenerator/>}/>
      <Route path='/form' element={<UserForm/>}/>
      <Route path='/history' element={<History/>}/>
      <Route path='/*' element={<Pnf/>}/>
    </Routes>
    <Footer/>
    </>
  )
}

export default App
