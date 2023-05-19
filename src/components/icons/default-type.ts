import { SVGProps } from 'react';

export interface DefaultType extends SVGProps<SVGSVGElement> {
  size?: number | string;
  tooltip?: string;
  color?: string;
  className?: string;
}
