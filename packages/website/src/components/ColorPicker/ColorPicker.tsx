import React, { useCallback, useRef, useState } from 'react';
import { HexColorPicker, HexColorInput } from 'react-colorful';
import useClickOutside from '@/src/hooks/useClickOutside';
import './ColorPicker.less';

interface ColorPickerProps {
  color: string;
  onChange: (v: string) => void;
}
export const ColorPicker = ({ color, onChange }: ColorPickerProps) => {
  const popover = useRef(null);
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
