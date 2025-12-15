import React from "react";
import { Link } from "react-router-dom";
import styles from "./Card.module.css";

export default function Card({ id, title, img, description }) {
  return (
    <div className={styles.card}>
      <img className={styles.cardImg} src={img} alt={title} />

      <div className={styles.cardContent}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      <Link to={`/destinations/${id}`} className={styles.btn}>
        Научи повече
      </Link>
    </div>
  );
}
