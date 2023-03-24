import React from "react";
import styles from "./alert.scss";
import animateStyles from "animate.css";

export default function Alert({ title, style, handleClose }) {
  return (
    <div
      className={[
        styles.wrapper,
        styles[style],
        animateStyles.animate__animated,
        animateStyles.animate__fadeInDown,
      ].join(" ")}
    >
      <div className={styles.text}>{title}</div>
      <div className={styles.closeBtn} onClick={handleClose}>
        +
      </div>
    </div>
  );
}
