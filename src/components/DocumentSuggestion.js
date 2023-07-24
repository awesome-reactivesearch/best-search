import React from "react";

import styles from "./DocumentSuggestion.module.css";
import { URLIcon } from "./URLIcon";
import { getBreadcrumbText } from "../getBreadcrumbText";
import { object } from "prop-types";

import "./DocumentSuggestion.css";
import { useBreakpoint } from "../useBreakpoint";
import { isSameOrigin, resolveAbsoluteURL } from "../utils";

function sanitizeHTMLAndCombineStrings(inputStrings) {
  // Combine all input strings into a single string
  const combinedString = inputStrings.join(" ");
  // Remove HTML tags using a regular expression
  const withoutTags = combinedString.replace(/<[^>]+>/g, "");

  // Remove multiple consecutive spaces and newlines
  let finalString = withoutTags.replace(/\s{2,}/g, " ").trim();

  if (finalString && finalString.startsWith("#")) {
    finalString = finalString.split("&gt;").slice(1).join("&gt;");
  }
  return finalString;
}

export const DocumentSuggestion = ({ source }) => {
  const breadcrumbText = getBreadcrumbText(source.url);
  const breakpointPoint = useBreakpoint();
  const isMobileWidth = breakpointPoint === "xs" || breakpointPoint === "sm";
  return (
    <a
      href={resolveAbsoluteURL(source) || "#"}
      target={isSameOrigin(resolveAbsoluteURL(source)) ? "_self" : "_blank"}
      rel="noreferrer"
      className={`suggestion ${styles.suggestion}`}
    >
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
              {source.meta_description ? (
                source.meta_description
              ) : (
                <div
                  dangerouslySetInnerHTML={{
                    __html: sanitizeHTMLAndCombineStrings(source.tokens),
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

DocumentSuggestion.propTypes = {
  source: object,
};
