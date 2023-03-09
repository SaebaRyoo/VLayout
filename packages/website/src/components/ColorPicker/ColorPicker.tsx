import React, { useCallback, useRef, useState } from 'react';
import { HexColorPicker, HexColorInput } from 'react-colorful';
import useClickOutside from '@/src/hooks/useClickOutside';
import './ColorPicker.less';

export const ColorPicker = ({ color, onChange }: any) => {
  const popover = useRef<any>();
  const [isOpen, toggle] = useState(false);

  const close = useCallback(() => toggle(false), []);
  useClickOutside(popover, close);

  return (
    <div className="comps-colorpicker-picker">
      <div
        className="comps-colorpicker-swatch"
        style={{ backgroundColor: color }}
        onClick={() => toggle(true)}
      />

      {isOpen && (
        <div className="comps-colorpicker-popover" ref={popover}>
          <HexColorPicker color={color} onChange={onChange} />
          <HexColorInput color={color} onChange={onChange} />
        </div>
      )}
    </div>
  );
};
