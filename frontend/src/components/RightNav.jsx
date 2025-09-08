import React from 'react';
import styles from './RightNav.module.css';

export default function RightNav({ note }) {
  return (
    <div className={styles.container}>
      {note ? (
        <>
          <h2 className={styles.title}>{note.title}</h2>
          <div className={styles.content}>{note.content}</div>
        </>
      ) : (
        <div className={styles.placeholder}>Select a note to view details</div>
      )}
    </div>
  );
}
