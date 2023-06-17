import React from "react";
import { Badge, Col, Row } from "react-bootstrap";
import {
  BsLightningChargeFill,
  BsReverseListColumnsReverse,
  BsRocketTakeoffFill,
  BsShieldFillCheck,
} from "react-icons/bs";

import reactIcon from "./assets/react.svg";
import vueIcon from "./assets/vue.svg";
import flutterIcon from "./assets/flutter.svg";

import styles from "./Section.module.css";
import { arrayOf, bool, number, object, shape, string } from "prop-types";

function getIcon(url) {
  if (url.match("/docs/reactivesearch/react")) {
    return <img src={reactIcon} className={styles.sectionItemIcon} />;
  }
  if (url.match("/docs/reactivesearch/vue")) {
    return <img src={vueIcon} className={styles.sectionItemIcon} />;
  }
  if (url.match("/docs/reactivesearch/flutter")) {
    return <img src={flutterIcon} className={styles.sectionItemIcon} />;
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
  return (
    <BsReverseListColumnsReverse size={50} className={styles.sectionItemIcon} />
  );
}

export const Section = ({
  columns = 2,
  sectionItems,
  placeholderImage,
  showIcon,
}) => {
  return (
    <Row md={columns} sm={1}>
      {sectionItems.map((sectionItem) => {
        const source = sectionItem._source || {};
        const imageURL = source.img;
        const keywords = source.keywords || [];
        const Icon = showIcon && getIcon(source.url);

        return (
          <Col className="mb-3" key={sectionItem._id}>
            <div>
              {showIcon ? Icon : null}
              {imageURL || placeholderImage ? (
                <img
                  src={imageURL || placeholderImage}
                  className={styles.sectionItemImage}
                />
              ) : null}
              <h5>{source.title || source.heading || source.meta_title}</h5>
              <div className="text-primary">{`Dashboard > UI Builder`}</div>
              <p className={styles.sectionItemDescription}>
                {source.meta_description || source.heading}
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
  showIcon: bool,
  placeholderImage: string,
};
