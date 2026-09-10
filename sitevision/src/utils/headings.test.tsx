import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { AssistantDummie } from "../components/assistant-dummie/assistant-dummie.component";
import { getHeadingLevel, headingLevels } from "@shared";
import { resolveMetadataBackedString } from "./metadataFieldResolver";

// Load the client through Jest without including its separate TS project in the Sitevision build.
const { Assistant } = require("../../../app/src/components/Assistant") as {
  Assistant: React.ComponentType;
};

let mockOptions: any;

jest.mock("react-dom/server", () => jest.requireActual("react-dom/server.node"));
jest.mock("../../../app/node_modules/react", () => require("react"));
jest.mock("../../../app/node_modules/react-html-parser", () =>
  require("react-html-parser")
);
jest.mock("../../../app/node_modules/usehooks-ts/dist/index.cjs", () => ({
  useMediaQuery: () => false,
}));
jest.mock("../../../app/src/services/useAppSessions", () => ({
  useAppSessions: () => ({ sessionId: "", setSessionId: jest.fn() }),
}));
jest.mock("../../../app/node_modules/@sk-web-gui/ai", () => ({
  useAssistantStore: (selector: any) =>
    selector({ options: mockOptions, settings: { app: "test" } }),
  useChat: () => ({}),
  AIServiceModule: ({ header, questionsTitle, questions }: any) => (
    <div>
      <header>{header}</header>
      {questions && <aside>{questionsTitle}</aside>}
    </div>
  ),
}));
jest.mock("@sk-web-gui/ai", () => ({ Bubble: () => <button>Fråga</button> }));
jest.mock("@sk-web-gui/react", () => ({
  Avatar: () => null,
  Button: () => <button />,
  Link: () => null,
}));
jest.mock("../../../app/node_modules/@sk-web-gui/react", () => ({
  Avatar: () => null,
}));

describe.each(["interactive", "preview"])("%s headings", (renderer) => {
  beforeEach(() => {
    mockOptions = {
      title: "Hej <em>världen</em>",
      questionsTitle: "Vanliga frågor",
      questions: ["Fråga"],
      variant: "primary",
    };
    jest
      .spyOn(React, "useState")
      .mockImplementation(() => [true, jest.fn()] as any);
  });
  afterEach(() => jest.restoreAllMocks());

  const render = () => {
    const element =
      renderer === "interactive" ? (
        <Assistant />
      ) : (
        <AssistantDummie assistant={{} as any} options={mockOptions} />
      );
    const root = document.createElement("div");
    root.innerHTML = renderToStaticMarkup(element);
    return root;
  };

  test.each([
    ["h1", "H2"],
    ["h2", "H3"],
    ["h3", "H4"],
    ["h4", "H5"],
    ["h5", "H6"],
    ["h6", "H6"],
  ])("renders %s and %s", (level, questionLevel) => {
    mockOptions.headingLevel = level;
    const headings = render().querySelectorAll("h1,h2,h3,h4,h5,h6");
    expect(Array.from(headings, (node) => node.tagName)).toEqual([
      level.toUpperCase(),
      questionLevel,
    ]);
    expect(headings[0].querySelector("em")?.textContent).toBe("världen");
  });

  test("uses h2/h3 for existing settings and preserves fallback text", () => {
    delete mockOptions.title;
    delete mockOptions.questionsTitle;
    const root = render();
    expect(root.querySelector("h2")?.textContent).toBe(
      "Hej, vad vill du ha hjälp med?"
    );
    expect(root.querySelector("h3")?.textContent).toBe("Vanliga frågor");
  });

  test("replaces embedded heading tags while preserving formatting", () => {
    mockOptions.headingLevel = "h4";
    mockOptions.title =
      '<h1 class="formatted">Hej <strong>världen</strong></h1>';
    const root = render();
    expect(root.querySelector("h1")).toBeNull();
    expect(root.querySelector("h4 span.formatted strong")?.textContent).toBe(
      "världen"
    );
  });

  test("does not render questions when disabled", () => {
    delete mockOptions.questions;
    expect(render().querySelector("h3")).toBeNull();
  });
});

describe("heading level metadata resolution", () => {
  test.each([
    ["h4", false, "h1", "h4"],
    ["h4", true, "h1", "h1"],
    ["h4", true, undefined, "h4"],
    ["h4", true, "h7", "h4"],
    [undefined, false, undefined, "h2"],
    ["invalid", false, undefined, "h2"],
    ["invalid", true, "invalid", "h2"],
  ])(
    "manual %s, metadata enabled %s, metadata %s gives %s",
    (manual, enabled, metadata, expected) => {
      const values: Record<string, unknown> = {
        heading_level: manual,
        heading_level__useMetadata: enabled,
      };
      const resolved = resolveMetadataBackedString(
        "heading_level",
        {
          appData: {
            get: (name) => values[name],
            getNode: () => ({ getName: () => "level" } as any),
          },
          properties: { get: () => metadata },
          propertyUtil: { getNode: () => undefined as any },
          portletContextUtil: { getCurrentPage: () => ({} as any) },
        },
        { allowedValues: headingLevels }
      );
      expect(getHeadingLevel(resolved)).toBe(expected);
    }
  );
});
