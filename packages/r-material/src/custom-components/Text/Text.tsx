import React from 'react';
import { MaterialProps } from '../../index';

export function Text({ schema, ...rest }: MaterialProps) {
  const { propValue, style } = schema;
  return (
    <div {...rest} style={style || {}}>
      {propValue || '双击编辑'}
    </div>
  );
}
