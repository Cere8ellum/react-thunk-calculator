import React from "react";
import styles from "./inputWrapper.scss";

export default function InputWrapper({ icon, children }) {
  const [label, ...rest] = children;

  return (
    <div className={styles.wrapper}>
      {label}
      <div className={styles.groupWrapper}>
        <div className={styles.inputsWrapper}>{rest}</div>
        <span className={styles.icon}>{icon}</span>
      </div>
    </div>
  );
}
