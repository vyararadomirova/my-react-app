import React, { useState, useEffect } from "react";
import styles from "./Forum.module.css";

export default function Forum() {
  const [comments, setComments] = useState([]);
  const [currentUser, setCurrentUser] = useState("");


  useEffect(() => {
    const savedUser = localStorage.getItem("userName");
    if (savedUser) {
      setCurrentUser(savedUser);
    }

    const savedComments = localStorage.getItem("comments");
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    }
  }, []);

  const addComment = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const text = formData.get("comment");

    if (!text) return;

    const newComment = {
      id: Date.now().toString(),
      name: currentUser,
      text,
      owner: currentUser
    };

    const updatedComments = [newComment, ...comments];
    setComments(updatedComments);
    localStorage.setItem("comments", JSON.stringify(updatedComments));

    e.target.reset();
  };

  const removeComment = (commentId) => {
    const updatedComments = comments.filter(c => c.id !== commentId);
    setComments(updatedComments);
    localStorage.setItem("comments", JSON.stringify(updatedComments));
  };

  return (
    <main className={styles.forumSection}>
      <section className={styles.topic}>
        <h2>Сподели любимото си място!</h2>
        <p>Кое българско кътче те е впечатлило най-много и защо?</p>

        <form className={styles.forumForm} onSubmit={addComment}>
          <textarea name="comment" placeholder="Вашето мнение" required />
          <button type="submit" className={styles.submitBtn}>Сподели</button>
        </form>
      </section>

      <section className={styles.comments}>
        {comments.length > 0 ? (
          <>
            <h3>Коментари от други пътешественици:</h3>
            {comments.map(comment => (
              <div key={comment.id} className={styles.commentCard}>
                <div>
                  <h4>{comment.name}</h4>
                  <p>{comment.text}</p>
                </div>

                {comment.owner === currentUser && (
                  <button className={styles.deleteBtn} onClick={() => removeComment(comment.id)}>
                    Изтрий
                  </button>
                )}
              </div>
            ))}
          </>
        ) : (
          <h3>Все още няма коментари от други потребители! :)</h3>
        )}
      </section>
    </main>
  );
}




