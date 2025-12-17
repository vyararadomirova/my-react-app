import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Form.module.css";
import { AuthContext } from "../AuthProvider.jsx";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const nameChangeHandler = (e) => {
        setName(e.target.value);
    };

    const emailChangeHandler = (e) => {
        setEmail(e.target.value);
    };

    const passwordChangeHandler = (e) => {
        setPassword(e.target.value);
    };

    const rePasswordChangeHandler = (e) => {
        setRePassword(e.target.value);
    };

    const registerHandler = async (e) => {
        e.preventDefault();

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
            const res = await fetch("http://localhost:3030/users/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password, rePassword })
            });

            const data = await res.json();

            if (!res.ok) {
                setError("Грешка при регистрацията!");
                return;
            }

            setError("");
            login(data.email, data.accessToken);
            navigate("/");
        } catch (err) {
            console.error(err);
            setError("Грешка при връзката със сървъра!");
        }
    };

    return (
        <main className={styles.formContainer}>
            <h2 className={styles.formTitle}>Регистрация</h2>

            <form className={styles.form} onSubmit={registerHandler}>
                <input
                    type="text"
                    name="name"
                    placeholder="Име"
                    value={name}
                    onChange={nameChangeHandler}
                />

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

                <input
                    type="password"
                    name="rePassword"
                    placeholder="Повторете парола"
                    value={rePassword}
                    onChange={rePasswordChangeHandler}
                />

                <button type="submit" className={styles.formBtn}>
                    Регистрирай се
                </button>

                {error && <p className={styles.error}>{error}</p>}
            </form>
        </main>
    );
}


