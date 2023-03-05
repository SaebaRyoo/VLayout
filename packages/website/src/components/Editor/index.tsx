import * as React from 'react';
import Material, { Schema } from 'r-material';
import { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '@/utils/DragTypes';
import { useAppSelector, useAppDispatch } from '@/src/hooks/typedHooks';
import { addSchemas, setCurSchemaId, updateSchemaPos } from './editor.slice';
import nanoid from '@/src/utils/nanoid';
import { clone } from 'ramda';
import './index.less';

const defaultInfo = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
};
// 画布相关值
let canvasInfo = clone(defaultInfo);

const selectCurSchema = (schemaList: Schema[], id: string) =>
  schemaList.find((schema) => schema.id === id);

const Editor: React.FC = () => {
  const schemaList = useAppSelector((state) => state.editor.schemaList);
  const dispatch = useAppDispatch();
  // console.log('curSchema->', curSchema);
  useEffect(() => {
    let canvasNode = document.getElementById('canvasId');
    const { x, y, width, height } = canvasNode!.getBoundingClientRect();
    canvasInfo = {
      x,
      y,
      width,
      height,
    };
    return () => {
      canvasInfo = defaultInfo;
      canvasNode = null;
    };
  }, []);

  const addSchema = (schema: Schema, x: number, y: number) => {
    schema.id = nanoid();

    // 计算默认位置
    x = x - canvasInfo.x;
    y = y - canvasInfo.y;

    // 处理超出画布的边界情况
    if (x + schema.style.width > canvasInfo.width) {
      x = canvasInfo.width - schema.style.width;
    }

    if (y + schema.style.height > canvasInfo.height) {
      y = canvasInfo.height - schema.style.height;
    }

    if (x < 0) {
      x = 0;
    }
    if (y < 0) {
      y = 0;
    }

    schema.style.left = x;
    schema.style.top = y;

    dispatch(setCurSchemaId(schema.id));
    dispatch(addSchemas(schema));
  };

  const [, drop] = useDrop(() => ({
    accept: ItemTypes.BOX,
    drop: ({ cSchema }: any, monitor) => {
      const { x, y } = monitor.getClientOffset() as { x: number; y: number };

      // 拷贝一下schema数据，避免指针出错
      addSchema(clone(cSchema), x, y);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  // 处理画布内元素移动
  const handleMouseDown = (e: MouseEvent, id: string) => {
    const schema = selectCurSchema(schemaList, id) as Schema;
    setCurSchemaId(id);

    // 计算鼠标位于画布中的坐标
    const pointX = e.clientX - canvasInfo.x;
    const pointY = e.clientY - canvasInfo.y;

    // 获取鼠标位于当前元素的位置
    const targetX = pointX - schema?.style.left;
    const targetY = pointY - schema?.style.top;

    const move = (moveEvent: MouseEvent) => {
      const moveX = moveEvent.clientX - canvasInfo.x;
      const moveY = moveEvent.clientY - canvasInfo.y;

      // 计算元素最后的坐标
      let x = moveX - targetX;
      let y = moveY - targetY;

      // 处理超出画布的边界情况
      if (x + schema.style.width > canvasInfo.width) {
        x = canvasInfo.width - schema.style.width;
      }

      if (y + schema.style.height > canvasInfo.height) {
        y = canvasInfo.height - schema.style.height;
      }

      if (x < 0) {
        x = 0;
      }
      if (y < 0) {
        y = 0;
      }

      dispatch(updateSchemaPos({ x, y, id }));
    };

    const up = () => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', up);
    };

    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
  };

  return (
    <main style={{ background: 'none' }} className="comps-editor-wrapper">
      <div id="canvasId" className="comps-editor-canvas" ref={drop}>
        {schemaList.map((schema) => (
          <Material
            onMouseDown={(e: MouseEvent) => handleMouseDown(e, schema.id)}
            data-id={schema.id}
            key={schema.id}
            schema={schema}
          />
        ))}
      </div>
    </main>
  );
};

export default Editor;
