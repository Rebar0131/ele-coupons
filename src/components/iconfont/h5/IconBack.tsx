/* tslint:disable */
/* eslint-disable */

import React, { CSSProperties, DOMAttributes, FunctionComponent } from 'react';
import { getIconColor } from './helper';

interface Props extends DOMAttributes<SVGElement> {
  size?: number;
  color?: string | string[];
  style?: CSSProperties;
  className?: string;
}

const DEFAULT_STYLE: CSSProperties = {
  display: 'block',
};

const IconBack: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M698.181818 828.509091L390.981818 512 698.181818 195.490909c18.618182-18.618182 18.618182-48.872727 0-65.163636-18.618182-18.618182-48.872727-16.290909-65.163636 0l-337.454546 349.090909c-18.618182 18.618182-18.618182 46.545455 0 65.163636l339.781819 349.090909c9.309091 9.309091 20.945455 13.963636 32.581818 13.963637 11.636364 0 23.272727-4.654545 32.581818-13.963637 16.290909-16.290909 16.290909-46.545455-2.327273-65.163636z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

IconBack.defaultProps = {
  size: 18,
};

export default IconBack;
