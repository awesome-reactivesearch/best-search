import React, { useState } from "react";
import { AIAnswer } from "@appbaseio/reactivesearch";
import { SEARCH_COMPONENT_ID } from "../constants";
import { BsArrowLeft, BsRobot } from "react-icons/bs";
import { Button } from "react-bootstrap";

import styles from "./Drawer.module.css";

export const Drawer = () => {
  const [show, setShow] = useState(false);

  const handleShow = () => {
    const bodyEl = document.querySelector("body");
    bodyEl.style.overflowY = "hidden";
    setShow(true);
  };
  const handleHide = () => {
    const bodyEl = document.querySelector("body");
    bodyEl.style.overflowY = "scroll";
    setShow(false);
  };

  return (
    <>
      <div
        style={{ visibility: show ? "visible" : "hidden" }}
        className={`${styles.drawer} aiAnswerContainer`}
      >
        <Button variant="secondary" className="my-2" onClick={handleHide}>
          <BsArrowLeft /> Back
        </Button>
        <AIAnswer
          react={{ and: [SEARCH_COMPONENT_ID] }}
          componentId="ai-answer"
          title={
            <div>
              <img
                src="https://www.npmjs.com/npm-avatar/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdmF0YXJVUkwiOiJodHRwczovL3MuZ3JhdmF0YXIuY29tL2F2YXRhci83OGIxYzc0ODk2YTAzNDc0NDdkYTdhYTAzMGE2NzY3ND9zaXplPTEwMCZkZWZhdWx0PXJldHJvIn0.0D3SFc6eHLrIC_Mf0L2SxcdoLGf-DamDP0MoZcrx8IU"
                alt="reactivesearch-icon"
                className="aiLogo"
              ></img>
              <span className="aiLogoText">Reactivesearch AI</span>
            </div>
          }
        />
      </div>

      <Button
        variant="primary"
        onClick={handleShow}
        className="me-2 floatingBtn"
      >
        <BsRobot />
      </Button>
    </>
  );
};
