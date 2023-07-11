import { ALL_LABEL, RESULT_COMPONENT_ID, TABS_COMPONENT_ID } from "./constants";

export const transformRequest = (req) => {
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
    // handle when no search value is there. The component is making a suggestion query
    if (componentQuery.id === RESULT_COMPONENT_ID) {
      if (showAllResults) {
        const from = componentQuery.from;
        delete componentQuery.from;
        return {
          ...componentQuery,
          distinctField: "source.keyword",
          distinctFieldConfig: {
            inner_hits: {
              name: "most_rel",
              size: 5,
              from: from || 0,
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
};
