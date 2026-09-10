import type { DefaultColor } from "./defaultColors";
import type { ColorSchemeMode } from "@sk-web-gui/react";
import type { AIServiceModule } from "@sk-web-gui/ai";
import type { HeadingLevel } from "../headings";

export interface Options {
  colorscheme: ColorSchemeMode;
  variant: React.ComponentPropsWithoutRef<
    typeof AIServiceModule.Component
  >["variant"];
  fontface: Record<string, string>;
  mobileBreakpoint?: string;
  colors: {
    header?: {
      inverted: boolean;
      color: string;
    };
    bubble?: {
      simple: boolean;
      borders: boolean;
      shadow: boolean;
      icon: boolean;
      color: string;
      inverted?: boolean;
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
  headingLevel?: HeadingLevel;
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
  showReferences?: boolean;
  icon?: string;
  css?: string;
  appSessionId?: string;
  rememberSession?: boolean;

  user: User;
  system?: User;
}

interface User {
  color: DefaultColor;
  title: string;
  avatar?: string | React.ReactElement;
  initials: string;
  showTitle: boolean;
}
