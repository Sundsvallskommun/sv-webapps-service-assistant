import { Bubble, type AssistantInfo } from "@sk-web-gui/ai";
import { Avatar, Button, Link } from "@sk-web-gui/react";
import React from "react";
import type { DefaultColor } from "../../common/defaultColors";
import styles from "./assistant-dummie.styling.scss";
import HtmlParser from "react-html-parser";

interface Color {
  light: string;
  dark: string;
}
export interface Options {
  variant: string;
  fontface: Record<string, string>;
  colors: {
    header?: {
      inverted: boolean;
      color: string;
      background?: Color;
      contentbg?: Color;
      surface?: {
        primary?: Color;
        hover?: Color;
        disabled?: Color;
      };
      text?: {
        light: {
          primary?: Color;
          secondary?: Color;
          link?: Color;
          "link-hover"?: Color;
        };
        dark: {
          primary?: Color;
          secondary?: Color;
          link?: Color;
          "link-hover"?: Color;
        };
      };
    };
    bubble?: {
      simple: boolean;
      borders: boolean;
      shadow: boolean;
      icon: boolean;
      color: string;
      inverted?: boolean;
      surface?: Color;
      "surface-hover"?: Color;
      text?: Color;
    };
  };
  rounded: {
    use: boolean;
    main?: string;
    input?: string;
    button?: string;
  };
  border: {
    use?: boolean;
    thickness?: string;
    color?: string;
  };
  assistant: {
    color?: DefaultColor;
    showTitle?: boolean;
  };

  title?: string;
  subtitle?: string;
  label?: string;
  fontbase?: number;
  questionsTitle?: string;
  questions?: string[];
  helperText?: string;
  readmore?: {
    text?: string;
    link?: {
      text: string;
      url: string;
    };
  };
  icon?: string;
  css?: string;
}

interface AssistantDummieProps {
  assistant: AssistantInfo;
  options: Options;
}

