import React from 'react';
import { useState } from 'react';
import styles from './Form.module.css';

export default function Register() {
    const [error, setError] = useState('');


    async function regiterHandler(formData) {
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

        console.log("Register data:", { name, email, password, rePassword });
    }

    return (
        <main>
            <div className={styles.formContainer}>
                <h1>Регистрация</h1>
                <form className={styles.form} action={regiterHandler}>
                    <label htmlFor="name">Име</label>
                    <input type="text" id="name" name="name" />

                    <label htmlFor="email">Имейл</label>
                    <input type="email" id="email" name="email" />

                    <label htmlFor="password">Парола</label>
                    <input type="password" id="password" name="password" />

                    <label htmlFor="re-password">Повторете парола</label>
                    <input
                        type="password"
                        id="re-password"
                        name="rePassword"
                    />

                    <button type="submit" className={styles.formBtn}>
                        Регистрирай се
                    </button>
                    {error && <p className={styles.error}>{error}</p>}
                </form>
            </div>
        </main>
    );
}