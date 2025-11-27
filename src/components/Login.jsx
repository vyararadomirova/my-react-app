import React from 'react';
import { useState } from 'react';
import styles from './Form.module.css';

export default function Login() {
    const [error, setError] = useState('');

    async function loginHandler(formData) {
        const name = formData.get("name");
        const email = formData.get("email");
        const password = formData.get("password");

         if (!name || !email || !password) {
            setError("Моля, попълнете всички полета!");
            return;
        }

        if (password.length < 6) {
           setError("Паролата трябва да е поне 6 символа!");
            return;
        }

        console.log("Login data:", { name, email, password });
    }

    return (
        <main>
            <div className={styles.formContainer}>
                <h1>Вход</h1>

                <form className={styles.form} action={loginHandler}>
                    <label htmlFor="name">Име</label>
                    <input type="text" id="name" name="name" required />

                    <label htmlFor="email">Имейл</label>
                    <input type="email" id="email" name="email" required />

                    <label htmlFor="password">Парола</label>
                    <input type="password" id="password" name="password" required />

                    <button type="submit" className={styles.formBtn}>
                        Вход
                    </button>
                    {error && <p className={styles.error}>{error}</p>}
                </form>
            </div>
        </main>
    );
}
