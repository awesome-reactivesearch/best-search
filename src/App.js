import React from "react";
import { Badge, Col, Container, Row } from "react-bootstrap";

import "./custom.scss";

import "./App.css";
import styles from "./App.module.css";

import "./utility.css";
import reactivesearchLogo from "./reactivesearch-logo.svg";
import placeholderImage from "./blog.jpg";

import { BreakpointProvider } from "./useBreakpoint";
import {
  ReactiveBase,
  ReactiveList,
  SearchBox,
  TabDataList,
} from "@appbaseio/reactivesearch";

const SEARCH_COMPONENT_ID = "SEARCH_COMPONENT_ID";
const TABS_COMPONENT_ID = "TAB_COMPONENT_ID";
const RESULT_COMPONENT_ID = "RESULT_LIST";

const ALL_LABEL = "All";

function Main() {
  return (
    <ReactiveBase
      app="unified-reactivesearch-web-data"
      url="https://a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61@appbase-demo-ansible-abxiydt-arc.searchbase.io"
      reactivesearchAPIConfig={{
        recordAnalytics: true,
        userId: "jon",
      }}
      transformRequest={(req) => {
        const body = JSON.parse(req.body);
        const showAllResults = Boolean(
          body.query.find(
            (componentQuery) =>
              componentQuery.id === TABS_COMPONENT_ID &&
              componentQuery.value &&
              componentQuery.value[0] === ALL_LABEL
          )
        );
        body.query = body.query.map((componentQuery) => {
          if (
            componentQuery.id === SEARCH_COMPONENT_ID &&
            componentQuery.type === "search" &&
            showAllResults
          ) {
            return {
              ...componentQuery,
              distinctField: "source.keyword",
              distinctFieldConfig: {
                inner_hits: {
                  name: "most_rel",
                  size: 5,
                },
                max_concurrent_group_searches: 4,
              },
            };
          }
          // handle when no search value is there. The component is making a suggestion query
          if (componentQuery.id === RESULT_COMPONENT_ID) {
            const searchQuery = body.query.find(
              (cQ) =>
                cQ.id === SEARCH_COMPONENT_ID &&
                cQ.type === "suggestion" &&
                showAllResults &&
                !cQ.value
            );
            if (searchQuery) {
              return {
                ...componentQuery,
                distinctField: "source.keyword",
                distinctFieldConfig: {
                  inner_hits: {
                    name: "most_rel",
                    size: 6,
                  },
                  max_concurrent_group_searches: 4,
                },
              };
            }
            return componentQuery;
          }
          return componentQuery;
        });
        const newReq = { ...req, body: JSON.stringify(body) };
        return newReq;
      }}
    >
      <Container>
        <img src={reactivesearchLogo} className={styles.logo} />
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
          renderNoSuggestion="No suggestions found."
        />
      </Container>
      <Container>
        <ReactiveList
          componentId={RESULT_COMPONENT_ID}
          react={{ and: [SEARCH_COMPONENT_ID, TABS_COMPONENT_ID] }}
          dataField="title"
          showResultStats={false}
        >
          {({ rawData }) => {
            if (rawData) {
              const hits = rawData.hits && rawData.hits.hits;
              if (hits) {
                return (
                  <>
                    {hits.map((hit) => {
                      const sectionTitle =
                        hit.fields && hit.fields["source.keyword"][0];
                      const sectionItems =
                        (hit.inner_hits &&
                          hit.inner_hits.most_rel &&
                          hit.inner_hits.most_rel.hits.hits) ||
                        [];

                      return (
                        <div key={sectionTitle}>
                          <h1 className="my-4 text-capitalize">
                            {sectionTitle}
                          </h1>
                          <Row md={sectionTitle === "blog" ? 3 : 2}>
                            {sectionItems.map((sectionItem) => {
                              const source = sectionItem._source || {};
                              const imageURL = source.img;
                              const keywords = source.keywords || [];

                              return (
                                <Col className="mb-3" key={sectionItem._id}>
                                  <div>
                                    {(imageURL || sectionTitle === "blog") && (
                                      <img
                                        src={imageURL || placeholderImage}
                                        className={styles.sectionItemImage}
                                      />
                                    )}
                                    <h5>
                                      {source.title ||
                                        source.heading ||
                                        source.meta_title}
                                    </h5>
                                    <div className="text-primary">{`Dashboard > UI Builder`}</div>
                                    <p
                                      className={styles.sectionItemDescription}
                                    >
                                      {source.meta_description}
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
                        </div>
                      );
                    })}
                  </>
                );
              }
            }
            return null;
          }}
        </ReactiveList>
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
