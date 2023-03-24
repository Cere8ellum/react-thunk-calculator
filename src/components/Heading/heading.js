import React from "react";
import styles from "./heading.scss";

export default function Heading({ title }) {
  return <h1 className={styles.heading}>{title}</h1>;
}
