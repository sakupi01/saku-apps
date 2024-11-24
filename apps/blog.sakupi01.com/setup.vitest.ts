import { http, HttpResponse, graphql } from "msw";
import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll, vi } from "vitest";
import res from "./libs/tests/fixtures/zenn.json";

export const restHandlers = [
  http.get("https://zenn.dev/api/articles", () => {
    return HttpResponse.json(res);
  }),
];

const server = setupServer(...restHandlers);

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

//  Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers());

vi.mock("node:fs");
