import * as icons from '@tabler/icons-react';
import { Icon, TablerIconsProps } from '@tabler/icons-react';

export type RawLinkType = {
  icon: string;
  href: string;
  children: string;
};

const technics: RawLinkType = {
  href: '/technics',
  children: 'Техники',
  icon: 'IconAnalyze',
};

export const mapLinks = (dynamicPages: RawLinkType[]) => {
  return [...(dynamicPages || []), technics].map(({ href, children, icon: iconString }) => {
    const icon = Object.keys(icons).includes(iconString)
      ? icons[iconString as keyof typeof icons]
      : undefined;
    return {
      link: href,
      label: children,
      icon: icon ? (icon as (props: TablerIconsProps) => JSX.Element) : undefined,
    };
  });
};
