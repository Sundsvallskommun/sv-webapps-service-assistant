import { ColorSchemeMode } from "@sk-web-gui/react";

export interface Options {
  colorscheme: ColorSchemeMode;
  variant: "primary" | "secondary";
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
    color?: string;
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
  appSessionId?: string;
  rememberSession?: boolean;

  user: User;
  system?: User;
}

interface User {
  color: string;
  title: string;
  avatar?: string | React.ReactElement;
  initials: string;
  showTitle: boolean;
}
