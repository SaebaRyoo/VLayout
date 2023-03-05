import React, { Suspense } from 'react';

// 懒加载
const ComponentMap = {
  Button: React.lazy(() => import('./custom-components/Button/index')),
  Text: React.lazy(() => import('./custom-components/Text/index')),
};

export type Schema = {
  id: string;
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
