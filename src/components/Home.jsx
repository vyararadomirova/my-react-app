import React from 'react';
import Card from './Card';
import styles from "./Home.module.css";

const topDestinations = [
  {
    title: 'Седемте Рилски езера',
    img: 'https://floratours.eu/img/PROGRAMI/BIG_210220023045_1711974991405.jpg',
    description: 'Седем огледала на природата, където всяка разходка е малко приключение.'
  },
  {
    title: 'Язовир Въча',
    img: 'https://freshholiday.bg/img/NOVINI/BIG_DSC_0680-800x500_1713162049243.jpg.webp',
    description: 'Мястото, където планината шепне, водата блести и денят ти започва с усмивка.'
  },
  {
    title: 'Мелник',
    img: 'https://www.fixstay.com/img/c/large/185_3085.jpg?v=1748190616',
    description: 'Градчето, където вината са сладки, а гледките – още по-неустоими!'
  }
];

export default function Home() {
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
        <h2>Моите топ 3 дестинации</h2>
        <div className={styles.cards}>
          {topDestinations.map(d => (
            <Card
              key={d.title}
              title={d.title}
              img={d.img}
              description={d.description}
            />
          ))}
        </div>
      </section>
    </main>
  );
};
