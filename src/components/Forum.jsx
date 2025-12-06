import React, { useState } from "react";
import styles from "./Forum.module.css";

export default function Forum() {
  const [comments, setComments] = useState([
    { name: "Анна", text: "Много обичам Родопите! Хората са топли, храната е уникална, а природата си е магия." },
    { name: "Иван", text: "Несебър е моето място – морето, историята и малките улички ме карат да се връщам отново и отново." },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const text = formData.get("comment");

    if (name && text) {
      setComments([{ name, text }, ...comments]);
      e.target.reset();
    }
  };

  return (
    <main className={styles.forumSection}>
      <section className={styles.topic}>
        <h2>Сподели любимото си място!</h2>
        <p>Кое българско кътче те е впечатлило най-много и защо?</p>

        <form className={styles.forumForm} onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Вашето име" required />
          <textarea name="comment" rows="4" placeholder="Вашето мнение" required></textarea>
          <button type="submit" className={styles.submitBtn}>Сподели</button>
        </form>
      </section>

      <section className={styles.comments}>
        <h3>Коментари от други пътешественици:</h3>
        {comments.map((c, i) => (
          <div key={i} className={styles.commentCard}>
            <h4>{c.name}</h4>
            <p>{c.text}</p>
          </div>
        ))}
      </section>
    </main>
  );
}