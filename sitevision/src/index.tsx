import router from "@sitevision/api/common/router";
import appData from "@sitevision/api/server/appData";
import imageRenderer from "@sitevision/api/server/ImageRenderer";
import portletContextUtil from "@sitevision/api/server/PortletContextUtil";
import properties from "@sitevision/api/server/Properties";
import versionUtil from "@sitevision/api/server/VersionUtil";
import type { AssistantInfo } from "@sk-web-gui/ai";
import * as React from "react";
import { renderToString } from "react-dom/server";
import ReactHtmlParser from "react-html-parser";
import { ServerSideApp } from "./components/serverside-app/serverside-app.component";
import { getHash } from "./utils/hash.service";
import type { DefaultColor } from "./common/defaultColors";
import globalAppData from "@sitevision/api/server/globalAppData";

router.get("/", (req, res) => {
  const salt = globalAppData.get("salt") as string;
  const version = appData.get("version") as string;

  const avatar = appData.getNode(`${version}_assistant_avatar`);
  const avatarRender = imageRenderer;
  avatarRender.setImage(avatar);

  const assistant: AssistantInfo = {
    name: appData.get(`${version}_assistant_name`) as string,
    shortName: appData.get(`${version}_assistant_shortName`) as string,
    avatar: avatar ? ReactHtmlParser(avatarRender.render())[0] : undefined,
  };

  const useQuestions = appData.get(`${version}_use_questions`) as boolean;
  const numberOfQuestions = parseInt(
    appData.get(`${version}_questions_count`) as string
  );
  const questions = useQuestions
    ? [
        appData.get(`${version}_question_1`) as string,
        appData.get(`${version}_question_2`) as string,
        appData.get(`${version}_question_3`) as string,
        appData.get(`${version}_question_4`) as string,
        appData.get(`${version}_question_5`) as string,
      ]
        .slice(0, numberOfQuestions)
        .filter((quest) => !!quest)
    : undefined;
  const questionsTitle = useQuestions
    ? (appData.get(`${version}_questions_title`) as string)
    : undefined;

  const mobileBreakpoint = `${appData.get(
    `${version}_mobile_breakpoint`
  )}${appData.get(`${version}_mobile_breakpoint_unit`)}`;

  const assistantOptions = {
    color: appData.get(`${version}_assistant_avatar_color`) as DefaultColor,
    showTitle: appData.get(`${version}_assistant_show_title`) as boolean,
  };

  const mainIcon = appData.getNode(`${version}_header_icon`);
  const mainIconRenderer = imageRenderer;
  mainIconRenderer.setImage(mainIcon);
  const icon = ReactHtmlParser(mainIconRenderer.render())[0];

  const userAvatar = appData.getNode(`${version}_user_avatar`);
  const userAvatarRender = imageRenderer;
  userAvatarRender.setImage(userAvatar);

  const user = {
    color: appData.get(`${version}_user_avatar_color`) as DefaultColor,
    title: appData.get(`${version}_user_name`) as string,
    avatar: userAvatar
      ? ReactHtmlParser(userAvatarRender.render())[0]
      : undefined,
    initials: appData.get(`${version}_user_initials`) as string,
    showTitle: appData.get(`${version}_user_show_title`) as boolean,
  };

  const systemAvatar = appData.getNode(`${version}_system_avatar`);
  const systemAvatarRender = imageRenderer;
  systemAvatarRender.setImage(systemAvatar);
  const system =
    appData.get(`${version}_system_show`) === "custom"
      ? {
          color: appData.get(`${version}_system_avatar_color`) as DefaultColor,
          title: appData.get(`${version}_system_name`) as string,
          avatar: systemAvatar
            ? ReactHtmlParser(systemAvatarRender.render())[0]
            : undefined,
          initials: appData.get(`${version}_system_initials`) as string,
          showTitle: appData.get(`${version}_system_show_title`) as boolean,
        }
      : undefined;

  const fontbase = parseFloat(appData.get(`${version}_fontbase`) as string);

  const header = {
    inverted: !!appData.get(`${version}_color_header_inverted`) as boolean,
    color: appData.get(`${version}_color_header`) as string,
    background: {
      light: properties.get(
        appData.get(`${version}_color_header_background_light`),
        "htmlHexValue"
      ) as string,
      dark: properties.get(
        appData.get(`${version}_color_header_background_dark`),
        "htmlHexValue"
      ) as string,
    },
    contentbg: {
      light: properties.get(
        appData.get(`${version}_color_header_contentbg_light`),
        "htmlHexValue"
      ) as string,
      dark: properties.get(
        appData.get(`${version}_color_header_contentbg_dark`),
        "htmlHexValue"
      ) as string,
    },
    surface: {
      primary: {
        light: properties.get(
          appData.get(`${version}_color_header_surface_primary_light`),
          "htmlHexValue"
        ) as string,
        dark: properties.get(
          appData.get(`${version}_color_header_surface_primary_dark`),
          "htmlHexValue"
        ) as string,
      },
      hover: {
        light: properties.get(
          appData.get(`${version}_color_header_surface_primary_light`),
          "htmlHexValue"
        ) as string,
        dark: properties.get(
          appData.get(`${version}_color_header_surface_primary_dark`),
          "htmlHexValue"
        ) as string,
      },
      disabled: {
        light: properties.get(
          appData.get(`${version}_color_header_surface_primary_light`),
          "htmlHexValue"
        ) as string,
        dark: properties.get(
          appData.get(`${version}_color_header_surface_primary_dark`),
          "htmlHexValue"
        ) as string,
      },
    },
    text: {
      light: {
        primary: {
          light: properties.get(
            appData.get(`${version}_color_header_text_primary_light`),
            "htmlHexValue"
          ) as string,
          dark: properties.get(
            appData.get(`${version}_color_header_text_primary_dark`),
            "htmlHexValue"
          ) as string,
        },
        secondary: {
          light: properties.get(
            appData.get(`${version}_color_header_text_secondary_light`),
            "htmlHexValue"
          ) as string,
          dark: properties.get(
            appData.get(`${version}_color_header_text_secondary_dark`),
            "htmlHexValue"
          ) as string,
        },
        link: {
          light: properties.get(
            appData.get(`${version}_color_header_text_link_light`),
            "htmlHexValue"
          ) as string,
          dark: properties.get(
            appData.get(`${version}_color_header_text_link_dark`),
            "htmlHexValue"
          ) as string,
        },
        "link-hover": {
          light: properties.get(
            appData.get(`${version}_color_header_text_link_hover_light`),
            "htmlHexValue"
          ) as string,
          dark: properties.get(
            appData.get(`${version}_color_header_text_link_hover_dark`),
            "htmlHexValue"
          ) as string,
        },
      },
      dark: {
        primary: {
          light: properties.get(
            appData.get(`${version}_color_header_text_dark_primary_light`),
            "htmlHexValue"
          ) as string,
          dark: properties.get(
            appData.get(`${version}_color_header_text_dark_primary_dark`),
            "htmlHexValue"
          ) as string,
        },
        secondary: {
          light: properties.get(
            appData.get(`${version}_color_header_text_dark_secondary_light`),
            "htmlHexValue"
          ) as string,
          dark: properties.get(
            appData.get(`${version}_color_header_text_dark_secondary_dark`),
            "htmlHexValue"
          ) as string,
        },
        link: {
          light: properties.get(
            appData.get(`${version}_color_header_text_dark_link_light`),
            "htmlHexValue"
          ) as string,
          dark: properties.get(
            appData.get(`${version}_color_header_text_dark_link_dark`),
            "htmlHexValue"
          ) as string,
        },
        "link-hover": {
          light: properties.get(
            appData.get(`${version}_color_header_text_dark_link_hover_light`),
            "htmlHexValue"
          ) as string,
          dark: properties.get(
            appData.get(`${version}_color_header_text_dark_link_hover_dark`),
            "htmlHexValue"
          ) as string,
        },
      },
    },
  };

  const bubble = {
    simple: appData.get(`${version}_use_simple_bubbles`) as boolean,
    shadow: appData.get(`${version}_use_bubble_shadow`) as boolean,
    borders: appData.get(`${version}_use_bubble_borders`) as boolean,
    icon: appData.get(`${version}_use_bubble_icon`) as boolean,
    inverted: appData.get(`${version}_color_bubble_inverted`) as boolean,
    color: appData.get(`${version}_color_bubble`) as string,
    surface: {
      light: properties.get(
        appData.get(`${version}_color_bubble_surface_light`),
        "htmlHexValue"
      ) as string,
      dark: properties.get(
        appData.get(`${version}_color_bubble_surface_dark`),
        "htmlHexValue"
      ) as string,
    },
    "surface-hover": {
      light: properties.get(
        appData.get(`${version}_color_bubble_surface_hover_light`),
        "htmlHexValue"
      ) as string,
      dark: properties.get(
        appData.get(`${version}_color_bubble_surface_hover_dark`),
        "htmlHexValue"
      ) as string,
    },
    text: {
      light: properties.get(
        appData.get(`${version}_color_bubble_text_light`),
        "htmlHexValue"
      ) as string,
      dark: properties.get(
        appData.get(`${version}_color_bubble_text_dark`),
        "htmlHexValue"
      ) as string,
    },
  };

  const rounded = {
    use: appData.get(`${version}_use_custom_border_radius`) as boolean,
    main: `${appData.get(`${version}_border_radius_main_value`)}${appData.get(
      `${version}_border_radius_main_unit`
    )}`,
    input: `${appData.get(`${version}_border_radius_input_value`)}${appData.get(
      `${version}_border_radius_input_unit`
    )}`,
    button: `${appData.get(
      `${version}_border_radius_button_value`
    )}${appData.get(`${version}_border_radius_button_unit`)}`,
  };

  const readmore = {
    text: appData.get(`${version}_read_more_text`) as string,
    link: {
      text: appData.get(`${version}_read_more_link_text`) as string,
      url: appData.get(`${version}_read_more_link_url`) as string,
    },
  };

  const border = {
    use: appData.get(`${version}_use_custom_borders`) as boolean,
    thickness: `${appData.get(
      `${version}_border_thickness_value`
    )}${appData.get(`${version}_border_thickness_unit`)}`,
    color: properties.get(
      appData.get(`${version}_border_color`),
      "htmlHexValue"
    ) as string,
  };

  const options = {
    fontface: {
      DEFAULT:
        appData.get(`${version}_font_default`) === "theme"
          ? "var(--env-font-family)"
          : (appData.get(`${version}_font_default_value`) as string),
      header:
        appData.get(`${version}_font_header`) === "theme"
          ? "var(--env-font-family)"
          : (appData.get(`${version}_font_header_value`) as string),
    },
    questions,
    questionsTitle,
    mobileBreakpoint,
    colors: { header, bubble },
    assistant: assistantOptions,
    user,
    system,
    title: appData.get(`${version}_title`) as string,
    subtitle: appData.get(`${version}_subtitle`) as string,
    label: appData.get(`${version}_label`) as string,
    fontbase,
    variant: appData.get(`${version}_variant`) as string,
    readmore,
    rounded,
    icon: icon ? icon?.props?.src : undefined,
    border,
    css: appData.get(`${version}_css`) as string,
  };

  const viewMode = versionUtil.getCurrentVersion();
  const isEditing = viewMode === versionUtil.OFFLINE_VERSION;

  const shadowdom = appData.get(`${version}_shadowdom`) as boolean;

  const useUser = appData.get(`${version}_use_user`) as boolean;
  const currentUser = portletContextUtil.getCurrentUser();

  const username = useUser
    ? (properties.get(currentUser, "name") as string) || ""
    : "";

  const assistantId = appData.get(`${version}_assistantId`) as string;
  const app = appData.get(`${version}_app`) as string;
  const stream = appData.get(`${version}_stream`) as boolean;
  const hash = getHash(username, assistantId, app, salt);

  const apiBaseUrl = appData.get(`${version}_server_url`) as string;
  const settings = {
    user: username,
    assistantId,
    app,
    hash,
  };

  res.agnosticRender(
    renderToString(<ServerSideApp assistant={assistant} options={options} />),
    {
      assistant,
      settings,
      shadowdom,
      isEditing,
      options,
      stream,
      apiBaseUrl,
    }
  );
});
