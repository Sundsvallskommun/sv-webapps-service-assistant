import { AIServiceModule, useAssistantStore } from "@sk-web-gui/ai";
import { Avatar } from "@sk-web-gui/react";

export const Assistant = () => {
  const options = useAssistantStore((state) => state.options);

  const props: React.ComponentPropsWithoutRef<
    typeof AIServiceModule.Component
  > = {
    questionsTitle: options?.questionsTitle,
    questions: options?.questions,
    inverted:
      options?.variant === "secondary"
        ? !options?.colors?.header?.inverted
        : options?.colors?.header?.inverted,
    variant: options?.variant,
    title: options?.title,
    children: options?.subtitle,
    label: options?.label,
    readmore: options?.readmore,
    headerIcon: options?.icon ? (
      <Avatar size="md" className="w-40 h-40" imageUrl={options.icon} />
    ) : undefined,
  };

  return <AIServiceModule {...props} />;
};
