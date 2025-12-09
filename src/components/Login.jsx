import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Form.module.css';

export default function Login() {
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const loginHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const email = formData.get("email");
        const password = formData.get("password");

        if (!email || !password) {
            setError("Моля, попълнете всички полета!");
            return;
        }

        if (password.length < 6) {
            setError("Паролата трябва да е поне 6 символа!");
            return;
        }

        try {
            const response = await fetch('http://localhost:3030/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                setError('Грешка при входа');
                return;
            }

            setError('');
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem("userName", data.name);
            navigate('/');
        } catch (err) {
            console.error(err);
            setError('Не може да се свърже със сървъра');
        }
    };

    return (
        <main className={styles.formContainer}>
            <h2 className={styles.formTitle}>Вход</h2>
            <form className={styles.form} onSubmit={loginHandler}>
                <input type="email" name="email" placeholder="Имейл" required />
                <input type="password" name="password" placeholder="Парола" required />
                <button type="submit" className={styles.formBtn}>Вход</button>
                {error && <p className={styles.error}>{error}</p>}
            </form>
        </main>
    );
}


