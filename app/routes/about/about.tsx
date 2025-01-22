import { useEffect } from "react";
import { animate, stagger } from "motion/react";
import { ABOUT_CONTENT } from "~/content/about-content";
import style from "./about.module.css";
import { BackButton } from "~/components/back-button/back-button";

const { title, overview, goals, keyAreas } = ABOUT_CONTENT;

export default function AboutPage() {
  useEffect(() => {
    animate(
      `.${style.projectInfo}`,
      { opacity: 1, y: 0 },
      { duration: 0.6, delay: 0.2, ease: "easeOut" },
    );

    animate(
      `.${style.section}`,
      { opacity: 1, y: 0 },
      {
        duration: 0.6,
        delay: stagger(0.2, { startDelay: 0.4 }),
        ease: "easeOut",
      },
    );

    animate(
      `.${style.areaItems}, .${style.goalsList}`,
      { opacity: 1, x: 0 },
      {
        delay: stagger(0.05, { startDelay: 0.6 }),
        ease: "easeOut",
      },
    );
  }, []);

  return (
    <div className={style.projectInfo}>
      <BackButton />
      <div className={style.card}>
        <h1 className={style.title}>{title}</h1>

        <section className={style.section}>
          <h2 className={style.sectionTitle}>Overview</h2>
          <p className={style.overview}>{overview}</p>
        </section>

        <section className={style.section}>
          <h2 className={style.sectionTitle}>Project Goals</h2>
          <ul className={style.goalsList}>
            {goals.map((goal) => (
              <li key={goal}>{goal}</li>
            ))}
          </ul>
        </section>

        <section className={style.section}>
          <h2 className={style.sectionTitle}>Key Learning Areas</h2>
          <div className={style.areaCard}>
            {keyAreas.map((area) => (
              <div key={area.title} className="area-card">
                <h3 className={style.areaTitle}>{area.title}</h3>
                <ul className={style.areaItems}>
                  {area.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
