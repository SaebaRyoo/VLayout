import React from 'react';
import { MaterialProps } from '../../index';

export function Button({ schema, ...rest }: MaterialProps) {
  const { propValue, style } = schema;
  return (
    <button {...rest} style={style}>
      {propValue || '按钮'}
    </button>
  );
}
