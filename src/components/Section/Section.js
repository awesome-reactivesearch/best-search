import React from "react";
import { Badge, Col, Row } from "react-bootstrap";
import {
  BsLightningChargeFill,
  BsPieChartFill,
  BsReverseListColumnsReverse,
  BsRocketTakeoffFill,
  BsSearch,
  BsShieldFillCheck,
} from "react-icons/bs";

import styles from "./Section.module.css";
import { arrayOf, bool, number, object, shape, string } from "prop-types";

function resolveAbsoluteURL(source) {
  if (source.source === "docs") {
    return `https://docs.reactivesearch.io${source.url}`;
  }
  return source.url;
}

function getIcon(url) {
  if (url.match("/docs/reactivesearch/react")) {
    return (
      <img
        src={
          "https://www.svgrepo.com/show/493719/react-javascript-js-framework-facebook.svg"
        }
        className={styles.sectionItemIcon}
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
      />
    );
  }
  if (url.match("/docs/reactivesearch/flutter")) {
    return (
      <img
        src={"https://www.svgrepo.com/show/373604/flutter.svg"}
        className={styles.sectionItemIcon}
      />
    );
  }
  if (url.match("/docs/speed")) {
    return (
      <BsLightningChargeFill
        size={50}
        style={{
          color: "#faff00",
          background: "lightslategray",
          padding: "5px",
          borderRadius: "5px",
        }}
        className={styles.sectionItemIcon}
      />
    );
  }
  if (url.match("/docs/hosting")) {
    return (
      <BsRocketTakeoffFill
        color="blue"
        size={50}
        className={styles.sectionItemIcon}
      />
    );
  }
  if (url.match("/docs/security")) {
    return (
      <BsShieldFillCheck
        color="green"
        size={50}
        className={styles.sectionItemIcon}
      />
    );
  }

  if (url.match("/docs/search/")) {
    return (
      <BsSearch
        color="var(--bs-primary)"
        size={50}
        className={styles.sectionItemIcon}
      />
    );
  }

  if (url.match("/docs/analytics/")) {
    return (
      <BsPieChartFill
        color="var(--bs-red)"
        size={50}
        className={styles.sectionItemIcon}
      />
    );
  }
  return (
    <BsReverseListColumnsReverse size={50} className={styles.sectionItemIcon} />
  );
}

export const Section = ({
  columns = 2,
  sectionItems,
  placeholderImage,
  showIcon,
  showBreadcrumb,
}) => {
  return (
    <Row md={columns} sm={1}>
      {sectionItems.map((sectionItem) => {
        const source = sectionItem._source || {};
        const imageURL = source.img;
        const keywords = source.keywords || [];
        const Icon = showIcon && getIcon(source.url);
        const absoluteURL = resolveAbsoluteURL(source);
        let breadcrumb = "";
        if (showBreadcrumb) {
          try {
            let breadcrumbURL = source.url || "";
            if (breadcrumbURL.includes("http")) {
              breadcrumbURL = new URL(breadcrumbURL).pathname;
            }
            const parts = breadcrumbURL.split("/");
            const capitalized = parts
              .map((v) => v.trim())
              .filter((v) => v)
              .map((str) => str.charAt(0).toUpperCase() + str.slice(1));
            const hashElementRemovedArr = capitalized.filter(
              (v) =>
                v[0] !== "#" &&
                !["docs", "reactivesearch", "advanced", "overview"].includes(
                  v.toLowerCase()
                )
            );
            breadcrumb = hashElementRemovedArr.join(" -> ");
          } catch {
            console.log("Failed to parse url");
          }
        }

        return (
          <Col className="mb-5 pe-5" key={sectionItem._id}>
            <a
              className={styles.containerLink}
              href={absoluteURL || "#"}
              rel="noreferrer"
              target="_blank"
            >
              {showIcon ? Icon : null}
              {imageURL || placeholderImage ? (
                <img
                  src={imageURL || placeholderImage}
                  className={styles.sectionItemImage}
                />
              ) : null}
              <h5>{source.title || source.heading || source.meta_title}</h5>
              <div className="text-primary">{breadcrumb}</div>
              <p className={styles.sectionItemDescription}>
                {source.meta_description || source.heading}
              </p>
              <div className="d-flex flex-wrap gap-2">
                {keywords
                  .filter((_, i) => i < 3)
                  .map((keyword) => (
                    <Badge
                      key={keyword}
                      pill
                      bg="light"
                      className="border border-2 border-dark px-2 py-1"
                    >
                      {keyword}
                    </Badge>
                  ))}
              </div>
            </a>
          </Col>
        );
      })}
    </Row>
  );
};

Section.propTypes = {
  columns: number,
  sectionItems: arrayOf(shape({ _id: string, _source: object })),
  showIcon: bool,
  showBreadcrumb: bool,
  placeholderImage: string,
};
