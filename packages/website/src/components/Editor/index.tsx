import * as React from 'react';
import Material, { Schema } from 'r-material';
import './index.less';
import { useState } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../../utils/DragTypes';

const Editor: React.FC = () => {
  const [schemaList, setSchemaList] = useState<Schema[]>([]);
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.BOX,
    drop: (item: any) => {
      // console.log('schemaList ---->', schemaList);
      // console.log('item ---->', item);
      const list = schemaList;
      list.push(item.cSchema);
      setSchemaList(list);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));
  return (
    <main style={{ background: 'none' }} className="comps-editor-wrapper">
      <div className="comps-editor-canvas" ref={drop}>
        {schemaList.map((schema, index) => (
          <Material key={index} schema={schema} />
        ))}
      </div>
      {/* <Material schema={curSchema} /> */}
    </main>
  );
};

export default Editor;
