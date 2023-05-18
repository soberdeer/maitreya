import { SVGProps } from 'react';

export interface DefaultType extends SVGProps<SVGSVGElement> {
  size?: number;
  tooltip?: string;
  color?: string;
  className?: string;
}
