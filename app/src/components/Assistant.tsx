import { AIServiceModule, useAssistantStore, useChat } from "@sk-web-gui/ai";
import { Avatar } from "@sk-web-gui/react";
import HtmlParser from "react-html-parser";
import { useMediaQuery } from "usehooks-ts";
import { useAppSessions } from "../services/useAppSessions";
import React, { useEffect } from "react";
import type { Options } from "@shared";
import {
  getHeadingLevel,
  getQuestionsHeadingLevel,
  headingParserOptions,
} from "@shared";

export const Assistant = () => {
  const options = useAssistantStore(
    (state) => state.options,
  ) as unknown as Options;
  const settings = useAssistantStore((state) => state.settings);
  const Heading = getHeadingLevel(options?.headingLevel);
  const QuestionsHeading = getQuestionsHeadingLevel(options?.headingLevel);
  const questionsTitle = options?.questionsTitle ?? "Vanliga frågor";
  const isMobile = useMediaQuery(
    `screen and (max-width: ${options?.mobileBreakpoint || "1023px"})`,
  );

  const rememberSession = options?.rememberSession || false;
  const appSessionId =
    settings.app +
    (rememberSession ? options?.appSessionId || "default" : "__dont_remember");

  const { sessionId, setSessionId } = useAppSessions(appSessionId);
  const { session, sendQuery, newSession } = useChat({ sessionId });

  useEffect(() => {
    if (!rememberSession) {
      setSessionId("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (session?.id && session.id !== sessionId) {
      setSessionId(session.id);
    }
  }, [session?.id]);

  const props: React.ComponentPropsWithoutRef<
    typeof AIServiceModule.Component
  > = {
    isMobile,
    questionsTitle: questionsTitle ? (
      <QuestionsHeading>{questionsTitle}</QuestionsHeading>
    ) : questionsTitle,
    questions: options?.questions,
    inverted:
      options?.variant === "secondary"
        ? !options?.colors?.header?.inverted
        : options?.colors?.header?.inverted,
    variant: options?.variant,
    header: (
      <Heading>
        {options?.title
          ? HtmlParser(options.title, headingParserOptions)
          : "Hej, vad vill du ha hjälp med?"}
      </Heading>
    ),
    children: options?.subtitle ? HtmlParser(options.subtitle) : undefined,
    label: options?.label,
    readmore: options?.readmore?.link?.url ? options.readmore : undefined,
    showReferences: options?.showReferences ?? true,
    headerIcon: options?.icon ? (
      <Avatar size="md" className="w-40 h-40" imageUrl={options.icon} />
    ) : undefined,
    session,
    onSendQuery: sendQuery,
    onNewSession: newSession,
    inlineReferenceMode: "inline",
  };

  return <AIServiceModule {...props} />;
};
