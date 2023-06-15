import { SVGProps } from 'react';

export interface DefaultType extends Omit<SVGProps<SVGSVGElement>, 'rotate'> {
  size?: number | string;
  tooltip?: string;
  color?: string;
  className?: string;
}
