import React from "react";
import styles from "./inputRange.scss";

export default function InputRange({
  id,
  value,
  onChange,
  disabled,
  min,
  max,
  step,
}) {
  return (
    <input
      type="range"
      id={`${id}-range`}
      name={`${id}-range`}
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={onChange}
      className={styles.range}
      disabled={disabled}
    />
  );
}
