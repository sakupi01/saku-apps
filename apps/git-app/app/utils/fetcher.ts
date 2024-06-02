export const fetcher = async <T>(query: string, variables: T) => {
  return fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: query,
      variables,
    }),
  }).then((res) => res.json());
};
