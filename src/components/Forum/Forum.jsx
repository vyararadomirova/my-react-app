import React, { useState, useEffect, useContext } from "react";
import styles from "./Forum.module.css";
import { AuthContext } from "../AuthProvider.jsx";

export default function Forum() {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [error, setError] = useState("");
  const [editingCommentId, setEditingCommentId] = useState("");
  const [editingText, setEditingText] = useState("");

  const { currentUserEmail, accessToken } = useContext(AuthContext);

  // GET comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch("http://localhost:3030/data/comments");

        if (!res.ok) {
          throw new Error("Грешка при зареждане на коментарите");
        }

        const data = await res.json();

        // филтрираме празните коментари
        const validComments = Object.values(data).filter(c => c.text);

        setComments(validComments);
      } catch (err) {
        console.error(err);
      }
    };

    fetchComments();
  }, []);


  const commentChangeHandler = (e) => {
    setCommentText(e.target.value);
  };

  // POST comment
  const addComment = async (e) => {
    e.preventDefault();

    if (!commentText) {
      setError("Коментарът не може да е празен!");
      return;
    }

    const newComment = {
      name: currentUserEmail,
      text: commentText,
      owner: currentUserEmail,
    };

    try {
      const res = await fetch("http://localhost:3030/data/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Authorization": accessToken,
        },
        body: JSON.stringify(newComment),
      });

      if (!res.ok) {
        throw new Error("Грешка при добавяне на коментар");
      }

      const createdComment = await res.json();

      setComments((state) => [createdComment, ...state]);
      setCommentText("");
      setError("");
    } catch (err) {
      console.error(err);
    }
  };

  // DELETE comment
  const removeComment = async (commentId) => {
    try {
      await fetch(`http://localhost:3030/data/comments/${commentId}`, {
        method: "DELETE",
        headers: {
          "X-Authorization": accessToken,
        },
      });

      setComments((state) =>
        state.filter((c) => c._id !== commentId)
      );
    } catch (err) {
      console.error(err);
    }
  };

  const startEdit = (comment) => {
    setEditingCommentId(comment._id);
    setEditingText(comment.text);
  };

  const editChangeHandler = (e) => {
    setEditingText(e.target.value);
  };

 // PUT comment
const saveEdit = async () => {
  if (!editingText) {
    return;
  }

  try {
    const res = await fetch(
      `http://localhost:3030/data/comments/${editingCommentId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Authorization": accessToken,
        },
        body: JSON.stringify({
          text: editingText,
        }),
      }
    );

    if (!res.ok) {
      throw new Error("Грешка при редакция");
    }

    // създаваме нов state, запазваме всички полета на коментара
    const updatedComments = comments.map((c) => {
      if (c._id === editingCommentId) {
        return { ...c, text: editingText };
      }
      return c;
    });

    setComments(updatedComments); 
    setEditingCommentId("");
    setEditingText("");
  } catch (err) {
    console.error(err);
  }
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
              <div key={comment._id} className={styles.commentCard}>
                <div className={styles.textSection}>
                  <h4>{comment.name}</h4>
                  {editingCommentId === comment._id ? (
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
                    {editingCommentId === comment._id ? (
                      <button onClick={saveEdit}>Запази</button>
                    ) : (
                      <button onClick={() => startEdit(comment)}>
                        Редактирай
                      </button>
                    )}
                    <button onClick={() => removeComment(comment._id)}>
                      Изтрий
                    </button>
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

