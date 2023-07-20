import { ReactiveList } from "@appbaseio/reactivesearch";
import React from "react";
import { Section } from "./Section/Section";
import {
  RESULT_COMPONENT_ID,
  SEARCH_COMPONENT_ID,
  TABS_COMPONENT_ID,
  placeholderImage,
} from "../constants";

export const SectionResult = () => (
  <ReactiveList
    componentId={`${RESULT_COMPONENT_ID}_inner`}
    react={{ and: [SEARCH_COMPONENT_ID, TABS_COMPONENT_ID] }}
    dataField="title"
    showResultStats={false}
    pagination
    infiniteScroll={false}
    size={12}
    className="reactiveList"
    renderNoResults={() => (
      <img
        className={"noResults"}
        src="https://cdn.dribbble.com/userupload/2905354/file/original-92212c04a044acd88c69bedc56b3dda2.png?compress=1&resize=1504x1128"
      />
    )}
    paginationAt="both"
    innerClass={{ pagination: "bestSearchPagination" }}
  >
    {({ rawData: innerRawData }) => {
      if (innerRawData) {
        const hits = innerRawData.hits && innerRawData.hits.hits;
        const hasSections = hits && hits[0] && hits[0].inner_hits;
        if (hits) {
          if (!hasSections) {
            const source = hits && hits[0] && hits[0]._source;
            const sectionTitle = source && source.source;
            return (
              <div className="mt-4">
                <Section
                  sectionItems={hits}
                  columns={sectionTitle !== "website" ? 3 : 2}
                  placeholderImage={
                    sectionTitle === "blog" ? placeholderImage : null
                  }
                  showBreadcrumb={sectionTitle === "docs"}
                  showIcon={sectionTitle === "docs"}
                />
              </div>
            );
          }
        }
      }

      return null;
    }}
  </ReactiveList>
);
