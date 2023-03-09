import React from 'react';
import { MaterialProps } from '../../index';
import './Text.less';

export function Text({ schema, ...rest }: MaterialProps) {
  const { propValue, style } = schema;
  return (
    <div className="r-material-Text" {...rest} style={style || {}}>
      {propValue}
    </div>
  );
}
