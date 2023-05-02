import axios from 'axios';
import React, { useState } from 'react'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import "./login.scss"
import { AuthContext } from '../../context/AuthContext';
const Login = () => {
  const [credentilas, setCredentilas]=useState({
    username:undefined,
    password:undefined,
  });

  const {loading, error, dispatch}=useContext(AuthContext);
  const navigate=useNavigate()
  const handleChange=(e)=>{
    setCredentilas((prev)=>({...prev,[e.target.id]:e.target.value}));
  }
  const handleClick = async (e)=>{
    e.preventDefault()
    dispatch({type:"LOGIN_START"});
    try{
        const res=await axios.post("/auth/login",credentilas);
        if(res.data.isAdmin){
          dispatch({type:"LOGIN_SUCCESS",payload:res.data.details});
          navigate("/")
        }else{
          dispatch({type:"LOGIN_FAILURE",payload:{message:"You are not allowed"}});
        }
    }catch(err){
        dispatch({type:"LOGIN_FAILURE",payload:err.response.data});
    }
  }
  return (
    <div className="login">
        <div className='lContainer'>
        <input type="text" placeholder="Enter Username" id="username" onChange={handleChange} className="lInput" />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <button disabled={loading} onClick={handleClick} className="lButton">
          Login
        </button>
        {error && <span>{error.message}</span>}
        </div>
    </div>
  )
}

export default Login