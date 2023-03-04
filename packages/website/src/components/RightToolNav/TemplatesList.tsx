import * as React from 'react';
import template from 'r-material/dist/template';
import schema from 'r-material/dist/schema';
import './TemplatesList.less';
import { useDrag } from 'react-dnd';

import { ItemTypes } from '../../utils/DragTypes';

const Box = ({ tpl }: any) => {
  const key = (tpl.type + 'Schema') as keyof typeof schema;
  const cSchema = schema[key];
  const [, drag] = useDrag(() => ({
    type: ItemTypes.BOX,
    item: { cSchema },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));
  return (
    <div
      ref={drag}
      // draggable
      // onDragStart={() => handleDragStart(tpl.type)}
    >
      <img src="" alt="" />
      <p>{tpl.displayName}</p>
    </div>
  );
};

const RightToolNav: React.FC = () => {
  // const handleDragStart = (type: string) => {
  //   const key = (type + 'Schema') as keyof typeof schema;
  //   const cSchema = schema[key];
  // };
  return (
    <div className="comps-TemplatesList-wrapper">
      {template.map((tpl) => (
        <Box key={tpl.type} tpl={tpl} />
      ))}
    </div>
  );
};

export default RightToolNav;
