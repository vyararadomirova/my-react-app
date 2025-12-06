import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Form.module.css';

export default function Register() {
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const registerHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const name = formData.get("name");
        const email = formData.get("email");
        const password = formData.get("password");
        const rePassword = formData.get("rePassword");

        if (!name || !email || !password || !rePassword) {
            setError("Моля, попълнете всички полета!");
            return;
        }

        if (password.length < 6) {
            setError("Паролата трябва да е поне 6 символа!");
            return;
        }

        if (password !== rePassword) {
            setError("Паролите не съвпадат!");
            return;
        }

        try {
            const res = await fetch('http://localhost:3030/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });

            const data = await res.json();

            if (!res.ok) {
                setError("Грешка при регистрацията!");
                return;
            }

            setError('');
            localStorage.setItem('accessToken', data.accessToken);
            navigate('/');
        } catch (err) {
            console.error(err);
            setError("Грешка при връзката със сървъра!");
        }
    };

    return (
        <main className={styles.formContainer}>
            <h2 className={styles.formTitle}>Регистрация</h2>
            <form className={styles.form} onSubmit={registerHandler}>
                <input type="text" name="name" placeholder="Име" required />
                <input type="email" name="email" placeholder="Имейл" required />
                <input type="password" name="password" placeholder="Парола" required />
                <input type="password" name="rePassword" placeholder="Повторете парола" required />
                <button type="submit" className={styles.formBtn}>Регистрирай се</button>
                {error && <p className={styles.error}>{error}</p>}
            </form>
        </main>
    );
}

