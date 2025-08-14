import router from "@sitevision/api/common/router";
import appData from "@sitevision/api/server/appData";
import imageRenderer from "@sitevision/api/server/ImageRenderer";
import portletContextUtil from "@sitevision/api/server/PortletContextUtil";
import properties from "@sitevision/api/server/Properties";
import versionUtil from "@sitevision/api/server/VersionUtil";
import type { AssistantInfo, AssistantSettings } from "@sk-web-gui/ai";
import * as React from "react";
import { renderToString } from "react-dom/server";
import ReactHtmlParser from "react-html-parser";
import { ServerSideApp } from "./components/serverside-app/serverside-app.component";
import { getHash } from "./utils/hash.service";
import type { DefaultColor } from "./common/defaultColors";
import globalAppData from "@sitevision/api/server/globalAppData";
import type { Options } from "./types/options";

router.get("/", (req, res) => {
  const salt = globalAppData.get("salt") as string;
  const version = appData.get("version") as string;

  const avatar = appData.getNode(`assistant_avatar`);
  const avatarRender = imageRenderer;
  avatarRender.setImage(avatar);

  const assistant: AssistantInfo = {
    name: appData.get(`assistant_name`) as string,
    shortName: appData.get(`assistant_shortName`) as string,
    avatar: avatar ? ReactHtmlParser(avatarRender.render())[0] : undefined,
  };

  const useQuestions = appData.get(`use_questions`) as boolean;
  const numberOfQuestions = parseInt(appData.get(`questions_count`) as string);
  const questions = useQuestions
    ? [
        appData.get(`question_1`) as string,
        appData.get(`question_2`) as string,
        appData.get(`question_3`) as string,
        appData.get(`question_4`) as string,
        appData.get(`question_5`) as string,
      ]
        .slice(0, numberOfQuestions)
        .filter((quest) => !!quest)
    : undefined;
  const questionsTitle = useQuestions
    ? (appData.get(`questions_title`) as string)
    : undefined;

  const mobileBreakpoint = `${globalAppData.get(
    `mobile_breakpoint`
  )}${globalAppData.get(`mobile_breakpoint_unit`)}`;

  const assistantOptions = {
    color: appData.get(`assistant_avatar_color`) as DefaultColor,
    showTitle: appData.get(`$assistant_show_title`) as boolean,
  };

  const mainIcon = globalAppData.getNode(`${version}_header_icon`);
  const mainIconRenderer = imageRenderer;
  mainIconRenderer.setImage(mainIcon);
  const icon = ReactHtmlParser(mainIconRenderer.render())[0];

  const userAvatar = appData.getNode(`user_avatar`);
  const userAvatarRender = imageRenderer;
  userAvatarRender.setImage(userAvatar);

  const user = {
    color: appData.get(`user_avatar_color`) as DefaultColor,
    title: appData.get(`user_name`) as string,
    avatar: userAvatar
      ? ReactHtmlParser(userAvatarRender.render())[0]
      : undefined,
    initials: appData.get(`user_initials`) as string,
    showTitle: appData.get(`user_show_title`) as boolean,
  };

  const systemAvatar = appData.getNode(`system_avatar`);
  const systemAvatarRender = imageRenderer;
  systemAvatarRender.setImage(systemAvatar);
  const system =
    appData.get(`system_show`) === "custom"
      ? {
          color: appData.get(`system_avatar_color`) as DefaultColor,
          title: appData.get(`system_name`) as string,
          avatar: systemAvatar
            ? ReactHtmlParser(systemAvatarRender.render())[0]
            : undefined,
          initials: appData.get(`system_initials`) as string,
          showTitle: appData.get(`system_show_title`) as boolean,
        }
      : undefined;

  const fontbase = parseFloat(globalAppData.get(`fontbase`) as string);

  const header = {
    inverted: !!globalAppData.get(
      `${version}_color_header_inverted`
    ) as boolean,
    color: globalAppData.get(`${version}_color_header`) as string,
  };

  const bubble = {
    simple: globalAppData.get(`${version}_use_simple_bubbles`) as boolean,
    shadow: globalAppData.get(`${version}_use_bubble_shadow`) as boolean,
    borders: globalAppData.get(`${version}_use_bubble_borders`) as boolean,
    icon: globalAppData.get(`${version}_use_bubble_icon`) as boolean,
    inverted: globalAppData.get(`${version}_color_bubble_inverted`) as boolean,
    color: globalAppData.get(`${version}_color_bubble`) as string,
  };

  const rounded = {
    use: globalAppData.get(`${version}_use_custom_border_radius`) as boolean,
    main: `${globalAppData.get(
      `${version}_border_radius_main_value`
    )}${globalAppData.get(`${version}_border_radius_main_unit`)}`,
    input: `${globalAppData.get(
      `${version}_border_radius_input_value`
    )}${globalAppData.get(`${version}_border_radius_input_unit`)}`,
    button: `${globalAppData.get(
      `${version}_border_radius_button_value`
    )}${globalAppData.get(`${version}_border_radius_button_unit`)}`,
  };

  const readmore = {
    text: appData.get(`read_more_text`) as string,
    link: {
      text: appData.get(`read_more_link_text`) as string,
      url: appData.get(`read_more_link_url`) as string,
    },
  };

  const border = {
    use: globalAppData.get(`${version}_use_custom_borders`) as boolean,
    thickness: `${globalAppData.get(
      `${version}_border_thickness_value`
    )}${globalAppData.get(`${version}_border_thickness_unit`)}`,
    color: properties.get(
      globalAppData.get(`${version}_border_color`),
      "htmlHexValue"
    ) as string,
  };

  const options: Options = {
    fontface: {
      DEFAULT:
        globalAppData.get(`font_default`) === "theme"
          ? "var(--env-font-family)"
          : (globalAppData.get(`font_default_value`) as string),
      header:
        globalAppData.get(`font_header`) === "theme"
          ? "var(--env-font-family)"
          : (globalAppData.get(`font_header_value`) as string),
    },
    questions,
    questionsTitle,
    mobileBreakpoint,
    colors: { header, bubble },
    assistant: assistantOptions,
    user,
    system,
    colorscheme: globalAppData.get("colorscheme") as string,
    title: appData.get(`title`) as string,
    subtitle: appData.get(`subtitle`) as string,
    label: appData.get(`label`) as string,
    fontbase,
    variant: globalAppData.get(`${version}_variant`) as string,
    readmore,
    rounded,
    icon: icon ? icon?.props?.src : undefined,
    border,
    css: globalAppData.get(`${version}_css`) as string,
    rememberSession: (appData.get(`remember_session`) as boolean) ?? false,
    appSessionId: (appData.get(`app_session_id`) as string) || "default",
  };

  const viewMode = versionUtil.getCurrentVersion();
  const isEditing = viewMode === versionUtil.OFFLINE_VERSION;

  const shadowdom = globalAppData.get(`shadowdom`) as boolean;

  const useUser = appData.get(`use_user`) as boolean;
  const currentUser = portletContextUtil.getCurrentUser();

  const username = useUser
    ? (properties.get(currentUser, "name") as string) || ""
    : "";

  const assistantId = appData.get(`assistantId`) as string;
  const is_group_chat = appData.get(`is_group_chat`) as boolean;
  const app = appData.get(`app`) as string;
  const stream = globalAppData.get(`stream`) as boolean;
  const hash = getHash(username, assistantId, app, salt);

  const apiBaseUrl = globalAppData.get(`server_url`) as string;
  const settings: AssistantSettings = {
    user: username,
    assistantId,
    is_group_chat,
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
