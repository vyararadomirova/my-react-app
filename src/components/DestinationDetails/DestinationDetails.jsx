import React, { useEffect, useState } from "react";
import styles from "./DestinationDetails.module.css";
import { useParams, Link } from "react-router-dom";

export default function DestinationDetails() {
  const { id } = useParams();
  const [destination, setDestination] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchDetails() {
      try {
        const res = await fetch(`http://localhost:3030/jsonstore/destinations/${id}`);

        if (!res.ok) {
          throw new Error("Грешка при зареждане на детайлите");
        }

        const data = await res.json();
        setDestination(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    }

    fetchDetails();
  }, [id]);

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }


  return (
    <main className={styles.details}>
      <div className={styles.wrapper}>

        <div className={styles.imageBox}>
          <img src={destination.image} alt={destination.name} />
        </div>

        <div className={styles.content}>
          <h2>{destination.name}</h2>

          <p className={styles.description}>
            {destination.description}
          </p>

          <div className={styles.infoBox}>
            <h3>Полезна информация</h3>
            <p>{destination.content}</p>
          </div>

          <Link to="/destinations" className={styles.backBtn}>
            Назад към всички дестинации
          </Link>
        </div>

      </div>
    </main>
  );
}
