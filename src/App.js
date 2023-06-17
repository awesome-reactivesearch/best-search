import React from "react";
import { Badge, Col, Container, Row } from "react-bootstrap";

import "./custom.scss";

import "./App.css";
import styles from "./App.module.css";

import "./utility.css";
import reactivesearchLogo from "./reactivesearch-logo.svg";
import blogImage from "./blog.jpg";

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
          defaultValue="All"
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
          componentId="SearchFilter"
          className={styles.searchBox}
          highlight
          URLParams
          size={5}
          showClear
          renderNoSuggestion="No suggestions found."
        />
      </Container>
      <Container>
        <h1 className="my-4">Website</h1>
        <Row md={2}>
          <Col>
            <div>
              <img src={blogImage} className={styles.blogImage} />
              <h5>
                Get control overSearch & Discovery to reflect your business
                goals
              </h5>
              <div className="text-primary">{`Dashboard > UI Builder`}</div>
              <p>
                Our Visual Editor empowers business teams to get control over
                Search and Discovery, to answer both their user behaviors and
                business requirements.
              </p>
              <div>
                <Badge
                  pill
                  bg="light"
                  className="border border-2 border-dark px-2 py-1 me-1"
                >
                  no code
                </Badge>
                <Badge
                  pill
                  bg="light"
                  className="border border-2 border-dark px-2 py-1 me-1"
                >
                  dashboard
                </Badge>
              </div>
            </div>
          </Col>
          <Col>
            <div>
              <img src={blogImage} className={styles.blogImage} />
              <h5>
                Get control overSearch & Discovery to reflect your business
                goals
              </h5>
              <div className="text-primary">{`Dashboard > UI Builder`}</div>
              <p>
                Our Visual Editor empowers business teams to get control over
                Search and Discovery, to answer both their user behaviors and
                business requirements.
              </p>
              <div>
                <Badge
                  pill
                  bg="light"
                  className="border border-2 border-dark px-2 py-1 me-1"
                >
                  no code
                </Badge>
                <Badge
                  pill
                  bg="light"
                  className="border border-2 border-dark px-2 py-1 me-1"
                >
                  dashboard
                </Badge>
              </div>
            </div>
          </Col>
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
