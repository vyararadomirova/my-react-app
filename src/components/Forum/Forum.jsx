import React, { useState, useEffect } from "react";
import styles from "./Forum.module.css";

export default function Forum() {
  const [comments, setComments] = useState([]);
  const [currentUserEmail, setCurrentUserEmail] = useState("");
  const [commentText, setCommentText] = useState("");
  const [error, setError] = useState("");
  const [editingCommentId, setEditingCommentId] = useState("");
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("email");
    if (savedUser) {
      setCurrentUserEmail(savedUser);
    }

    const savedComments = localStorage.getItem("comments");
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    }
  }, []);

  const commentChangeHandler = (e) => setCommentText(e.target.value);

  const addComment = (e) => {
    e.preventDefault();

    if (!commentText) {
      setError("Коментарът не може да е празен!");
      return;
    }

    const newComment = {
      id: Date.now().toString(),
      name: currentUserEmail,
      text: commentText,
      owner: currentUserEmail,
    };

    const updatedComments = [newComment, ...comments];
    setComments(updatedComments);
    localStorage.setItem("comments", JSON.stringify(updatedComments));

    setCommentText("");
    setError("");
  };

  const removeComment = (commentId) => {
    const updatedComments = comments.filter((c) => c.id !== commentId);
    setComments(updatedComments);
    localStorage.setItem("comments", JSON.stringify(updatedComments));
  };

  const startEdit = (comment) => {
    setEditingCommentId(comment.id);
    setEditingText(comment.text);
  };

  const editChangeHandler = (e) => setEditingText(e.target.value);

  const saveEdit = () => {
    if (!editingText) {
      return;
    }

    const updatedComments = comments.map((c) => {
      if (c.id === editingCommentId) {
        c.text = editingText;
      }
      return c;
    });

    setComments(updatedComments);
    localStorage.setItem("comments", JSON.stringify(updatedComments));
    setEditingCommentId("");
    setEditingText("");
  };

  return (
    <main className={styles.forumSection}>
      <section className={styles.topic}>
        <h2>Сподели любимото си място!</h2>
        <p>Кое българско кътче те е впечатлило най-много и защо?</p>

        <form className={styles.forumForm} onSubmit={addComment}>
          <textarea
            name="comment"
            placeholder="Вашето мнение"
            value={commentText}
            onChange={commentChangeHandler}
          />
          <button type="submit" className={styles.submitBtn}>
            Сподели
          </button>
          {error && <p className={styles.error}>{error}</p>}
        </form>
      </section>

      <section className={styles.comments}>
        {comments.length > 0 ? (
          <>
            <h3>Коментари от други пътешественици:</h3>
            {comments.map((comment) => (
              <div key={comment.id} className={styles.commentCard}>
                <div className={styles.textSection}>
                  <h4>{comment.name}</h4>
                  {editingCommentId === comment.id ? (
                    <textarea
                      value={editingText}
                      onChange={editChangeHandler}
                    />
                  ) : (
                    <p>{comment.text}</p>
                  )}
                </div>

                {comment.owner === currentUserEmail && (
                  <div className={styles.buttonSection}>
                    {editingCommentId === comment.id ? (
                      <button onClick={saveEdit}>Запази</button>
                    ) : (
                      <button onClick={() => startEdit(comment)}>Редактирай</button>
                    )}
                    <button onClick={() => removeComment(comment.id)}>Изтрий</button>
                  </div>
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

