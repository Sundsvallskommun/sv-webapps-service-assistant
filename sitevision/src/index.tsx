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
import globalAppData from "@sitevision/api/server/globalAppData";
import type { DefaultColor, Options } from "@shared";
import { getHeadingLevel, headingLevels } from "@shared";
import type { ColorSchemeMode } from "@sk-web-gui/react";
import {
  getResolvedAppDataBoolean,
  getResolvedAppDataNode,
  getResolvedAppDataValue,
} from "./utils/appDataResolver";

const defaultColors = [
  "vattjom",
  "juniskar",
  "bjornstigen",
  "gronsta",
] as const;
const defaultAssistantColor: DefaultColor = "vattjom";
const defaultUserColor: DefaultColor = "bjornstigen";
const defaultSystemColor: DefaultColor = "vattjom";
const defaultUserTitle = "Du";
const defaultUserInitials = "DU";
const defaultSystemTitle = "Felmeddelande";
const defaultSystemInitials = "AI";

router.get("/", (_req, res) => {
  const salt = globalAppData.get("salt") as string;
  const version = appData.get("version") as string;
  const version2 = globalAppData.get("version2") as boolean;

  const resolvedAssistantId = getResolvedAppDataValue("assistantId") || "";
  const resolvedGroupChat = getResolvedAppDataBoolean("is_group_chat") || false;
  const resolvedApp = getResolvedAppDataValue("app") || "";
  const resolvedRememberSession =
    getResolvedAppDataBoolean("remember_session") || false;
  const resolvedShowReferences = getResolvedAppDataBoolean("show_references");
  const resolvedAppSessionId =
    getResolvedAppDataValue("app_session_id") || "default";

  const resolvedAssistantName = getResolvedAppDataValue("assistant_name");
  const resolvedAssistantShortName = getResolvedAppDataValue(
    "assistant_shortName"
  );
  const resolvedAssistantAvatar = getResolvedAppDataNode("assistant_avatar");
  const resolvedAssistantAvatarColor = getResolvedAppDataValue(
    "assistant_avatar_color",
    { allowedValues: defaultColors }
  ) as DefaultColor | undefined;
  const resolvedAssistantShowTitle =
    getResolvedAppDataBoolean("assistant_show_title") || false;

  const resolvedUserName = getResolvedAppDataValue("user_name");
  const resolvedUserInitials = getResolvedAppDataValue("user_initials");
  const resolvedUserAvatar = getResolvedAppDataNode("user_avatar");
  const resolvedUserAvatarColor = getResolvedAppDataValue("user_avatar_color", {
    allowedValues: defaultColors,
  }) as DefaultColor | undefined;
  const resolvedUserShowTitle =
    getResolvedAppDataBoolean("user_show_title") || false;

  const resolvedSystemName = getResolvedAppDataValue("system_name");
  const resolvedSystemInitials = getResolvedAppDataValue("system_initials");
  const resolvedSystemAvatar = getResolvedAppDataNode("system_avatar");
  const resolvedSystemAvatarColor = getResolvedAppDataValue(
    "system_avatar_color",
    { allowedValues: defaultColors }
  ) as DefaultColor | undefined;
  const resolvedSystemShowTitle =
    getResolvedAppDataBoolean("system_show_title") || false;

  const resolvedUseQuestions =
    getResolvedAppDataBoolean("use_questions") || false;
  const resolvedQuestionsTitle = getResolvedAppDataValue("questions_title");
  const resolvedTitle = getResolvedAppDataValue("title");
  const resolvedSubtitle = getResolvedAppDataValue("subtitle");
  const resolvedLabel = getResolvedAppDataValue("label");
  const resolvedReadMoreText = getResolvedAppDataValue("read_more_text");
  const resolvedReadMoreLinkText = getResolvedAppDataValue(
    "read_more_link_text"
  );
  const resolvedReadMoreLinkUrl = getResolvedAppDataValue("read_more_link_url");

  const assistantAvatarRenderer = imageRenderer;
  if (resolvedAssistantAvatar) {
    assistantAvatarRenderer.setImage(resolvedAssistantAvatar);
  }

  const assistant: AssistantInfo = {
    name: resolvedAssistantName || "",
    shortName: resolvedAssistantShortName || "",
    avatar: resolvedAssistantAvatar
      ? ReactHtmlParser(assistantAvatarRenderer.render())[0]
      : undefined,
  };

  const numberOfQuestions = parseInt(appData.get("questions_count") as string);
  const questions = resolvedUseQuestions
    ? [
        getResolvedAppDataValue("question_1"),
        getResolvedAppDataValue("question_2"),
        getResolvedAppDataValue("question_3"),
        getResolvedAppDataValue("question_4"),
        getResolvedAppDataValue("question_5"),
      ]
        .slice(0, numberOfQuestions)
        .filter((quest): quest is string => Boolean(quest))
    : undefined;
  const questionsTitle = resolvedUseQuestions
    ? resolvedQuestionsTitle
    : undefined;

  const mobileBreakpoint = `${globalAppData.get(
    "mobile_breakpoint"
  )}${globalAppData.get("mobile_breakpoint_unit")}`;

  const assistantOptions = {
    color: resolvedAssistantAvatarColor || defaultAssistantColor,
    showTitle: resolvedAssistantShowTitle,
  };

  const mainIcon = globalAppData.getNode(`${version}_header_icon`);
  const mainIconRenderer = imageRenderer;
  mainIconRenderer.setImage(mainIcon);
  const icon = ReactHtmlParser(mainIconRenderer.render())[0];

  const userAvatarRenderer = imageRenderer;
  if (resolvedUserAvatar) {
    userAvatarRenderer.setImage(resolvedUserAvatar);
  }
  const user = {
    color: resolvedUserAvatarColor || (defaultUserColor as DefaultColor),
    title: resolvedUserName || defaultUserTitle,
    avatar: resolvedUserAvatar
      ? ReactHtmlParser(userAvatarRenderer.render())[0]
      : undefined,
    initials: resolvedUserInitials || defaultUserInitials,
    showTitle: resolvedUserShowTitle,
  };

  const systemAvatarRenderer = imageRenderer;
  if (resolvedSystemAvatar) {
    systemAvatarRenderer.setImage(resolvedSystemAvatar);
  }
  const system =
    appData.get("system_show") === "custom"
      ? {
          color: resolvedSystemAvatarColor || defaultSystemColor,
          title: resolvedSystemName || defaultSystemTitle,
          avatar: resolvedSystemAvatar
            ? ReactHtmlParser(systemAvatarRenderer.render())[0]
            : undefined,
          initials: resolvedSystemInitials || defaultSystemInitials,
          showTitle: resolvedSystemShowTitle,
        }
      : undefined;

  const fontbase = parseFloat(globalAppData.get("fontbase") as string);

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
    text: resolvedReadMoreText,
    link:
      resolvedReadMoreLinkText && resolvedReadMoreLinkUrl
        ? {
            text: resolvedReadMoreLinkText,
            url: resolvedReadMoreLinkUrl,
          }
        : undefined,
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
        globalAppData.get("font_default") === "theme"
          ? "var(--env-font-family)"
          : (globalAppData.get("font_default_value") as string),
      header:
        globalAppData.get("font_header") === "theme"
          ? "var(--env-font-family)"
          : (globalAppData.get("font_header_value") as string),
    },
    questions,
    questionsTitle,
    mobileBreakpoint,
    colors: { header, bubble },
    assistant: assistantOptions,
    user,
    system,
    colorscheme: globalAppData.get("colorscheme") as ColorSchemeMode,
    title: resolvedTitle,
    headingLevel: getHeadingLevel(
      getResolvedAppDataValue("heading_level", { allowedValues: headingLevels })
    ),
    subtitle: resolvedSubtitle,
    label: resolvedLabel,
    fontbase,
    variant: globalAppData.get(`${version}_variant`) as Options["variant"],
    readmore,
    showReferences: resolvedShowReferences ?? true,
    rounded,
    icon: icon ? icon?.props?.src : undefined,
    border,
    css: globalAppData.get(`${version}_css`) as string,
    rememberSession: resolvedRememberSession,
    appSessionId: resolvedAppSessionId,
  };

  const viewMode = versionUtil.getCurrentVersion();
  const isEditing = viewMode === versionUtil.OFFLINE_VERSION;

  const shadowdom = globalAppData.get("shadowdom") as boolean;

  const useUser = appData.get("use_user") as boolean;
  const currentUser = portletContextUtil.getCurrentUser();

  const username = useUser
    ? (properties.get(currentUser, "name") as string) || ""
    : "";

  const stream = globalAppData.get("stream") as boolean;
  const hash = getHash(username, resolvedAssistantId, resolvedApp, salt);

  const apiBaseUrl = globalAppData.get("server_url") as string;
  const settings: AssistantSettings = {
    user: username,
    assistantId: resolvedAssistantId,
    is_group_chat: resolvedGroupChat,
    app: resolvedApp,
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
      version2,
    }
  );
});
