import React from 'react';
import { Button } from './custom-components/Button';
import { Text } from './custom-components/Text';

const ComponentMap = {
  Button: Button,
  Text: Text,
};

export type Schema = {
  type: string;
  propValue: any;
  animations: any[];
  events: {
    [key in string]: any;
  };
  style: {
    [key in string]: any;
  };
};

export type MaterialProps = {
  schema?: Schema;
};
const Material: React.FC<MaterialProps> = (props) => {
  const { schema } = props;
  const Comp = ComponentMap[schema.type];
  if (!Comp) {
    return null;
  }
  return <Comp {...props} />;
};

export default Material;
