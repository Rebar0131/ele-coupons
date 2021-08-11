/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';

import Icon from './h5';

export type IconNames = 'back' | 'add';

interface Props {
  name: IconNames;
  size?: number;
  color?: string | string[];
  style?: React.CSSProperties;
}

const IconFont: FunctionComponent<Props> = (props) => {
  const { name, size, color, style } = props;

  return <Icon name={name} size={size} color={color} style={style} />;
};

IconFont.defaultProps = {
  size: 18,
};

export default IconFont;
