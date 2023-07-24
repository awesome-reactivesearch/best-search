import { SEARCH_COMPONENT_ID } from "./constants";
import { filterDuplicatesByTitle } from "./utils";

export async function transformResponse(res, componentId) {
  if (componentId === SEARCH_COMPONENT_ID) {
    const { hits } = res;
    const filteredHits = filterDuplicatesByTitle(
      hits && hits.hits ? hits.hits : []
    );
    return {
      ...res,
      hits: { hits: filteredHits },
    };
  }
  // If you want to filter duplicates in the results, uncomment the below code

  //   if (componentId === `${RESULT_COMPONENT_ID}_inner`) {
  //     const { hits } = res;
  //     const filteredHits = filterDuplicatesByTitle(
  //       hits && hits.hits ? hits.hits : []
  //     );
  //     return {
  //       ...res,
  //       hits: { ...hits, hits: filteredHits },
  //     };
  //   }
  //   if (componentId === RESULT_COMPONENT_ID) {
  //     const newRes = { ...res };
  //     console.log(newRes);

  //     if (newRes && newRes.hits && newRes.hits.hits) {
  //       console.log(newRes);
  //       newRes.hits.hits = newRes.hits.hits.map((hit) => {
  //         console.log(hit);
  //         if (hit.fields["source.keyword"][0] === "docs") {
  //           const innerHits = hit.inner_hits.most_rel.hits.hits;
  //           const filteredHits = filterDuplicatesByTitle(innerHits);
  //           return {
  //             ...hit,
  //             inner_hits: {
  //               most_rel: {
  //                 hits: {
  //                   hits: filteredHits,
  //                 },
  //               },
  //             },
  //           };
  //         }
  //         return hit;
  //       });
  //     }
  //     return newRes;
  //   }
  return res;
}
