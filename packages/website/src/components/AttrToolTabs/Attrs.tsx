import React, { memo } from 'react';
import { Form, Input, InputNumber, Select } from 'antd';
import { styleMap, optionMap } from '@/utils/attr';
import { useAppDispatch } from '../../hooks/typedHooks';
import { updateSchemaByProp } from '../Editor/editor.slice';

type AttrsProps = {
  style?: any;
  id?: string;
};

const Attrs: React.FC<AttrsProps> = ({ style, id }) => {
  const dispatch = useAppDispatch();

  const handleChange = (styleProps: string, value: number | string) => {
    if (styleProps === 'rotate') {
      styleProps = 'transform';
      value = `rotate(${value}deg)`;
    }
    dispatch(updateSchemaByProp({ styleProps, value, id: id as string }));
  };

  const renderComp = (style: any, styleProp: string, type: string) => {
    const value = style[styleProp];
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
      {renderFormItem()}
    </Form>
  );
};

function areEqual(prevProps: AttrsProps, nextProps: AttrsProps) {
  if (JSON.stringify(prevProps.style) === JSON.stringify(nextProps.style)) {
    return true;
  }
  return false;
}
export default memo(Attrs, areEqual);
