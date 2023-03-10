import React, { Suspense } from 'react';

// 懒加载
const ComponentMap = {
  Button: React.lazy(() => import('./custom-components/Button/index')),
  Text: React.lazy(() => import('./custom-components/Text/index')),
  Image: React.lazy(() => import('./custom-components/Image/index')),
};

export type Schema = {
  id: string;
  type: string;
  propValue: any;
  animations: any[];
  events: {
    [key in string]: string;
  };
  style: {
    [key in string]: string | number;
  };
};

export type MaterialProps = {
  [key in string]: any;
};
const Material: React.FC<MaterialProps> = (props) => {
  const { schema } = props;
  const Comp = ComponentMap[schema.type];
  if (!Comp) {
    return null;
  }
  return (
    <Suspense fallback={<div>Component `{schema.type}` is loading!</div>}>
      <Comp {...props} />
    </Suspense>
  );
};

export default Material;
