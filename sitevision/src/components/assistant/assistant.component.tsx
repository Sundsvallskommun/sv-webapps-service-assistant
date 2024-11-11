import type { AssistantInfo, AssistantSettings } from "@sk-web-gui/ai";
import { setAssistantStoreName, useAssistantStore } from "@sk-web-gui/ai";
import * as React from "react";
import type { Options } from "../assistant-dummie/assistant-dummie.component";

export interface AssistantProps {
  assistant: AssistantInfo;
  settings: AssistantSettings;
  options: Options;
  apiBaseUrl: string;
  stream: boolean;
  shadowdom?: boolean;
}

export const Assistant: React.FunctionComponent<AssistantProps> = ({
  assistant,
  settings,
  options,
  apiBaseUrl,
  stream,
  shadowdom = true,
}) => {
  const [
    oldInfo,
    setInfo,
    oldSettings,
    setSettings,
    setOptions,
    setApiBaseUrl,
    setStream,
  ] = useAssistantStore((state) => [
    state.info,
    state.setInfo,
    state.settings,
    state.setSettings,
    state.setOptions,
    state.setApiBaseUrl,
    state.setStream,
  ]);

  React.useEffect(() => {
    require("../../resources/assistant-service");
    setAssistantStoreName(settings.hash);
  }, []);

  React.useEffect(() => {
    const info: AssistantInfo = {
      ...oldInfo,
      ...assistant,
    };
    setInfo(info);
  }, [assistant, setInfo, oldInfo]);

  React.useEffect(() => {
    if (settings) {
      const newSettings: AssistantSettings = {
        ...oldSettings,
        ...settings,
      };
      setSettings(newSettings);
    }
  }, [settings, setSettings, oldSettings]);

  React.useEffect(() => {
    if (options) {
      setOptions(options);
    }
  }, [options, setOptions]);

  React.useEffect(() => {
    if (stream) {
      setStream(stream);
    }
  }, [stream, setStream]);

  React.useEffect(() => {
    if (apiBaseUrl) {
      setApiBaseUrl(apiBaseUrl);
    }
  }, [apiBaseUrl, setApiBaseUrl]);

  return (
    <div>
      <div
        className="sk-service-assistant"
        id={settings.hash}
        data-shadow={shadowdom}
      />
    </div>
  );
};
