import React from "react";

import styles from "./DocumentSuggestion.module.css";
import { URLIcon } from "./URLIcon";
import { getBreadcrumbText } from "../getBreadcrumbText";
import { object } from "prop-types";

import "./DocumentSuggestion.css";
import { useBreakpoint } from "../useBreakpoint";

export const DocumentSuggestion = ({ source }) => {
  const breadcrumbText = getBreadcrumbText(source.url);
  const breakpointPoint = useBreakpoint();
  const isMobileWidth = breakpointPoint === "xs" || breakpointPoint === "sm";
  return (
    <div className={`suggestion ${styles.suggestion}`}>
      <div className="row">
        <div className="d-flex justify-content-center align-items-center">
          <div
            className={`p-2 me-3 rounded bg-white suggestionIcon ${styles.suggestionIcon}`}
          >
            <URLIcon
              url={source.url}
              style={{ marginBottom: 0 }}
              size={isMobileWidth ? 25 : 30}
            />
          </div>
          <div className="flex-1 w-75">
            <div title={source.value} className={styles.suggestionTitle}>
              {source.title || source.meta_title}
            </div>
            {breadcrumbText && isMobileWidth ? null : (
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
              title={source.meta_description}
              className={styles.suggestionDescription}
            >
              {source.meta_description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

DocumentSuggestion.propTypes = {
  source: object,
};
