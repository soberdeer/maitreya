import * as icons from '@src/components/icons';
import { DefaultType } from '@src/components/icons/default-type';

export type RawLinkType = {
  icon: string;
  href: string;
  children: string;
};

const technics: RawLinkType = {
  href: '/technics',
  children: 'Техники',
  icon: 'AnalyzeIcon',
};

export const mapLinks = (dynamicPages: RawLinkType[]) =>
  [...(dynamicPages || []), technics].map(({ href, children, icon: iconString }) => {
    const icon = Object.keys(icons).includes(iconString)
      ? icons[iconString as keyof typeof icons]
      : undefined;
    return {
      link: href,
      label: children,
      icon: icon ? (icon as (props: DefaultType) => JSX.Element) : undefined,
    };
  });
