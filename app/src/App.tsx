import {
  AdditionalAssistantOptions,
  AssistantInfo,
  AssistantSettings,
  setAssistantStoreName,
  useAssistantStore,
  useSessions,
} from "@sk-web-gui/ai";
import {
  ColorSchemeMode,
  defaultTheme,
  extendTheme,
  GuiProvider,
} from "@sk-web-gui/react";
import { Suspense, useEffect, useMemo, useState } from "react";
import { Assistant } from "./components/Assistant";

function App({
  user,
  hash,
  assistantId,
  id,
}: {
  user?: string | null;
  hash?: string | null;
  assistantId?: string | null;
  id?: string;
}) {
  const [setSettings, settings, setInfo, setStream, setApiBaseUrl, options] =
    useAssistantStore((state) => [
      state.setSettings,
      state.settings,
      state.setInfo,
      state.setStream,
      state.setApiBaseUrl,
      state.options,
    ]);
  const newSession = useSessions((state) => state.newSession);

  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    setAssistantStoreName(`sk-ai-sv-service-assistant-${id}`);

    if (import.meta.env.DEV) {
      const settings: AssistantSettings = {
        user: user || "",
        assistantId: assistantId || "",

        hash: hash || "",
        app: import.meta.env.VITE_APPLICATION,
      };

      const info: AssistantInfo = {
        name: import.meta.env.VITE_ASSISTANT_NAME || "Serviceassistenten",
        shortName: "AI",
        title: "Sundsvalls AI-assistent.",
        description: {
          default:
            "Fråga assistenten om sådant du behöver veta som medarbetare på Sundsvalls kommun.",
          en: "The AI assistant can answer your questions in multiple languages.",
        },
        avatar: `${import.meta.env.VITE_BASE_PATH}assets/assistanticon.png`,
      };
      setStream(import.meta.env.VITE_STREAM_DEFAULT);
      setApiBaseUrl(import.meta.env.VITE_API_BASE_URL);
      setSettings(settings);
      setInfo(info);
    }

    newSession();
    setLoaded(true);
  }, [
    user,
    hash,
    assistantId,
    setSettings,
    setInfo,
    newSession,
    setStream,
    setApiBaseUrl,
  ]);

  useEffect(() => {
    if (options?.css) {
      const rootElement = document.getElementById(id);
      const isShadow = rootElement.getAttribute("data-shadow") === "true";
      const firstChild = rootElement.firstChild as HTMLElement;

      const styleroot = isShadow ? firstChild?.shadowRoot : rootElement;

      const style = document?.createElement("style");
      style.textContent = options.css;
      styleroot?.appendChild(style);
    }
  }, [options?.css]);

  const getBubbleSurface = (
    color: AdditionalAssistantOptions,
    mode: "light" | "dark"
  ) => {
    switch (color?.color) {
      case "white":
        return color?.inverted
          ? "var(--sk-colors-primary-surface-DEFAULT)"
          : "var(--sk-colors-inverted-primary-surface-DEFAULT)";
      default:
        return color?.inverted
          ? `var(--sk-colors-${color?.color}-surface-primary-DEFAULT)`
          : `var(--sk-colors-${color?.color}-surface-accent-DEFAULT)`;
    }
  };

  const getBubbleSurfaceHover = (
    color: AdditionalAssistantOptions,
    mode: "light" | "dark"
  ) => {
    switch (color?.color) {
      case "white":
        return color?.inverted
          ? "var(--sk-colors-primary-surface-hover)"
          : "var(--sk-colors-inverted-primary-surface-hover)";
      default:
        return color?.inverted
          ? `var(--sk-colors-${color?.color}-surface-primary-hover)`
          : `var(--sk-colors-${color?.color}-surface-accent-hover)`;
    }
  };

  const getBubbleText = (
    color: AdditionalAssistantOptions,
    mode: "light" | "dark"
  ) => {
    switch (color?.color) {
      default:
        return color?.inverted
          ? `var(--sk-colors-light-primary)`
          : `var(--sk-colors-dark-primary)`;
    }
  };

  const getHeaderBackground = (
    color: AdditionalAssistantOptions,
    mode: "light" | "dark"
  ) => {
    const inverted =
      options?.variant === "secondary" ? !color?.inverted : !!color?.inverted;
    switch (color?.color) {
      case "black":
        return inverted
          ? "var(--sk-colors-primary-surface)"
          : "var(--sk-colors-inverted-primary-surface)";
      default:
        return inverted
          ? `var(--sk-colors-inverted-${color?.color}-surface-primary-DEFAULT)`
          : `var(--sk-colors-${color?.color}-surface-primary-DEFAULT)`;
    }
  };

  const getHeaderPrimaryText = (
    color: AdditionalAssistantOptions,
    mode: "light" | "dark"
  ) => {
    const inverted =
      options?.variant === "secondary" ? !color?.inverted : !!color?.inverted;
    switch (color?.color) {
      default:
        return inverted
          ? `var(--sk-colors-dark-primary)`
          : `var(--sk-colors-light-primary)`;
    }
  };

  const getHeaderSecondaryText = (
    color: AdditionalAssistantOptions,
    mode: "light" | "dark"
  ) => {
    const inverted =
      options?.variant === "secondary" ? !color?.inverted : !!color?.inverted;
    switch (color?.color) {
      default:
        return inverted
          ? `var(--sk-colors-dark-secondary)`
          : `var(--sk-colors-light-secondary)`;
    }
  };

  const getHeaderLinkText = (
    color: AdditionalAssistantOptions,
    mode: "light" | "dark"
  ) => {
    const inverted =
      options?.variant === "secondary" ? !color?.inverted : !!color?.inverted;
    switch (color?.color) {
      default:
        return inverted
          ? `var(--sk-colors-vattjom-surface-primary-DEFAULT)`
          : `var(--sk-colors-inverted-vattjom-surface-primary-DEFAULT)`;
    }
  };

  const getDarkLinkText = (
    color: AdditionalAssistantOptions,
    mode: "light" | "dark"
  ) => {
    const inverted =
      options?.variant === "secondary" ? !color?.inverted : !!color?.inverted;
    switch (color?.color) {
      default:
        return inverted
          ? `var(--sk-colors-inverted-vattjom-surface-primary-DEFAULT)`
          : `var(--sk-colors-vattjom-surface-primary-DEFAULT)`;
    }
  };

  const getHeaderLinkHoverText = (
    color: AdditionalAssistantOptions,
    mode: "light" | "dark"
  ) => {
    const inverted =
      options?.variant === "secondary" ? !color?.inverted : !!color?.inverted;
    switch (color?.color) {
      default:
        return inverted
          ? `var(--sk-colors-vattjom-surface-primary-hover)`
          : `var(--sk-colors-inverted-vattjom-surface-primary-hover)`;
    }
  };

  const getDarkLinkHoverText = (
    color: AdditionalAssistantOptions,
    mode: "light" | "dark"
  ) => {
    const inverted =
      options?.variant === "secondary" ? !color?.inverted : !!color?.inverted;
    switch (color?.color) {
      default:
        return inverted
          ? `var(--sk-colors-inverted-vattjom-surface-primary-hover)`
          : `var(--sk-colors-vattjom-surface-primary-hover)`;
    }
  };

  const getLightColors = (
    color: AdditionalAssistantOptions,
    mode: "light" | "dark"
  ) => {
    switch (color?.color) {
      default:
        return undefined;
    }
  };

  const getDarkColors = (
    color: AdditionalAssistantOptions,
    mode: "light" | "dark"
  ) => {
    switch (color?.color) {
      default:
        return undefined;
    }
  };

  const getContentBackground = (
    color: AdditionalAssistantOptions,
    mode: "light" | "dark"
  ) => {
    switch (color?.color) {
      default:
        return {};
    }
  };

  const getPrimarySurface = (
    color: AdditionalAssistantOptions,
    mode: "light" | "dark"
  ) => {
    switch (color?.color) {
      default:
        return undefined;
    }
  };

  const theme = useMemo(
    () =>
      extendTheme({
        fontFamily: {
          ...defaultTheme.fontFamily,
          DEFAULT: options?.fontface?.DEFAULT
            ? (options.fontface?.DEFAULT as string)
            : defaultTheme.fontFamily.DEFAULT,
          header: options?.fontface?.header
            ? (options.fontface.header as string)
            : defaultTheme.fontFamily.DEFAULT,
        },
        spacing: {
          ...defaultTheme.spacing,
          "border-custom-width": options?.border?.use
            ? options?.border?.thickness
            : defaultTheme.spacing[1],
          "border-bubble":
            options?.colors?.bubble?.simple && options?.colors?.bubble?.borders
              ? "var(--sk-spacing-border-custom-width)"
              : "0",
          displaybubble: options?.colors?.bubble?.simple ? "none" : "block",
          displaybubbleicon: options?.colors?.bubble?.icon ? "flex" : "none",
          displaybubbleshadow: options?.colors?.bubble?.shadow
            ? "block"
            : "none",
          bubbleshadow: options?.colors?.bubble?.shadow
            ? "0 1px 0 0 rgba(0, 0, 0, 0.2)"
            : "none",
        },
        radius: {
          ...defaultTheme.radius,
          cards: options?.rounded?.use
            ? {
                DEFAULT: options?.rounded?.main,
                lg: options?.rounded?.main,
                md: options?.rounded?.main,
                sm: options?.rounded?.main,
              }
            : defaultTheme.radius.cards,
          groups: options?.rounded?.use
            ? {
                DEFAULT: options?.rounded?.main,
                lg: options?.rounded?.main,
                md: options?.rounded?.main,
                sm: options?.rounded?.main,
              }
            : defaultTheme.radius.groups,
          button: options?.rounded?.use
            ? {
                DEFAULT: options?.rounded?.input,
                lg: options?.rounded?.input,
                md: options?.rounded?.input,
                sm: options?.rounded?.button,
              }
            : defaultTheme.radius.groups,
        },
        colorSchemes: {
          light: {
            ...defaultTheme.colorSchemes.light,
            colors: {
              ...defaultTheme.colorSchemes.light.colors,
              "border-custom-color": options?.border?.use
                ? options?.border?.color
                : defaultTheme.colorSchemes.light.colors.divider,
              light:
                getLightColors(options?.colors?.header, "light") ||
                defaultTheme.colorSchemes.light.colors.light,
              dark:
                getDarkColors(options?.colors?.header, "light") ||
                defaultTheme.colorSchemes.light.colors.dark,
              background: {
                ...(defaultTheme.colorSchemes.light.colors.background as any),
                ...getContentBackground(options?.colors?.header, "light"),
              },
              primary: {
                ...(defaultTheme.colorSchemes.light.colors.primary as any),
                surface: {
                  ...(getPrimarySurface(options?.colors?.header, "light") ||
                    (defaultTheme.colorSchemes.light.colors.primary as any)
                      .surface),
                },
              },
              header: {
                background: getHeaderBackground(
                  options?.colors.header,
                  "light"
                ),

                text: {
                  primary: getHeaderPrimaryText(
                    options?.colors.header,
                    "light"
                  ),
                  secondary: getHeaderSecondaryText(
                    options?.colors.header,
                    "light"
                  ),
                  link: getHeaderLinkText(options?.colors.header, "light"),
                  "link-hover": getHeaderLinkHoverText(
                    options?.colors.header,
                    "light"
                  ),
                },
              },

              bubble: {
                surface: getBubbleSurface(options?.colors?.bubble, "light"),
                "surface-hover": getBubbleSurfaceHover(
                  options?.colors?.bubble,
                  "light"
                ),
                text: getBubbleText(options?.colors?.bubble, "light"),
              },
              "dark-link": getDarkLinkText(options?.colors?.header, "light"),
              "dark-link-hover": getDarkLinkHoverText(
                options?.colors?.header,
                "light"
              ),
            },
          },

          dark: {
            ...defaultTheme.colorSchemes.dark,
            colors: {
              ...defaultTheme.colorSchemes.dark.colors,
              "border-custom-color": options?.border?.use
                ? options?.border?.color
                : defaultTheme.colorSchemes.dark.colors.divider,
              light:
                getLightColors(options?.colors?.header, "dark") ||
                defaultTheme.colorSchemes.dark.colors.light,
              dark:
                getDarkColors(options?.colors?.header, "light") ||
                defaultTheme.colorSchemes.dark.colors.dark,
              background: {
                ...(defaultTheme.colorSchemes.dark.colors.background as any),
                ...getContentBackground(options?.colors?.header, "dark"),
              },
              primary: {
                ...(defaultTheme.colorSchemes.dark.colors.primary as any),
                surface: {
                  ...(getPrimarySurface(options?.colors?.header, "dark") ||
                    (defaultTheme.colorSchemes.dark.colors.primary as any)
                      .surface),
                },
              },
              header: {
                background: getHeaderBackground(options?.colors.header, "dark"),
                text: {
                  primary: getHeaderPrimaryText(options?.colors.header, "dark"),
                  secondary: getHeaderSecondaryText(
                    options?.colors.header,
                    "dark"
                  ),
                  link: getHeaderLinkText(options?.colors.header, "dark"),
                  "link-hover": getHeaderLinkHoverText(
                    options?.colors.header,
                    "dark"
                  ),
                },
              },
              bubble: {
                surface: getBubbleSurface(options?.colors?.bubble, "dark"),
                "surface-hover": getBubbleSurfaceHover(
                  options?.colors?.bubble,
                  "dark"
                ),
                text: getBubbleText(options?.colors?.bubble, "dark"),
              },
              "dark-link": getDarkLinkText(options?.colors?.header, "dark"),
              "dark-link-hover": getDarkLinkHoverText(
                options?.colors?.header,
                "dark"
              ),
            },
          },
        },
      }),
    //eslint-disable-next-line
    [settings]
  );

  return (
    <GuiProvider
      theme={theme}
      htmlFontSize={options?.fontbase || 16}
      colorScheme={options?.colorscheme || ColorSchemeMode.System}
    >
      <Suspense fallback="loading">{loaded && <Assistant />}</Suspense>
    </GuiProvider>
  );
}

export default App;
