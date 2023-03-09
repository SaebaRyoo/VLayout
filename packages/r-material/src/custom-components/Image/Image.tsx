import React from 'react';
import { MaterialProps } from '../../index';

export function Image({ schema, ...rest }: MaterialProps) {
  const { propValue, style } = schema;
  return <img src={propValue} {...rest} style={style || {}} />;
}
