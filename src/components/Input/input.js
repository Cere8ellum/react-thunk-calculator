import React from "react";
import cn from "classnames";
import styles from "./input.scss";

export default function Input({ type, id, value, onChange, onBlur, disabled }) {
  return (
    <input
      type={type}
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      className={disabled ? cn(styles.input, styles.disabled) : styles.input}
      disabled={disabled}
    />
  );
}
