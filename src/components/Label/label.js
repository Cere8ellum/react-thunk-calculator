import React from "react";

export default function Label({ title, inputId, css }) {
  return (
    <label htmlFor={inputId} className={css}>
      {title}
    </label>
  );
}
