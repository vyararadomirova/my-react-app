import React from 'react';
import { Link } from "react-router-dom";
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.logo}>Пътеводителят на Верчето</div>

        <ul>
          <li>
            <Link to="/">Начало</Link>
          </li>

          <li>
            <Link to="/destinations">Дестинации</Link>
          </li>

          <li>
            <Link to="/register">Регистрация</Link>
          </li>

          <li>
            <Link to="/login">Вход</Link>
          </li>
        </ul>
      </nav>

      <div className={styles.hero}>
        <h1>Открий красотата на родината</h1>
        <p>Вдъхновявай се. Пътувай. Обичай България.</p>
      </div>
    </header>
  );
}
