import React, { useState } from "react";
import { Container } from "react-bootstrap";

import "./custom.scss";

import "./App.css";
import styles from "./App.module.css";

import "./utility.css";

import { BreakpointProvider } from "./useBreakpoint";
import {
  AIAnswer,
  ReactiveBase,
  SearchBox,
  TabDataList,
} from "@appbaseio/reactivesearch";
import { ALL_LABEL, SEARCH_COMPONENT_ID, TABS_COMPONENT_ID } from "./constants";
import { AllResults } from "./components/AllResults";
import { SectionResult } from "./components/SectionResult";
import { transformRequest } from "./transformRequest";

function Main() {
  const [currentTab, setCurrentTab] = useState(ALL_LABEL);
  return (
    <ReactiveBase
      app="unified-reactivesearch-web-data"
      url="https://a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61@appbase-demo-ansible-abxiydt-arc.searchbase.io"
      reactivesearchAPIConfig={{
        recordAnalytics: true,
        userId: "jon",
      }}
      transformRequest={transformRequest}
    >
      <Container>
        <img
          src={
            "https://softr-prod.imgix.net/applications/1c48df48-ec83-4b4e-b41c-3f5ee2b4bcd0/assets/9be7126b-a10e-41ab-9f63-1ef71ba78bd8.png"
          }
          className={styles.logo}
        />
      </Container>
      <Container className="mt-2 h-100">
        <TabDataList
          componentId={TABS_COMPONENT_ID}
          dataField="source.keyword"
          className={styles.resourceFilter}
          selectAllLabel={ALL_LABEL}
          data={[
            { label: "Website", value: "website" },
            { label: "Docs", value: "docs" },
            { label: "Blog", value: "blog" },
          ]}
          value={currentTab}
          /*Tab values are labels. eg. (All, Website, Docs, Blog)*/
          onChange={(v) => v && setCurrentTab(v)}
          defaultValue={ALL_LABEL}
        />
        <SearchBox
          dataField={[
            {
              field: "title",
              weight: 3,
            },
            {
              field: "tokens.keyword",
              weight: 6,
            },
            {
              field: "heading",
              weight: 6,
            },
            {
              field: "pageURL",
              weight: 1,
            },
          ]}
          componentId={SEARCH_COMPONENT_ID}
          className={styles.searchBox}
          highlight
          URLParams
          size={5}
          showClear
          showVoiceSearch
          renderNoSuggestion="No suggestions found."
        />
      </Container>
      <Container className="my-3">
        <AIAnswer
          react={{ and: [SEARCH_COMPONENT_ID] }}
          componentId="ai-answer"
        />

        {/* Show and hide reactivelist when we select ALL label because they depend on different rendering logic
         */}
        {currentTab === ALL_LABEL ? <AllResults /> : null}

        {currentTab !== ALL_LABEL ? <SectionResult /> : null}
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
