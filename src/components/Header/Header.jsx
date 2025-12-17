import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider.jsx";
import styles from "./Header.module.css";

export default function Header() {
  const navigate = useNavigate();
  const { accessToken, logout } = useContext(AuthContext);

  function onLogout() {
    logout();
    navigate("/");
  }

  let isLoggedIn = false;
  if (accessToken) {
    isLoggedIn = true;
  }

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.logo}>Пътеводителят на Верчето</div>

        <ul>
          <li><Link to="/">Начало</Link></li>
          <li><Link to="/destinations">Дестинации</Link></li>

          {isLoggedIn ? (
            <>
              <li><Link to="/forum">Форум</Link></li>
              <li>
                <button onClick={onLogout} className={styles.linkButton}>
                  Изход
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/register">Регистрация</Link></li>
              <li><Link to="/login">Вход</Link></li>
            </>
          )}
        </ul>
      </nav>

      <div className={styles.hero}>
        <h1>Открий красотата на родината</h1>
        <p>Вдъхновявай се. Пътувай. Обичай България.</p>
      </div>
    </header>
  );
}

