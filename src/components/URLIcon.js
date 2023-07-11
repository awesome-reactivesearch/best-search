import React from "react";
import {
  BsLightningChargeFill,
  BsPieChartFill,
  BsReverseListColumnsReverse,
  BsRocketTakeoffFill,
  BsSearch,
  BsShieldFillCheck,
} from "react-icons/bs";

import styles from "./URLIcon.module.css";
import { number, object, string } from "prop-types";

export function URLIcon({ url, style = {}, size = 50 }) {
  if (url) {
    if (url.match("/docs/reactivesearch/react")) {
      return (
        <img
          src={
            "https://www.svgrepo.com/show/493719/react-javascript-js-framework-facebook.svg"
          }
          className={styles.sectionItemIcon}
          style={style}
        />
      );
    }
    if (url.match("/docs/reactivesearch/vue")) {
      return (
        <img
          src={
            "https://www.svgrepo.com/show/493625/vue-vuejs-javascript-js-framework.svg"
          }
          className={styles.sectionItemIcon}
          style={style}
        />
      );
    }
    if (url.match("/docs/reactivesearch/flutter")) {
      return (
        <img
          src={"https://www.svgrepo.com/show/373604/flutter.svg"}
          className={styles.sectionItemIcon}
          style={style}
        />
      );
    }
    if (url.match("/docs/speed")) {
      return (
        <BsLightningChargeFill
          size={size}
          style={{
            color: "#faff00",
            background: "lightslategray",
            padding: "5px",
            borderRadius: "5px",
            ...style,
          }}
          className={styles.sectionItemIcon}
        />
      );
    }
    if (url.match("/docs/hosting")) {
      return (
        <BsRocketTakeoffFill
          color="blue"
          size={size}
          className={styles.sectionItemIcon}
          style={style}
        />
      );
    }
    if (url.match("/docs/security")) {
      return (
        <BsShieldFillCheck
          color="green"
          size={size}
          className={styles.sectionItemIcon}
          style={style}
        />
      );
    }

    if (url.match("/docs/search/")) {
      return (
        <BsSearch
          color="var(--bs-primary)"
          size={size}
          className={styles.sectionItemIcon}
          style={style}
        />
      );
    }

    if (url.match("/docs/analytics/")) {
      return (
        <BsPieChartFill
          color="var(--bs-red)"
          size={size}
          className={styles.sectionItemIcon}
          style={style}
        />
      );
    }
  }
  return (
    <BsReverseListColumnsReverse
      size={size}
      className={styles.sectionItemIcon}
      style={style}
    />
  );
}

URLIcon.propTypes = {
  url: string,
  style: object,
  size: number,
};
