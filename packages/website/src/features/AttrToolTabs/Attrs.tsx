import React, { memo } from 'react';
import { Form, Input, InputNumber, Select } from 'antd';
import { styleMap, optionMap } from '@/utils/attr';
import { useAppDispatch } from '../../hooks/typedHooks';
import { updatePropValue, updateSchemaByProp } from '../Editor/editor.slice';
import ColorPicker from '@/src/components/ColorPicker';
import type { Schema } from '@lxnxbnq/r-material';

type AttrsProps = {
  style?: Schema['style'];
  id?: string;
  propValue: any;
};

const Attrs: React.FC<AttrsProps> = ({ style, id, propValue }) => {
  const dispatch = useAppDispatch();

  const handleChange = (styleProps: string, value: number | string) => {
    if (styleProps === 'rotate') {
      styleProps = 'transform';
      value = `rotate(${value}deg)`;
    }
    dispatch(updateSchemaByProp({ styleProps, value, id: id as string }));
  };

  const renderComp = (
    style: Schema['style'] | undefined,
    styleProp: string,
    type: string
  ) => {
    const value = style ? style[styleProp] : null;
    if (type === 'number') {
      return (
        <InputNumber
          value={value}
          onChange={(value) => handleChange(styleProp, value)}
        />
      );
    }

    if (type === 'text') {
      return (
        <Input
          value={value}
          onChange={(e) => handleChange(styleProp, e.target.value)}
        />
      );
    }
    if (type === 'select') {
      return (
        <Select
          value={value}
          onChange={(value) => handleChange(styleProp, value)}
          options={optionMap[styleProp]}
        />
      );
    }

    if (type === 'color') {
      return (
        <ColorPicker
          color={value}
          onChange={(value: string) => handleChange(styleProp, value)}
        />
      );
    }
    return null;
  };

  const renderFormItem = () => {
    return Object.keys(styleMap).map((styleProp, index) => {
      const styleInfo = styleMap[styleProp];
      return (
        <Form.Item key={index} label={styleInfo.label}>
          {renderComp(style, styleProp, styleInfo.type)}
        </Form.Item>
      );
    });
  };

  return (
    <Form labelCol={{ span: 8 }} wrapperCol={{ span: 12 }} autoComplete="off">
      <Form.Item label="默认内容">
        <Input
          value={propValue}
          onChange={(e) => dispatch(updatePropValue(e.target.value))}
        />
      </Form.Item>
      {renderFormItem()}
    </Form>
  );
};

function areEqual(prevProps: AttrsProps, nextProps: AttrsProps) {
  if (
    JSON.stringify(prevProps.style) === JSON.stringify(nextProps.style) &&
    prevProps.propValue === nextProps.propValue
  ) {
    return true;
  }
  return false;
}
export default memo(Attrs, areEqual);
