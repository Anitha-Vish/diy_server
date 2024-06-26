"token": 

"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NzU5MzBhOWFkYzlmOTJmZTIzM2QzZiIsImlhdCI6MTcxODk4MTQxMSwiZXhwIjoxNzE5MDY3ODExfQ.nppSeAAtxOXh-94kpkbHNrRzPjGGYsypnXbqDNu2CFQ"

{
    "username": "batman",
     "firstName": "bruce",
     "lastName": "wayn",
     "password": "t1234",
     "email": "bruce@wayn.com"
}



import './App.css'
import { Routes,Route } from 'react-router-dom'
import About from './pages/About'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Footer from './components/Footer'
import Header from './components/Header.jsx'
import Projects from './pages/Projects.jsx'
import Community from './pages/Community.jsx'

function App() {
 

  return (
    <div>
      <Header />
      <div>
        <Routes>
          <Route path="/" element = {<Home />} />
          <Route path="/projects" element = {<Projects />} />
          <Route path="/community" element = {<Community/> } />
          <Route path="/about" element = {<About />} />
          <Route path="/profile" element = {<Profile />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
