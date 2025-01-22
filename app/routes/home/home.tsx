import { animate, stagger } from "motion/react";
import { useEffect, useState } from "react";
import style from "./home.module.css";

export default function HomePage() {
  useEffect(() => {
    animate(
      `.${style.welcomeContent}`,
      { opacity: 1, y: 0 },
      { duration: 0.6, delay: 0.2 },
    );

    animate(
      `.${style.featureItem}`,
      { opacity: 1, x: 0 },
      {
        delay: stagger(0.1, { startDelay: 0.2 }),
        ease: "easeOut",
      },
    );
  }, []);

  const [actionHintShown, setActionHintShown] = useState(false);

  function toggleActionHint() {
    animate(
      `.${style.actionHint}, .${style.actionHintOverlay}`,
      {
        opacity: actionHintShown ? 0 : 1,
        visibility: actionHintShown ? "hidden" : "visible",
      },
      {
        ease: "easeOut",
      },
    );
    setActionHintShown(!actionHintShown);
  }

  return (
    <div className={style.home}>
      <div className={style.welcomeContent}>
        <h2>Select a contact or create a new one</h2>
        <p>Some things you can do with this address book:</p>

        <ul>
          <li className={style.featureItem}>
            <span className={style.featureItemIcon}>✨</span> Create new
            contacts with their details
          </li>
          <li className={style.featureItem}>
            <span className={style.featureItemIcon}>🔄</span> Edit existing
            contact information
          </li>
          <li className={style.featureItem}>
            <span className={style.featureItemIcon}>🔍</span> Search through
            your contacts
          </li>
          <li className={style.featureItem}>
            <span className={style.featureItemIcon}>⭐</span> Mark favorites for
            quick access
          </li>
        </ul>
        <button
          type="button"
          className={style.actionHintTrigger}
          onClick={toggleActionHint}
        >
          First time here?
        </button>
      </div>
      <div className={style.actionHintOverlay} />
      <div className={style.actionHint}>
        <span className={style.actionHintIcon}>👈</span>
        <span className={style.actionHintText}>
          <strong>Select a contact</strong> from the sidebar to view their
          details
        </span>
        <button type="button" className={style.actionHintHide} onClick={toggleActionHint}>
          Hide
        </button>
      </div>
    </div>
  );
}
