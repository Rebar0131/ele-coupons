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

const IconAdd: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M848 464h-288v-288c0-25.6-22.4-48-48-48s-48 22.4-48 48v288h-288c-25.6 0-48 22.4-48 48s22.4 48 48 48h288v288c0 25.6 22.4 48 48 48s48-22.4 48-48v-288h288c25.6 0 48-22.4 48-48s-22.4-48-48-48z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

IconAdd.defaultProps = {
  size: 18,
};

export default IconAdd;
