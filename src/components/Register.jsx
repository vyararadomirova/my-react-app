import React from 'react';
import styles from './Form.module.css';

export default function Register() {

    async function regiterHandler(formData) {
        const name = formData.get("name");
        const email = formData.get("email");
        const password = formData.get("password");
        const rePassword = formData.get("rePassword");

        console.log("Register data:", { name, email, password, rePassword });
    }

    return (
        <main>
            <div className={styles.formContainer}>
                <h1>Регистрация</h1>
                <form className={styles.form} action={regiterHandler}>
                    <label htmlFor="name">Име</label>
                    <input type="text" id="name" name="name" required />

                    <label htmlFor="email">Имейл</label>
                    <input type="email" id="email" name="email" required />

                    <label htmlFor="password">Парола</label>
                    <input type="password" id="password" name="password" required />

                    <label htmlFor="re-password">Повторете парола</label>
                    <input
                        type="password"
                        id="re-password"
                        name="rePassword"
                        required
                    />

                    <button type="submit" className={styles.formBtn}>
                        Регистрирай се
                    </button>
                </form>
            </div>
        </main>
    );
}