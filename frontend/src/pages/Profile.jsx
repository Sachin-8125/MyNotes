import React, { useEffect, useState } from 'react'
import styles from './Profile.module.css'
import axios from 'axios'
import CustomButton from '../components/CustomButton';
import NavBar from '../components/Navigation';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const [err, setErr] = useState("");
  const [data, setData] = useState({});
  const userData = JSON.parse(localStorage.getItem("userData"));
  let token = userData?.token;
  let id = userData?.id;
  let navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line
  }, []);

  async function fetchProfile() {
    if (!token || !id) {
      setErr("User not logged in or user data missing.");
      return;
    }
    try {
      let res = await axios.get(`http://localhost:8080/profile/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`
          }
        });
      if (res.status === 200) {
        setData(res.data.data);
      } else {
        setErr("Could not fetch profile data");
      }
    } catch (error) {
      setErr(error.response?.data?.message || error.message);
    }
  }

  function logoutHandler() {
    localStorage.removeItem("userData");
    navigate('/login');
  }

  

  return (
    <>
    <NavBar id={id} login={token} username={data.name} title="MyNotes"/>
    <div className={styles.profileCard}>
      {err && <p className={styles.err}>{err}</p>}
      <h1 className={styles.title}>Profile</h1>
      <div className={styles.profileInfo}>
        <p><span className={styles.label}>Name:</span> {data.name}</p>
        <p><span className={styles.label}>Email:</span> {data.email}</p>
        <p><span className={styles.label}>Role:</span> {data.role}</p>
        <p><span className={styles.label}>Phone:</span> {data.phone}</p>
      </div>
      <CustomButton btnText='Refresh' handler={fetchProfile} customStyle={styles.btn}/>
      <CustomButton btnText='Edit Profile' handler={()=>
        alert("Feature coming soon")}
        customStyle={styles.btn}/>
      <CustomButton btnText='logout' handler={logoutHandler} customStyle={styles.btn}/>
    </div>
    </>
  )
}
