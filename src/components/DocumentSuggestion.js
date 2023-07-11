import React from "react";

import styles from "./DocumentSuggestion.module.css";
import { URLIcon } from "./URLIcon";
import { getBreadcrumbText } from "../getBreadcrumbText";
import { object } from "prop-types";

import "./DocumentSuggestion.css";

export const DocumentSuggestion = ({ source }) => {
  const breadcrumbText = getBreadcrumbText(source.url);
  return (
    <div className={`suggestion ${styles.suggestion}`}>
      <div className="row">
        <div className="d-flex justify-content-center align-items-center col col-3 col-md-1">
          <div
            className={`p-3 rounded bg-white suggestionIcon ${styles.suggestionIcon}`}
          >
            <URLIcon url={source.url} style={{ margin: "auto" }} size={30} />
          </div>
        </div>
        <div className="col col-9 col-md-11">
          <div title={source.value} className={styles.suggestionTitle}>
            {source.value || source.title}
          </div>
          {breadcrumbText && (
            <div>
              <span
                title={breadcrumbText}
                className={styles.suggestionBreadcrumb}
              >
                {breadcrumbText}
              </span>
            </div>
          )}
          <div
            title={source.meta_description || source.heading}
            className={styles.suggestionDescription}
          >
            {source.meta_description || source.heading}
          </div>
        </div>
      </div>
    </div>
  );
};

DocumentSuggestion.propTypes = {
  source: object,
};
