import React, { useState } from 'react';
import styles from './CreateNote.module.css';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;
import { useNavigate } from 'react-router-dom';

export default function CreateNote({ onNoteCreated }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!title || !content) {
      setError("Both title and content are required.");
      return;
    }
    setLoading(true);
    try {
      const token = JSON.parse(localStorage.getItem("userData"))?.token;
      const res = await axios.post(`${API_URL}/createNote`, { title, content }, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      if (res.data && res.data.success) {
        setSuccess("Note created successfully!");
        setTitle("");
        setContent("");
        if (onNoteCreated) onNoteCreated();
        setTimeout(() => {
          navigate('/');
        }, 700); // short delay to show success message
      } else {
        setError("Failed to create note.");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Create a Note</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <textarea
          className={styles.textarea}
          placeholder="Content"
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        <button className={styles.button} type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Note"}
        </button>
        {error && <div className={styles.error}>{error}</div>}
        {success && <div className={styles.success}>{success}</div>}
      </form>
    </div>
  );
}
