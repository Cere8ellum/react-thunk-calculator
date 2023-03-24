import React from "react";
import styles from "./infoField.scss";

export default function InfoField({ title, value, css }) {
  return (
    <div className={styles.wrapper}>
      <span className={css}>{title}</span>
      <span className={styles.value}>{value} ₽</span>
    </div>
  );
}
