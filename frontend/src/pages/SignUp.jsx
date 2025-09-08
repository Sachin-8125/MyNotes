import React, { useState } from 'react'
import styles from './Login.module.css'
import CustomButton from '../components/CustomButton'
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios'

export default function SignUp() {
    let navigate = useNavigate();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [name,setName] = useState("");
    const [cPass,setCPass] = useState("");
    const [role,setRole] = useState("");   
    const [phone,setPhone] = useState("");  
    const [err,setErr] = useState(""); 

    const handleSubmit = async(e)=>{
        e.preventDefault();
        if(!name){
            setErr("Please Enter Name");
            return;
        }
        if(!email){
            setErr("Please Enter Email");
            return;
        }
        if(!password){
            setErr("Please Enter Password");
            return;
        }
        if(password !== cPass){
            setErr("Password and Confirm Password must be same");
            return;
        }
        if(!role){
            setErr("Please Select Role");
            return;
        }
        if(!phone){
            setErr("Please Enter Phone Number");
            return;
        }
        setErr("");
        console.log(email,password,name,role,phone);
        let payload = {name,email,password,role,phone};
        try {
            let res = await axios.post("http://localhost:8080/register",payload,{
                headers:{
                    "Content-Type": "application/json"
                }
            });
            if(res.status===201){
                alert("Registration Successful");
                navigate('/login');
            }
        } catch (error) {
            setErr("Something went wrong. Please try again later");
        }
    }

  return (
    <div className={styles.login}>
        <h1 className={styles.title}>Register to continue</h1>
            {err && <p className={styles.err}>{err}</p>}
        <form className={styles.form}>
            <input type="text" placeholder='Enter Your Name' className={styles.inputField} 
                onChange={(e)=>setName(e.target.value)}/>
            <input type="email" placeholder='Enter Your Email' className={styles.inputField} 
                onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" placeholder='Create Password' className={styles.inputField}
                onChange={(e)=>setPassword(e.target.value)}/>
            <input type="password" placeholder='Confirm Password' className={styles.inputField}
                onChange={(e)=>setCPass(e.target.value)}/>

            <select className={styles.select} onChange={(e)=>setRole(e.target.value)}>
                <option value="" disabled selected>Select Role</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="guest">Guest</option>
            </select>

            <input type="text" placeholder='Enter Phone Number' className={styles.inputField} 
              onChange={(e)=>setPhone(e.target.value)} />

            <CustomButton btnText='Register' handler={handleSubmit}/>
        </form>
        <p>Already have account? <Link to={"/login"}>Click here</Link></p>
    </div>
  )
}