export const AssistantDummie: React.FC<AssistantDummieProps> = ({
  options,
}) => {
  const [isClient, setIsClient] = React.useState<boolean>(false);

  React.useEffect(() => {
    setIsClient(!!window && !!document);
  }, []);

  const getMainBackground = (color: string, inverted: boolean) => {
    switch (color) {
      case "white":
        return inverted ? "#2F2F3C" : "#FFFFFF";
      case "vattjom":
        return inverted ? "#CFE0EC" : "#005595";
      case "juniskar":
        return inverted ? "#E9BEE0" : "#A90074";
      case "bjornstigen":
        return inverted ? "#D6C4DE" : "#5B1F78";
      case "gronsta":
        return inverted ? "#AAD4BF" : "#00733B";
      case "custom":
        return options?.colors?.header?.background?.light || "#CFE0EC";
      default:
        return inverted ? "#005595" : "#CFE0EC";
    }
  };

  const getMainPrimaryText = (color: string, inverted: boolean) => {
    switch (color) {
      case "custom":
        return (
          options?.colors?.header?.text?.light?.primary?.light || "#FFFFFF"
        );
      default:
        return inverted ? "#1F1F25" : "#FFFFFF";
    }
  };
  const getMainSecondaryText = (color: string, inverted: boolean) => {
    switch (color) {
      case "custom":
        return (
          options?.colors?.header?.text?.light?.primary?.light ||
          "rgba(255, 255, 255, 0.88)"
        );
      default:
        return inverted ? "#444450" : "rgba(255, 255, 255, 0.88)";
    }
  };

  const getMainLinkText = (color: string, inverted: boolean) => {
    switch (color) {
      case "custom":
        return inverted
          ? options?.colors?.header?.text?.dark?.link?.light
          : options?.colors?.header?.text?.light?.link?.light || `#CFE0EC`;
      default:
        return inverted ? `##005595` : `#CFE0EC`;
    }
  };

  const getBubbleBackground = (color: string, inverted: boolean) => {
    switch (color) {
      case "white":
        return inverted ? "rgba(28,28,40,0.95)" : "rgba(255,255,255,0.95)";
      case "vattjom":
        return inverted ? "#005595" : "#CFE0EC";
      case "juniskar":
        return inverted ? "#A90074" : "#F1D5EA";
      case "bjornstigen":
        return inverted ? "#5B1F78" : "#E4D8E9";
      case "gronsta":
        return inverted ? "#00733B" : "#C9E4D7";
      case "custom":
        return options?.colors?.bubble?.surface?.light || "#CFE0EC";
      default:
        return inverted ? "#005595" : "#CFE0EC";
    }
  };

  const getBubbleText = (color: string, inverted: boolean) => {
    switch (color) {
      case "custom":
        return options?.colors?.bubble?.text?.light || "#CFE0EC";
      default:
        return inverted ? "#FFFFFF" : "#1F1F25";
    }
  };

  const getDarkText = (color: string) => {
    switch (color) {
      case "custom":
        return options?.colors?.header?.text?.dark?.primary?.light || "#1F1F25";
      default:
        return "#1F1F25";
    }
  };
  const getInvertedDarkText = (color: string) => {
    switch (color) {
      case "custom":
        return options?.colors?.header?.text?.dark?.primary?.dark || "#ffffff";
      default:
        return "#ffffff";
    }
  };
  const getDarkSecondaryText = (color: string) => {
    switch (color) {
      case "custom":
        return (
          options?.colors?.header?.text?.dark?.secondary?.light || "#444450"
        );
      default:
        return "#444450";
    }
  };

  const getLightText = (color: string) => {
    switch (color) {
      case "custom":
        return (
          options?.colors?.header?.text?.light?.primary?.light || "#ffffff"
        );
      default:
        return "#ffffff";
    }
  };
  const getInvertedLightText = (color: string) => {
    switch (color) {
      case "custom":
        return options?.colors?.header?.text?.light?.primary?.dark || "#1F1F25";
      default:
        return "#1F1F25";
    }
  };

  const getLightSecondaryText = (color: string) => {
    switch (color) {
      case "custom":
        return (
          options?.colors?.header?.text?.light?.secondary?.light ||
          "rgba(255,255,255,0.88)"
        );
      default:
        return "rgba(255,255,255,0.88)";
    }
  };
  const getInvertedLightSecondaryText = (color: string) => {
    switch (color) {
      case "custom":
        return (
          options?.colors?.header?.text?.light?.secondary?.dark ||
          "rgba(28,28,40,0.88)"
        );
      default:
        return "rgba(28,28,40,0.88)";
    }
  };

  const getContentBg = (color: string) => {
    switch (color) {
      case "custom":
        return options?.colors?.header?.contentbg?.light || "#FFFFFF";
      default:
        return "#FFFFFF";
    }
  };

  const getPrimarySurface = (color: string) => {
    switch (color) {
      case "custom":
        return (
          options?.colors?.header?.surface?.primary?.light ||
          "rgba(28,28,40,0.95)"
        );
      default:
        return "rgba(28,28,40,0.95)";
    }
  };

  const getInvertedPrimarySurface = (color: string) => {
    switch (color) {
      case "custom":
        return (
          options?.colors?.header?.surface?.primary?.dark ||
          "rgba(255,255,255,0.95)"
        );
      default:
        return "rgba(255,255,255,0.95)";
    }
  };

  const cssVars = {
    "--bg-color-main-surface": getMainBackground(
      options?.colors?.header?.color || "vattjom",
      options?.variant === "secondary"
        ? !options?.colors?.header?.inverted
        : options?.colors?.header?.inverted || false
    ),
    "--text-color-main": getMainPrimaryText(
      options?.colors?.header?.color || "vattjom",
      options?.variant === "secondary"
        ? !options?.colors?.header?.inverted
        : options?.colors?.header?.inverted || false
    ),

    "--text-main-readmore": getMainSecondaryText(
      options?.colors?.header?.color || "vattjom",
      options?.variant === "secondary"
        ? !options?.colors?.header?.inverted
        : options?.colors?.header?.inverted || false
    ),
    "--text-main-readmore-link": getMainLinkText(
      options?.colors?.header?.color || "vattjom",
      options?.variant === "secondary"
        ? !options?.colors?.header?.inverted
        : options?.colors?.header?.inverted || false
    ),

    "--bg-background-content": getContentBg(
      options?.colors?.header?.color || "vattjom"
    ),
    "--text-dark-primary": getDarkText(
      options?.colors?.header?.color || "vattjom"
    ),
    "--text-inverted-dark-primary": getInvertedDarkText(
      options?.colors?.header?.color || "vattjom"
    ),
    "--text-light-primary": getLightText(
      options?.colors?.header?.color || "vattjom"
    ),
    "--text-inverted-light-primary": getInvertedLightText(
      options?.colors?.header?.color || "vattjom"
    ),
    "--text-dark-secondary": getDarkSecondaryText(
      options?.colors?.header?.color || "vattjom"
    ),
    "--text-light-secondary": getLightSecondaryText(
      options?.colors?.header?.color || "vattjom"
    ),
    "--text-inverted-light-secondary": getInvertedLightSecondaryText(
      options?.colors?.header?.color || "vattjom"
    ),
    "--bg-inverted-background-content": "#2F2F3C",
    "--bg-color-surface": "#005595",
    "--bg-inverted-color-surface": "#CFE0EC",
    "--bg-bubble-surface": getBubbleBackground(
      options?.colors?.bubble?.color || "vattjom",
      options?.colors?.bubble?.inverted || false
    ),
    "--text-bubble": getBubbleText(
      options?.colors?.bubble?.color || "vattjom",
      options?.colors?.bubble?.inverted || false
    ),
    "--bg-primary-surface": getPrimarySurface(
      options?.colors?.header?.color || "vattjom"
    ),
    "--bg-inverted-primary-surface": getInvertedPrimarySurface(
      options?.colors?.header?.color || "vattjom"
    ),

    "--border-color": options?.border?.use
      ? options?.border?.color
      : "rgba(28,28,40,0.3)",
    "--border-width": options?.border?.use ? options?.border?.thickness : "1px",

    //Border radius
    "--rounded-groups": options?.rounded?.use
      ? options?.rounded.main
      : options?.variant === "primary"
      ? "1rem"
      : "1.25rem",
    "--rounded-button": options?.rounded?.use
      ? options?.rounded.input
      : "0.75rem",
    "--rounded-button-sm": options?.rounded?.use
      ? options?.rounded.button
      : "0.625rem",

    //Fonts
    "--font-header": options?.fontface?.header,
    "--font-DEFAULT": options?.fontface?.DEFAULT,

    //Shadow
    "--drop-shadow":
      options?.variant === "primary"
        ? `0 6px 16px 0 rgba(13,13,14, 0.07),
                      0 1.81px 12px 0 rgba(13,13,14, 0.15),
                      0 0.75px 2px 0 rgba(13,13,14, 0.085),
                      0 0.27px 0.72px 0 rgba(13,13,14, 0.0583)`
        : undefined,
  } as React.CSSProperties;

  const inverted = options?.colors?.header?.inverted || false;
  return (
    <div>
      {options?.css && <style>{options.css}</style>}
      <div className={styles.dummy} style={cssVars}>
        {isClient && (
          <div
            className="sk-ai-service-module"
            data-variant={options?.variant}
            data-inverted={inverted}
            style={{
              fontFamily: options?.fontface?.DEFAULT,
              fontSize: `${
                options?.fontbase ? (16 / options?.fontbase) * 16 : 16
              }px`,
            }}
          >
            <div
              className="sk-ai-service-module-row"
              data-color="true"
              data-variant={options?.variant}
              data-inverted={inverted}
            >
              <div
                className="sk-ai-service-module-content"
                data-variant={options?.variant}
                data-inverted={inverted}
              >
                <header
                  className="sk-ai-service-module-header"
                  data-variant={options?.variant}
                  data-inverted={inverted}
                >
                  {options?.icon && options?.variant === "secondary" && (
                    <span className="sk-ai-service-module-header-icon">
                      <Avatar size="md" imageUrl={options?.icon}></Avatar>
                    </span>
                  )}
                  {options?.title && HtmlParser(options.title)}
                </header>
                {options?.subtitle && HtmlParser(options.subtitle)}
                <div className="sk-ai-service-module-form">
                  <div className="sk-form-control sk-ai-service-module-form-control">
                    {options?.helperText && (
                      <div className="sk-form-helper-text">
                        {options?.helperText}
                      </div>
                    )}
                    <label className="sk-form-label sk-ai-service-module-form-label">
                      {options?.label}
                    </label>

                    <form className="sk-ai-service-module-form-input-wrapper">
                      <div className="sk-form-input-group sk-form-input-group-lg sk-ai-service-module-form-input-group sk-ai-inputsection-group">
                        <input className="sk-form-input sk-form-input-lg sk-ai-inputsection-input" />

                        <div className="sk-form-input-addin sk-form-input-addin-right sk-form-input-addin-lg">
                          <Button
                            size="sm"
                            className="sk-ai-inputsection-button"
                          >
                            Skicka
                          </Button>
                        </div>
                      </div>
                    </form>
                  </div>
                  {options?.readmore && (
                    <div
                      className="sk-ai-service-module-form-readmore"
                      data-inverted={inverted}
                      data-variant={options?.variant}
                    >
                      {options?.readmore.text && `${options?.readmore.text} `}
                      {options?.readmore.link && (
                        <Link
                          external
                          href={options?.readmore.link.url}
                          variant="tertiary"
                          inverted={true}
                        >
                          {options?.readmore.link.text}
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            {options?.questions && (
              <div
                className="sk-ai-service-module-row"
                data-color={
                  options?.variant === "secondary" ? "true" : undefined
                }
                data-variant={options?.variant}
                data-inverted={inverted}
              >
                <aside
                  className="sk-ai-service-module-questions"
                  data-variant={options?.variant}
                  data-inverted={inverted}
                >
                  <div className="sk-ai-service-module-questions-title">
                    {typeof options?.questionsTitle === "string" ? (
                      <h3>{options?.questionsTitle}</h3>
                    ) : (
                      options?.questionsTitle
                    )}
                  </div>
                  <ul className="sk-ai-service-module-questions-list">
                    {options?.questions.map((item, index) => {
                      return (
                        <li key={`sk-ai-sm-question-${index}`}>
                          <Bubble
                            data-color={options?.colors?.bubble?.surface?.light}
                            hideIcon={!options?.colors?.bubble?.icon}
                            shadow={options?.colors?.bubble?.shadow}
                            variant={
                              options?.colors?.bubble?.simple
                                ? "simple"
                                : "default"
                            }
                            data-borders={options?.colors?.bubble?.borders}
                          >
                            {item}
                          </Bubble>
                        </li>
                      );
                    })}
                  </ul>
                </aside>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
