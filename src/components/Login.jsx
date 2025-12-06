import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Form.module.css';

export default function Login() {
    const [error, setError] = useState('');
    const navigate = useNavigate();

    async function loginHandler(formData) {
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
            navigate('/');

        } catch (err) {
            console.error(err);
            setError('Не може да се свърже със сървъра');
        }
    }

    return (
        <main>
            <div className={styles.formContainer}>
                <h2>Вход</h2>
                <form className={styles.form} action={loginHandler}>
                    <label htmlFor="email">Имейл</label>
                    <input type="email" id="email" name="email" />

                    <label htmlFor="password">Парола</label>
                    <input type="password" id="password" name="password" />

                    <button type="submit" className={styles.formBtn}>
                        Вход
                    </button>
                    {error && <p className={styles.error}>{error}</p>}
                </form>
            </div>
        </main>
    );
}
