import React from 'react';
import { MaterialProps } from '../../index';

export function Button({ schema, isEdit, ...rest }: MaterialProps) {
  const { propValue, style, events } = schema;

  const handleEvents = {};
  if (!isEdit) {
    Object.keys(events).forEach(
      (event) => (handleEvents[event] = new Function(events[event]))
    );
  }
  return (
    <button {...handleEvents} {...rest} style={style}>
      {propValue || '按钮'}
    </button>
  );
}
