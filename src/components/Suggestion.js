import React from "react";

import { object } from "prop-types";

import { BsClockHistory } from "react-icons/bs";

export const Suggestion = ({ suggestion }) => {
  let type = suggestion._suggestion_type || "normal";
  let Icon;
  if (type === "recent") {
    Icon = BsClockHistory;
  }
  return (
    <div>
      {Icon ? <Icon className="me-1" /> : null}
      <span>{suggestion.label}</span>
    </div>
  );
};

Suggestion.propTypes = {
  suggestion: object,
};
