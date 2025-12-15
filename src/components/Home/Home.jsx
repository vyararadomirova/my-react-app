import React, { useEffect, useState } from "react";
import Card from "../Card/Card.jsx";
import styles from "./Home.module.css";

export default function Home() {
  const [destinations, setDestinations] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchDestinations() {

      try {
        const res = await fetch("http://localhost:3030/jsonstore/destinations");

        if (!res.ok) {
          throw new Error("Неуспешно зареждане на дестинациите");
        }
        const data = await res.json();
        const dataArr = Object.values(data);
        const topDestinations = dataArr.filter(d => d.isTop);
        setDestinations(topDestinations);

      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    }

    fetchDestinations();
  }, []);

  return (
    <main>
      <section className={styles.intro}>
        <h2>Добре дошли в моя пътеводител!</h2>
        <p>
          Тук ще откриете най-красивите кътчета на България – от величествените планини до спокойните морски курорти, от древните градове до уютните селца с автентична атмосфера.
        </p>
        <img src="https://cdn.pixabay.com/photo/2019/03/28/14/46/lavender-4087305_1280.jpg" alt="Лавандула" />
      </section>

      <section className={styles.topics}>
        <h2>Моите топ дестинации</h2>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.cards}>
          {destinations.map(d => (
            <Card
              key={d.id}
              id={d.id}
              title={d.name}
              img={d.image}
              description={d.description}
            />
          ))}
        </div>
      </section>
    </main>
  );
};
