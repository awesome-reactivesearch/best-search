import React from "react";
import { Container } from "react-bootstrap";

import "./custom.scss";

import "./App.css";
import styles from "./App.module.css";

import "./utility.css";
import reactivesearchLogo from "./reactivesearch-logo.svg";

import { BreakpointProvider } from "./useBreakpoint";
import {
  ReactiveBase,
  SearchBox,
  TabDataList,
} from "@appbaseio/reactivesearch";

function Main() {
  return (
    <ReactiveBase
      app="unified-reactivesearch-web-data"
      url="https://a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61@appbase-demo-ansible-abxiydt-arc.searchbase.io"
      reactivesearchAPIConfig={{
        recordAnalytics: true,
        userId: "jon",
      }}
    >
      <Container>
        <img src={reactivesearchLogo} className={styles.logo} />
      </Container>
      <Container className="mt-2 h-100">
        <TabDataList
          componentId="ResourceFilter"
          dataField="source.keyword"
          className={styles.resourceFilter}
          selectAllLabel="All"
          data={[
            { label: "Website", value: "website" },
            { label: "Docs", value: "docs" },
            { label: "Blog", value: "blog" },
          ]}
        />
        <SearchBox
          dataField={["original_title", "original_title.search"]}
          componentId="SearchFilter"
          className={styles.searchBox}
          highlight
          URLParams
          size={5}
          index="good-books-ds"
          showClear
          onValueSelected={(value, cause) => {
            // eslint-disable-next-line
            console.log(value, cause);
          }}
          renderNoSuggestion="No suggestions found."
        />
      </Container>
    </ReactiveBase>
  );
}

const App = () => (
  <BreakpointProvider>
    <Main />
  </BreakpointProvider>
);

export default App;
