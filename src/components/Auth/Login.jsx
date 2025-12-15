import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Form.module.css";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const emailChangeHandler = (e) => {
        setEmail(e.target.value);
    };

    const passwordChangeHandler = (e) => {
        setPassword(e.target.value);
    };

    const loginHandler = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Моля, попълнете всички полета!");
            return;
        }

        if (password.length < 6) {
            setError("Паролата трябва да е поне 6 символа!");
            return;
        }

        try {
            const res = await fetch("http://localhost:3030/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (!res.ok) {
                setError("Грешка при входа");
                return;
            }

            setError("");
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("email", data.email);
            navigate("/");
        } catch (err) {
            console.error(err);
            setError("Не може да се свърже със сървъра");
        }
    };

    return (
        <main className={styles.formContainer}>
            <h2 className={styles.formTitle}>Вход</h2>

            <form className={styles.form} onSubmit={loginHandler}>
                <input
                    type="email"
                    name="email"
                    placeholder="Имейл"
                    value={email}
                    onChange={emailChangeHandler}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Парола"
                    value={password}
                    onChange={passwordChangeHandler}
                />

                <button type="submit" className={styles.formBtn}>
                    Вход
                </button>

                {error && <p className={styles.error}>{error}</p>}
            </form>
        </main>
    );
}



