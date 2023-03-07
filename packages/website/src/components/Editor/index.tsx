import * as React from 'react';
import Material from 'r-material';
import type { Schema } from 'r-material';
import { useState, useEffect, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '@/utils/DragTypes';
import { useAppSelector, useAppDispatch } from '@/src/hooks/typedHooks';
import {
  addSchemas,
  setCurSchemaId,
  updateSchemaPos,
  selectCurSchema,
  toggleRightClick,
  setRightClickPos,
} from './editor.slice';
import nanoid from '@/src/utils/nanoid';
import { clone } from 'ramda';
import './index.less';
import PointsWrapper from './PointsWrapper';
import RightClick from './RightClick';

const defaultInfo = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
};
// 画布相关值
let canvasInfo = clone(defaultInfo);

const getMaterialStyle = (schema: Schema) => {
  const newSchema = clone(schema);
  const style = newSchema.style;
  const result: any = {};

  Object.keys(style).forEach((key) => {
    if (!['left', 'top', 'transform'].includes(key)) {
      result[key] = style[key];
    }
  });

  newSchema.style = result;

  return newSchema;
};

const calcPos = (x: number, y: number, schema: Schema) => {
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

  return { x, y };
};

const Editor: React.FC = () => {
  const schemaList = useAppSelector((state) => state.editor.schemaList);
  const curSchemaId = useAppSelector((state) => state.editor.curSchemaId);
  const canvasSize = useAppSelector((state) => state.toolbar.canvas);
  const dispatch = useAppDispatch();

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
  }, [canvasSize]);

  const addSchema = (schema: Schema, x: number, y: number) => {
    schema.id = nanoid();

    // 计算默认位置
    x = x - canvasInfo.x;
    y = y - canvasInfo.y;

    // 处理超出画布的边界情况
    const caclRes = calcPos(x, y, schema);
    x = caclRes.x;
    y = caclRes.y;

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

  const handleContextMenu = (event: any) => {
    // 屏蔽默认右键事件
    event.preventDefault();
    // 获得点击的位置
    let { clientX, clientY } = event;
    // console.log('clientX--->', clientX);
    dispatch(
      setRightClickPos({
        left: clientX,
        top: clientY,
      })
    );
  };
  // 处理画布内元素移动
  const handleMouseDown = (e: MouseEvent, id: string) => {
    e.preventDefault();
    dispatch(setCurSchemaId(id));
    if (e.button === 2) {
      // 打开右击键
      document.addEventListener('contextmenu', handleContextMenu);
      dispatch(toggleRightClick(true));
      return;
    }
    const schema = selectCurSchema(schemaList, id) as Schema;

    // 计算鼠标位于画布中的坐标
    const pointX = e.clientX - canvasInfo.x;
    const pointY = e.clientY - canvasInfo.y;

    // 获取鼠标位于当前元素的位置
    const targetX = pointX - schema?.style.left;
    const targetY = pointY - schema?.style.top;

    const move = (moveEvent: MouseEvent) => {
      moveEvent.preventDefault();
      const moveX = moveEvent.clientX - canvasInfo.x;
      const moveY = moveEvent.clientY - canvasInfo.y;

      // 计算元素最后的坐标
      let x = moveX - targetX;
      let y = moveY - targetY;

      // 处理超出画布的边界情况
      const caclRes = calcPos(x, y, schema);
      x = caclRes.x;
      y = caclRes.y;
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
    <section
      style={{
        background: 'none',
      }}
      className="comps-editor-wrapper"
    >
      <RightClick handleContextMenu={handleContextMenu} />
      <div className="comps-editor-wrapper-inner">
        <div
          id="canvasId"
          style={{
            height: canvasSize.height,
            width: canvasSize.width,
          }}
          className="comps-editor-canvas"
          ref={drop}
        >
          {schemaList.map((schema) => {
            if (schema.id === curSchemaId) {
              return (
                <PointsWrapper canvasInfo={canvasInfo} key={schema.id}>
                  <Material
                    onMouseDown={(e: MouseEvent) =>
                      handleMouseDown(e, schema.id)
                    }
                    key={schema.id}
                    schema={getMaterialStyle(schema)}
                  />
                </PointsWrapper>
              );
            } else {
              return (
                <Material
                  onMouseDown={(e: MouseEvent) => handleMouseDown(e, schema.id)}
                  key={schema.id}
                  schema={schema}
                />
              );
            }
          })}
        </div>
      </div>
    </section>
  );
};

export default Editor;
