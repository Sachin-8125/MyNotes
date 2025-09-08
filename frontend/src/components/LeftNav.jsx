import React from 'react';
import styles from './LeftNav.module.css';
import { useNavigate } from 'react-router-dom';
import CustomButton from './CustomButton';

export default function LeftNav({ notes, loading, error, onSelectNote }) {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      {error && <p className={styles.error}>{error}</p>}
      {loading && <p>Loading notes...</p>}
      <h1>My Notes</h1>
      {notes.length === 0 && !loading && !error && (
        <p>No notes available. Please add some notes.</p>
      )}
      {notes.map((note) => (
        <div
          key={note._id}
          className={styles.noteItem}
          onClick={() => onSelectNote(note)}
          style={{ cursor: 'pointer' }}
        >
          <h3>{note.title}</h3>
        </div>
      ))}
      <CustomButton btnText="Create Note" handler={() => navigate('/createNote')} />
    </div>
  );
}
