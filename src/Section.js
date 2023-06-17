import React from "react";
import { Badge, Col, Row } from "react-bootstrap";

import styles from "./Section.module.css";
import { arrayOf, number, object, shape, string } from "prop-types";

export const Section = ({ columns = 2, sectionItems, placeholderImage }) => {
  return (
    <Row md={columns} sm={1}>
      {sectionItems.map((sectionItem) => {
        const source = sectionItem._source || {};
        const imageURL = source.img;
        const keywords = source.keywords || [];

        return (
          <Col className="mb-3" key={sectionItem._id}>
            <div>
              {(imageURL || placeholderImage) && (
                <img
                  src={imageURL || placeholderImage}
                  className={styles.sectionItemImage}
                />
              )}
              <h5>{source.title || source.heading || source.meta_title}</h5>
              <div className="text-primary">{`Dashboard > UI Builder`}</div>
              <p className={styles.sectionItemDescription}>
                {source.meta_description}
              </p>
              <div className="d-flex flex-wrap">
                {keywords
                  .filter((_, i) => i < 3)
                  .map((keyword) => (
                    <Badge
                      key={keyword}
                      pill
                      bg="light"
                      className="border border-2 border-dark px-2 py-1 me-1"
                    >
                      {keyword}
                    </Badge>
                  ))}
              </div>
            </div>
          </Col>
        );
      })}
    </Row>
  );
};

Section.propTypes = {
  columns: number,
  sectionItems: arrayOf(shape({ _id: string, _source: object })),
  placeholderImage: string,
};
