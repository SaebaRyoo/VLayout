import React, { ReactElement } from 'react';
import { useAppSelector, useAppDispatch } from '@/src/hooks/typedHooks';
import './PointsWRapper.less';
import {
  selectCurSchema,
  updateSchemaByProp,
  updateSchemaSize,
} from './editor.slice';
import type { Schema } from '@lxnxbnq/r-material';

const pointHalfSize = 4;

const getPointsWrapperStyle = (style: any) => {
  const result: any = {};
  ['width', 'height', 'top', 'left', 'transform'].forEach((attr) => {
    result[attr] = style[attr];
  });
  return result;
};

type PointsProps = {
  children: ReactElement;
  canvasInfo: any;
};

const Points = ({ children, canvasInfo }: PointsProps) => {
  const dispatch = useAppDispatch();
  const schemaList = useAppSelector((state) => state.editor.schemaList);
  const curSchemaId = useAppSelector((state) => state.editor.curSchemaId);
  const schema = selectCurSchema(schemaList, curSchemaId) as Schema;
  if (!schema) return null;
  const { left, top, width, height } = schema.style;

  const updateWidth = (moveX: number) => {
    // 处理超出画布的边界情况
    let width = schema.style.width + moveX;
    if (width + left <= canvasInfo.width) {
      width = schema.style.width + moveX;
    } else {
      width = canvasInfo.width - left;
    }
    if (width < 0) {
      width = 0;
    }
    dispatch(
      updateSchemaByProp({
        styleProps: 'width',
        value: width,
        id: curSchemaId,
      })
    );
  };

  const updateHeight = (moveY: number) => {
    // 处理超出画布的边界情况
    let height = schema.style.height + moveY;
    if (height + top <= canvasInfo.height) {
      height = schema.style.height + moveY;
    } else {
      height = canvasInfo.height - top;
    }
    if (height < 0) {
      height = 0;
    }
    dispatch(
      updateSchemaByProp({
        styleProps: 'height',
        value: height,
        id: curSchemaId,
      })
    );
  };

  const updateAll = (moveX: number, moveY: number) => {
    let width = schema.style.width + moveX;
    if (width + left <= canvasInfo.width) {
      width = schema.style.width + moveX;
    } else {
      width = canvasInfo.width - left;
    }
    if (width < 0) {
      width = 0;
    }
    let height = schema.style.height + moveY;
    if (height + top <= canvasInfo.height) {
      height = schema.style.height + moveY;
    } else {
      height = canvasInfo.height - top;
    }
    if (height < 0) {
      height = 0;
    }
    dispatch(
      updateSchemaSize({
        width,
        height,
        id: curSchemaId,
      })
    );
  };

  const handleMouseDown = (e: any, tag: string) => {
    e.preventDefault();
    const targetX = e.clientX;
    const targetY = e.clientY;

    const move = (moveEvent: MouseEvent) => {
      moveEvent.preventDefault();
      const moveX = moveEvent.clientX - targetX;
      const moveY = moveEvent.clientY - targetY;

      if (tag === 'rm') {
        updateWidth(moveX);
      }

      if (tag === 'rb') {
        updateAll(moveX, moveY);
      }

      if (tag === 'bm') {
        updateHeight(moveY);
      }
    };

    const up = () => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', up);
    };

    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
  };
  return (
    <div
      className="comps-editor-item-points-wrapper"
      style={getPointsWrapperStyle(schema.style)}
    >
      <div
        onMouseDown={(e) => handleMouseDown(e, 'rm')}
        style={{
          left: width - pointHalfSize,
          top: height / 2 - pointHalfSize,
        }}
        className={
          !!curSchemaId
            ? 'comps-editor-item-point comps-editor-item-point-rm comps-editor-item-point-show'
            : 'comps-editor-item-point comps-editor-item-point-rm'
        }
      />
      <div
        onMouseDown={(e) => handleMouseDown(e, 'rb')}
        style={{
          left: width - pointHalfSize,
          top: height - pointHalfSize,
        }}
        className={
          !!curSchemaId
            ? 'comps-editor-item-point comps-editor-item-point-rb comps-editor-item-point-show'
            : 'comps-editor-item-point comps-editor-item-point-rb'
        }
      />
      <div
        onMouseDown={(e) => handleMouseDown(e, 'bm')}
        style={{
          left: width / 2 - pointHalfSize,
          top: height - pointHalfSize,
        }}
        className={
          !!curSchemaId
            ? 'comps-editor-item-point comps-editor-item-point-bm comps-editor-item-point-show'
            : 'comps-editor-item-point comps-editor-item-point-bm'
        }
      />
      {children}
    </div>
  );
};

export default Points;
