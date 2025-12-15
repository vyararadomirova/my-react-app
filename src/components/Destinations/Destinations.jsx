import React, { useEffect, useState } from "react";
import styles from "./Destinations.module.css";
import Card from "../Card/Card.jsx";

export default function Destinations() {
  const [destinations, setDestinations] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchDestinations() {
      try {
        const res = await fetch("http://localhost:3030/jsonstore/destinations");
        if (!res.ok) {
          throw new Error("Неуспешно зареждане на дестинациите");
        }

        const data = await res.json();
        const dataArr = Object.values(data);
        setDestinations(dataArr);

      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    }

    fetchDestinations();
  }, []);

  return (
    <main className={styles.destTopics}>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.destCards}>
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
    </main>
  );
}
