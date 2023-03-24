import React from "react";
import styles from "./button.scss";

export default function Button({ title, disabled }) {
  return (
    <div className={styles.wrapper}>
      <button type="submit" className={styles.button} disabled={disabled}>
        {title}
      </button>
    </div>
  );
}
