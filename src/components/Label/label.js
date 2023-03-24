import React from "react";
import styles from "./label.scss";

export default function Label({ title, inputId, css }) {
  return (
    <label htmlFor={inputId} className={css}>
      {title}
    </label>
  );
}
