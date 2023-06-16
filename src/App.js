import React from "react";
import { Container } from "react-bootstrap";

import "./custom.scss";

import "./App.css";
import "./utility.css";

import { BreakpointProvider } from "./useBreakpoint";

function Main() {
  return (
    <div>
      <Container className="mt-2 h-100"></Container>
    </div>
  );
}

const App = () => (
  <BreakpointProvider>
    <Main />
  </BreakpointProvider>
);

export default App;
