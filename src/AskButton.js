import React from "react";
import { BsRobot } from "react-icons/bs";

import styles from "./AskButton.module.css";

export const AskButton = (props) => {
  return (
    <button {...props} className={styles.btn}>
      <BsRobot size={25} />
      <div>Ask AI</div>
    </button>
  );
};
