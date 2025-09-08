import React, { useEffect, useState } from 'react'
import Navigation from '../components/Navigation'
import { useNavigate } from 'react-router-dom'
import styles from './Home.module.css'
import LeftNav from '../components/LeftNav'
import RightNav from '../components/RightNav'
import axios from 'axios'

export default function Home() {
  let navigate = useNavigate();
  let [username, setUsername] = useState("");
  let [id, setId] = useState("");
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem("userData"));
    let token = userData?.token;
    if (!token) {
      navigate("/login");
    } else {
      setUsername(userData.name);
      setId(userData.id);
    }
  }, [navigate]);

  const fetchNotes = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("userData"))?.token;
      const response = await axios.get('http://localhost:8080/notes', {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      setNotes(response.data.notes);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch notes. Please try again later.");
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div>
      <Navigation login='true' title='MyNotes for Revision' username={username} id={id} />
      <div className={styles.container}>
        <div className={styles.left}>
          <LeftNav
            notes={notes}
            loading={loading}
            error={error}
            onSelectNote={setSelectedNote}
            onCreateNote={fetchNotes}
          />
        </div>
        <div className={styles.right}>
          <RightNav note={selectedNote} />
        </div>
      </div>
    </div>
  )
}
