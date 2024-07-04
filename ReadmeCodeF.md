-------  App.jsx


import './App.css'
import { Routes,Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import About from './pages/About'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Footer from './components/Footer'
import Header from './components/Header.jsx'
import Community from './pages/Community.jsx'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import ProjectList from './pages/ProjectList.jsx'
import ProjectDetail from './pages/ProjectDetail.jsx'
import EditProfile from './pages/EditProfile.jsx'
import AccountDeleted from './pages/AccountDeleted.jsx'
import EditPassword from './pages/SettingsPassword.jsx'
import EditEmail from './pages/SettingsEmail.jsx'
import DeleteAccount from './pages/SettingsDeleteAccount.jsx'


function App() {
 
  const [user, setUser] = useState(null) 
  const [ loading, setLoading ] = useState(true)

  useEffect(() => {
    try { 
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));   
   // console.log(user)
    if (token && user) {   // added user insted true to update components with username etc.
      setUser(user) }       
      else {
        setUser(null) }  // changed from true to user
      }
      catch(error) {
        console.error("Failed to parse user from local storage, error")
        setUser(null)
      }finally{
        setLoading(false)
      }
      
  }, []); 

  if(loading) {
    return <div>Loading..</div>
  }

  return (
    <div>
      <Header user={user} setUser={setUser} />
      <div>
        <Routes>
          <Route path="/" element = {<Home />} />
          <Route path="/projects" element = {<ProjectList />} />
          <Route path="/projects/:projectId" element= {<ProjectDetail />} />
          <Route path="/community" element = {<Community />} />
          <Route path="/about" element = {<About />} />
          <Route path="/profile" element = {user ? <Profile user={user} /> : <Navigate to="/login" />} />
          <Route path="/login" element = {<Login setUser={setUser} />} />
          <Route path="/register" element = {<Register setUser={setUser} />} />
          <Route path="/editprofile" element = { user ? <EditProfile user={user} setUser={setUser} /> : <Navigate to="login" />} />
          <Route path="/delete-account" element={<DeleteAccount user={user} setUser={setUser} />} />
          <Route path="/account-deleted" element={<AccountDeleted />} />
          <Route path="/password" element={< EditPassword user={user} setUser={setUser}/>} />
          <Route path="/email" element={<EditEmail user={user} setUser={setUser} />} />
        
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App


---------Login.jsx

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
  // useState ---------------------------------------
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

// Use effect for error timeout 

useEffect(() => { 
  if (error) {
  const timer = setTimeout( () => { setError(null) } , 4000) 
  return () => clearTimeout(timer) }
}, [error] )



  // HANDLERS --------------------------------------
  const handleInput = (e) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formValues.username || !formValues.password) {
      setError("Both fields are required.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      });

      const data = await response.json();

      if(!response.ok) {
        throw new Error (data.error || "Login faild");
      }

      localStorage.setItem("token", JSON.stringify(data.token));
      localStorage.setItem("user", JSON.stringify(data.user));

      setUser(data.user);
      navigate("/profile");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // RETURN --------------------------------------------------
  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white">
        <h2 className="text-4xl font-bold mb-2 text-center">Welcome Back!</h2>
        <p className="text-center text-xl mb-6 text-gray-600">
          Log in below to access your account.
        </p>

        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-gray-700 font-medium mb-2"
          >
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            value={formValues.username}
            onChange={handleInput}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-2"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Password"
              value={formValues.password}
              onChange={handleInput}
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-indigo-500"
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute inset-y-0 right-0 px-3 py-2"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-xl text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <Link
          to="/register"
          className="block text-center text-2xl underline mt-6 mb-32"
        >
          NOT A MEMBER? JOIN HERE
        </Link>

      {/*   {error && <p className="text-red-500 mt-4">{error}</p>}   */}  

      {error && (
          <div 
          className="flex items-center mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md animate-pulse">
            <span>{error}</span>
          </div>
        )}




      </form>
    </div>
  );
};

export default Login;

