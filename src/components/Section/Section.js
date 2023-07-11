import React from "react";
import { Badge, Col, Row } from "react-bootstrap";

import styles from "./Section.module.css";
import { arrayOf, bool, number, object, shape, string } from "prop-types";
import { URLIcon } from "../URLIcon";

function resolveAbsoluteURL(source) {
  if (source.source === "docs") {
    return `https://docs.reactivesearch.io${source.url}`;
  }
  return source.url;
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
              {showIcon ? <URLIcon url={source.url} /> : null}
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
