import fs from "fs";
import path from "path";

const loadConfigModule = async () => {
  jest.resetModules();
  await import("./config.js");
};

const flushUi = async () => {
  jest.runOnlyPendingTimers();
  await Promise.resolve();
};

describe("sitevision config metadata behavior", () => {
  test("heading selector defaults to h2 and preserves the manual value when switching metadata", async () => {
    document.body.innerHTML = fs
      .readFileSync(path.join(__dirname, "index.html"), "utf8")
      .replace(/<%[\s\S]*?%>/g, "");
    const select = document.querySelector('select[name="heading_level"]');
    const toggle = document.querySelector(
      'input[name="heading_level__useMetadata"]'
    );
    const metadata = document.querySelector(
      'select[name="heading_level__metadata"]'
    );
    expect(Array.from(select.options, (option) => option.value)).toEqual([
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
    ]);
    expect(select.value).toBe("h2");
    select.value = "h5";
    await loadConfigModule();
    await flushUi();
    expect(select.value).toBe("h5");
    toggle.checked = true;
    toggle.dispatchEvent(new Event("change", { bubbles: true }));
    expect(select.hidden).toBe(true);
    expect(metadata.closest("[data-metadata-selector-container]").hidden).toBe(
      false
    );
    toggle.checked = false;
    toggle.dispatchEvent(new Event("change", { bubbles: true }));
    expect(select.hidden).toBe(false);
    expect(select.value).toBe("h5");
  });

  beforeEach(() => {
    jest.useFakeTimers();
    document.body.innerHTML = "";
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test("hides the manual field and shows the metadata selector when metadata is enabled", async () => {
    document.body.innerHTML = `
      <div class="form-group" data-metadata-field>
        <label>Name</label>
        <input name="assistant_name" data-metadata-manual />
        <div class="checkbox">
          <label>
            <input
              type="checkbox"
              name="assistant_name__useMetadata"
              data-metadata-toggle
              checked
            />
            Use metadata
          </label>
          <div data-metadata-selector-container>
            <select name="assistant_name__metadata"></select>
          </div>
        </div>
      </div>
    `;

    await loadConfigModule();
    await flushUi();

    expect(
      document.querySelector('input[name="assistant_name"]').hidden
    ).toBe(true);
    expect(
      document.querySelector("[data-metadata-selector-container]").hidden
    ).toBe(false);
  });

  test("shows dependent question fields when metadata mode is enabled for use_questions", async () => {
    document.body.innerHTML = `
      <div class="form-group" data-metadata-field>
        <label data-metadata-manual>
          <input
            type="checkbox"
            name="use_questions"
            data-enables="#pre-defined-questions"
          />
          Use questions
        </label>
        <div class="checkbox">
          <label>
            <input
              type="checkbox"
              name="use_questions__useMetadata"
              data-metadata-toggle
              checked
            />
            Use metadata
          </label>
          <div data-metadata-selector-container>
            <select name="use_questions__metadata"></select>
          </div>
        </div>
      </div>
      <div id="pre-defined-questions">
        <div class="form-group">
          <input name="questions_count" value="2" />
        </div>
        <div class="form-group">
          <input name="question_1" />
        </div>
        <div class="form-group">
          <input name="question_2" />
        </div>
        <div class="form-group">
          <input name="question_3" />
        </div>
      </div>
    `;

    await loadConfigModule();
    await flushUi();

    expect(document.querySelector("#pre-defined-questions").hidden).toBe(false);
    expect(
      document.querySelector('input[name="question_1"]').closest(".form-group")
        .hidden
    ).toBe(false);
    expect(
      document.querySelector('input[name="question_2"]').closest(".form-group")
        .hidden
    ).toBe(false);
    expect(
      document.querySelector('input[name="question_3"]').closest(".form-group")
        .hidden
    ).toBe(true);
  });
});
