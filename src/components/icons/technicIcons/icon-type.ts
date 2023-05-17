import { SVGProps } from 'react';

export interface IconType extends SVGProps<SVGSVGElement> {
  size?: number;
  tooltip?: string;
}
