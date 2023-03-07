import React, { useEffect } from 'react';
import './RightClick.less';
import { useAppSelector, useAppDispatch } from '../../hooks/typedHooks';
import {
  toggleRightClick,
  setCurSchemaId,
  delSchemaById,
  swapSchema,
} from './editor.slice';

interface RightClickProps {
  handleContextMenu: (event: any) => void;
}

const RightClick = ({ handleContextMenu }: RightClickProps) => {
  const dispatch = useAppDispatch();
  const show = useAppSelector((state) => state.editor.rightClick.show);
  const left = useAppSelector((state) => state.editor.rightClick.left);
  const top = useAppSelector((state) => state.editor.rightClick.top);
  const schemaList = useAppSelector((state) => state.editor.schemaList);
  const curSchemaId = useAppSelector((state) => state.editor.curSchemaId);

  useEffect(() => {
    return () => {
      // 卸载自定义右击方法
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  const setShowFalse = () => {
    document.removeEventListener('contextmenu', handleContextMenu);
    dispatch(toggleRightClick(false));
  };

  const handleMouseLeave = () => {
    // 卸载自定义右击方法
    setShowFalse();
  };

  const handleRemove = () => {
    dispatch(delSchemaById({ id: curSchemaId }));
    setShowFalse();
  };

  if (!show) return null;

  // 渲染右键
  return (
    <div
      className="comps-editor-rightclick"
      style={{ left: left - 10, top: top - 10, zIndex: 9999999 }}
      onMouseLeave={handleMouseLeave}
    >
      <div className="comps-editor-rightclick-item">复制</div>
      <div className="comps-editor-rightclick-item" onClick={handleRemove}>
        删除
      </div>
      {schemaList.length > 1 && (
        <div className="comps-editor-rightclick-item">上移一层</div>
      )}
      {schemaList.length > 1 && (
        <div className="comps-editor-rightclick-item">下移一层</div>
      )}
    </div>
  );
};

export default React.memo(RightClick);
