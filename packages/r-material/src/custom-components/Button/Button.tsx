import React from 'react';
import { MaterialProps } from '../..';

export function Button({ schema }: MaterialProps) {
  const { propValue, style } = schema;
  return <button style={style}>{propValue || '按钮'}</button>;
}
