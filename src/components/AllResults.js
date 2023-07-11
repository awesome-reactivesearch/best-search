import { ReactiveList } from "@appbaseio/reactivesearch";
import React from "react";
import { Section } from "./Section/Section";
import {
  RESULT_COMPONENT_ID,
  SEARCH_COMPONENT_ID,
  TABS_COMPONENT_ID,
  placeholderImage,
  sectionOrder,
} from "../constants";

export const AllResults = () => (
  <ReactiveList
    componentId={RESULT_COMPONENT_ID}
    react={{ and: [SEARCH_COMPONENT_ID, TABS_COMPONENT_ID] }}
    dataField="title"
    showResultStats={false}
    infiniteScroll={false}
    renderNoResults={() => null}
    pagination
    size={12}
    className="reactiveList"
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

                  return sectionItems.length ? (
                    <div key={sectionTitle}>
                      <h1 className="my-4 text-capitalize">{sectionTitle}</h1>
                      <Section
                        sectionItems={sectionItems}
                        columns={sectionTitle !== "website" ? 3 : 2}
                        placeholderImage={
                          sectionTitle === "blog" ? placeholderImage : null
                        }
                        showBreadcrumb={sectionTitle === "docs"}
                        showIcon={sectionTitle === "docs"}
                      />
                    </div>
                  ) : null;
                })}
              </>
            );
          }
        }
      }

      return null;
    }}
  </ReactiveList>
);
