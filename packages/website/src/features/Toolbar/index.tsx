import * as React from 'react';
import './index.less';
import { Button, Input } from 'antd';
import { useAppDispatch, useAppSelector } from '@/src/hooks/typedHooks';
import { clearSchemas, setCurSchemaId } from '../Editor/editor.slice';
import { setCanvasHeight, setCanvasWidth } from './toolbar.slice';
import { copyContent } from '@/src/utils/copy';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const canvasSize = useAppSelector((state) => state.toolbar.canvas);
  const schemaList = useAppSelector((state) => state.editor.schemaList);
  return (
    <header className="comps-toolbar-wrapper">
      {/* <Button onClick={() => console.log('预览')}>截图</Button> */}
      <Button onClick={() => console.log('预览')}>预览</Button>
      <Button
        onClick={() => {
          dispatch(setCurSchemaId(''));
          dispatch(clearSchemas());
        }}
      >
        清空画布
      </Button>
      <Button
        onClick={() =>
          copyContent(
            JSON.stringify({
              schemaLIst: schemaList,
              canvasInfo: canvasSize,
            })
          )
        }
      >
        JSON 复制
      </Button>
      <Button onClick={() => console.log('预览')}>保存</Button>
      <div style={{ marginLeft: 20 }}>画布尺寸:</div>
      <div className="comp-toobar-canvas-control">
        <Input
          style={{ width: 100 }}
          onChange={(e) =>
            dispatch(setCanvasWidth(parseInt(e.target.value) || 0))
          }
          value={canvasSize.width}
          type="number"
        />{' '}
        *{' '}
        <Input
          style={{ width: 100 }}
          onChange={(e) =>
            dispatch(setCanvasHeight(parseInt(e.target.value) || 0))
          }
          value={canvasSize.height}
          type="number"
        />
      </div>
    </header>
  );
};

export default Header;
