/* tslint:disable */
/* eslint-disable */

import React, { CSSProperties, DOMAttributes, FunctionComponent } from 'react';
import IconBack from './IconBack';
import IconAdd from './IconAdd';

export type IconNames = 'back' | 'add';

interface Props extends DOMAttributes<SVGElement> {
  name: IconNames;
  size?: number;
  color?: string | string[];
  style?: CSSProperties;
  className?: string;
}

const IconFont: FunctionComponent<Props> = ({ name, ...rest }) => {
  switch (name) {
    case 'back':
      return <IconBack {...rest} />;
    case 'add':
      return <IconAdd {...rest} />;

  }

  return null;
};

export default IconFont;
