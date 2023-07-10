import React from "react";
import { Container } from "react-bootstrap";

import "./custom.scss";

import "./App.css";
import styles from "./App.module.css";

import "./utility.css";

import { BreakpointProvider } from "./useBreakpoint";
import {
  ReactiveBase,
  ReactiveList,
  SearchBox,
  TabDataList,
} from "@appbaseio/reactivesearch";
import { Section } from "./Section";
import { AskButton } from "./AskButton";

const SEARCH_COMPONENT_ID = "SEARCH_COMPONENT_ID";
const TABS_COMPONENT_ID = "TAB_COMPONENT_ID";
const RESULT_COMPONENT_ID = "RESULT_LIST";

const ALL_LABEL = "All";

const sectionOrder = {
  website: 1,
  blog: 2,
  docs: 3,
};

const placeholderImage =
  "https://images.yourstory.com/cs/wordpress/2017/02/52-Blog.jpg";

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
              (cQ) => cQ.id === SEARCH_COMPONENT_ID
            );
            if (
              (searchQuery && !searchQuery.value && showAllResults) ||
              (!searchQuery && showAllResults)
            ) {
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
          enableAI
          AIUIConfig={{
            askButton: true,
            renderAskButton: (onAskButtonClick) => {
              return <AskButton onClick={onAskButtonClick} />;
            },
          }}
        />
      </Container>
      <Container className="my-3">
        {/* Has a nested ReactiveList which is used to show pagination when a tab is selected
         * It also shows results with a modified query to show data for all the sections
         */}
        <ReactiveList
          componentId={RESULT_COMPONENT_ID}
          react={{ and: [SEARCH_COMPONENT_ID, TABS_COMPONENT_ID] }}
          dataField="title"
          showResultStats={false}
          infiniteScroll={false}
          renderNoResults={() => null}
          pagination={false}
          size={12}
        >
          {({ rawData }) => {
            if (rawData) {
              const hits = rawData.hits && rawData.hits.hits;
              const hasSections = hits && hits[0] && hits[0].inner_hits;
              if (hits) {
                if (hasSections) {
                  const sortedHits = hits.sort((a, b) => {
                    const sourceA = a.fields && a.fields["source.keyword"][0];
                    const sourceB = b.fields && b.fields["source.keyword"][0];
                    const orderA = sectionOrder[sourceA];
                    const orderB = sectionOrder[sourceB];
                    return orderA - orderB;
                  });
                  return (
                    <>
                      {sortedHits.map((hit) => {
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
                            <Section
                              sectionItems={sectionItems}
                              columns={sectionTitle !== "website" ? 3 : 2}
                              placeholderImage={
                                sectionTitle === "blog"
                                  ? placeholderImage
                                  : null
                              }
                              showBreadcrumb={sectionTitle === "docs"}
                              showIcon={sectionTitle === "docs"}
                            />
                          </div>
                        );
                      })}
                    </>
                  );
                } else {
                  return (
                    <ReactiveList
                      componentId={`${RESULT_COMPONENT_ID}_inner`}
                      react={{ and: [SEARCH_COMPONENT_ID, TABS_COMPONENT_ID] }}
                      dataField="title"
                      showResultStats={false}
                      pagination
                      infiniteScroll={false}
                      size={12}
                      className="reactiveList"
                    >
                      {({ rawData: innerRawData }) => {
                        if (innerRawData) {
                          const hits =
                            innerRawData.hits && innerRawData.hits.hits;
                          const hasSections =
                            hits && hits[0] && hits[0].inner_hits;
                          if (hits) {
                            if (!hasSections) {
                              const source = hits && hits[0] && hits[0]._source;
                              const sectionTitle = source && source.source;
                              return (
                                <Section
                                  sectionItems={hits}
                                  columns={sectionTitle !== "website" ? 3 : 2}
                                  placeholderImage={
                                    sectionTitle === "blog"
                                      ? placeholderImage
                                      : null
                                  }
                                  showBreadcrumb={sectionTitle === "docs"}
                                  showIcon={sectionTitle === "docs"}
                                />
                              );
                            }
                          }
                        }

                        return null;
                      }}
                    </ReactiveList>
                  );
                }
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
