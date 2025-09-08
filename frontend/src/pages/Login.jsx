import React, { useState } from 'react'
import styles from './Login.module.css'
import CustomButton from '../components/CustomButton'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'

export default function Login() {
  let navigate = useNavigate();
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [err,setErr] = useState(""); 
  const handleSubmit= async(e)=>{
    e.preventDefault();
    if(!email || !password){
      setErr("Please fill all the details");
      return;
    }
    setErr("");
    try {
      let res = await axios.post("http://localhost:8080/login",{email,password},{
        headers:{
          "Content-Type": "application/json"  
        }
      });
      if(res.status===200){
        alert("Login Successful");
        localStorage.setItem("userData",JSON.stringify(res.data.data));
        navigate('/');
      }else{
        setErr("Invalid Credentials");
      }
    } catch (error) {
      setErr("Something went wrong. Please try again later");
    }
    console.log(email,password);
  }
  return (
    <div className={styles.login}>
        <h1 className={styles.title}>Login to continue</h1>
          {err && <p className={styles.err}>{err}</p>}
        <form className={styles.form}>
            <input type="email" placeholder='Username' className={styles.inputField} 
              onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" placeholder='Password' className={styles.inputField}
              onChange={(e)=>setPassword(e.target.value)}/>
            <CustomButton btnText='Login' handler={handleSubmit}/>
        </form>
        <p>don't have account? <Link to={"/register"}>Click here</Link></p>
    </div>
    
  )
}
