import * as React from 'react';
import template from '@lxnxbnq/r-material/dist/template';
import schema from '@lxnxbnq/r-material/dist/schema';
import './TemplatesList.less';
import { useDrag } from 'react-dnd';

import { ItemTypes } from '@/utils/DragTypes';

type TemplateProps = {
  type: string;
  displayName: string;
};

// keyof schema

const Box: React.FC<{ tpl: TemplateProps }> = ({ tpl }) => {
  // 自定义组件库中默认的schmea
  const cSchema = schema[tpl.type as keyof typeof schema];
  const [, drag] = useDrag(() => ({
    type: ItemTypes.BOX,
    item: { cSchema },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));
  return (
    <div ref={drag}>
      <img src="" alt="" />
      <p>{tpl.displayName}</p>
    </div>
  );
};

const RightToolNav: React.FC = () => {
  return (
    <div className="comps-TemplatesList-wrapper">
      {template.map((tpl: TemplateProps) => (
        <Box key={tpl.type} tpl={tpl} />
      ))}
    </div>
  );
};

export default RightToolNav;
