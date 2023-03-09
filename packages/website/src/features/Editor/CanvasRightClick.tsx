import React from 'react';
import { pasteSchema } from '@/features/Editor/editor.slice';
import { useAppDispatch, useAppSelector } from '@/src/hooks/typedHooks';
import { message } from 'antd';

const CanvasRightClickMenu: React.FC<{
  pastePosition: { left: number; top: number };
}> = ({ pastePosition }) => {
  const dispatch = useAppDispatch();
  const copyedSchema = useAppSelector((state) => state.editor.copyedSchema);

  const handleClick = () => {
    if (!copyedSchema) {
      message.error('请先复制组件！');
      return;
    }
    dispatch(pasteSchema(pastePosition));
  };
  return (
    <>
      <div className="comps-editor-rightclick-item" onClick={handleClick}>
        粘贴
      </div>
    </>
  );
};

export default CanvasRightClickMenu;
