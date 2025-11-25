import React from 'react';
import styles from './Card.module.css';

export default function Card({ title, img, description }) {
  return (
    <div className={styles.card}>
      <img className={styles.cardImg} src={img} alt={title} />
      <div className={styles.cardContent}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <button className={styles.btn}>Научи повече</button>
    </div>
  );
}