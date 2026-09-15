export const headingLevels = ["h1", "h2", "h3", "h4", "h5", "h6"] as const;

export type HeadingLevel = (typeof headingLevels)[number];

export const getHeadingLevel = (value: unknown): HeadingLevel =>
  headingLevels.includes(value as HeadingLevel) ? (value as HeadingLevel) : "h2";

export const getQuestionsHeadingLevel = (value: unknown): HeadingLevel =>
  headingLevels[Math.min(headingLevels.indexOf(getHeadingLevel(value)) + 1, 5)];

// Keep formatted title content, but let the surrounding heading set its level.
export const headingParserOptions = {
  transform: (node: { type: string; name?: string }) => {
    if (node.type === "tag" && /^h[1-6]$/.test(node.name || "")) {
      node.name = "span";
    }
    return undefined;
  },
};
