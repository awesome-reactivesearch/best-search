import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

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
import { Drawer } from "./components/Drawer";
import { DocumentSuggestion } from "./components/DocumentSuggestion";
import { Suggestion } from "./components/Suggestion";

function Main() {
  // When URL Params are set we should set the default value for tabs and search component.
  // This happens when somebody uses URL to load a pre-filtered page. eg. ?tab="Website"&search="Hello"
  const urlParams = new URL(location.href).searchParams;
  const selectedTabFromURL =
    urlParams.get(TABS_COMPONENT_ID) &&
    urlParams
      .get(TABS_COMPONENT_ID)
      .substring(1, urlParams.get(TABS_COMPONENT_ID).length - 1);
  const selectedQueryFromURL =
    urlParams.get(SEARCH_COMPONENT_ID) &&
    urlParams
      .get(SEARCH_COMPONENT_ID)
      .substring(1, urlParams.get(SEARCH_COMPONENT_ID).length - 1);

  const [currentTab, setCurrentTab] = useState(selectedTabFromURL);
  const [searchQuery, setSearchQuery] = useState(selectedQueryFromURL || "");
  const [searchQueryFinal, setSearchQueryFinal] = useState(
    selectedQueryFromURL || ""
  );

  const isLessThanMD = window.innerWidth < 768;
  const showInDrawer = isLessThanMD;

  return (
    <ReactiveBase
      app="unified-reactivesearch-web-data"
      url="https://a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61@appbase-demo-ansible-abxiydt-arc.searchbase.io"
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
          URLParams
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
          ]}
          componentId={SEARCH_COMPONENT_ID}
          className={styles.searchBox}
          highlight
          URLParams
          size={5}
          showClear
          enableRecentSuggestions
          recentSuggestionsConfig={{ index: "unified-reactivesearch-web-data" }}
          showVoiceSearch
          value={searchQuery}
          onChange={(v) => (v ? setSearchQuery(v) : setSearchQuery(""))}
          onValueSelected={(v) =>
            v ? setSearchQueryFinal(v) : setSearchQueryFinal("")
          }
          renderNoSuggestion="No suggestions found."
          renderItem={(suggestion) => {
            const suggestionType = suggestion._suggestion_type;

            return suggestionType === "index" ? (
              <DocumentSuggestion source={suggestion._source} />
            ) : (
              <Suggestion suggestion={suggestion} />
            );
          }}
        />
      </Container>
      <Container className="my-3">
        <Row>
          <Col md={searchQueryFinal ? 8 : "auto"} xs={12}>
            {/* Show and hide reactivelist when we select ALL label because they depend on different rendering logic
             */}
            {currentTab === ALL_LABEL ? <AllResults /> : null}

            {currentTab !== ALL_LABEL ? <SectionResult /> : null}
          </Col>
          {searchQueryFinal ? (
            showInDrawer ? (
              <Drawer>
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
              </Drawer>
            ) : (
              <Col md={4} className="aiAnswerContainer">
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
              </Col>
            )
          ) : null}
        </Row>
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
