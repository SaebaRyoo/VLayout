import React from 'react';
import {
  delSchemaById,
  swapSchema,
  copySchema,
} from '@/features/Editor/editor.slice';
import { useAppDispatch, useAppSelector } from '@/src/hooks/typedHooks';

const ItemRightClickMenu: React.FC = () => {
  const schemaList = useAppSelector((state) => state.editor.schemaList);
  const curSchemaId = useAppSelector((state) => state.editor.curSchemaId);
  const index = schemaList.findIndex((schema) => schema.id === curSchemaId);
  const dispatch = useAppDispatch();
  const handleRemove = () => {
    dispatch(delSchemaById({ id: curSchemaId }));
  };

  return (
    <>
      <div
        className="comps-editor-rightclick-item"
        onClick={() => dispatch(copySchema())}
      >
        复制
      </div>
      <div className="comps-editor-rightclick-item" onClick={handleRemove}>
        删除
      </div>
      {index < schemaList.length - 1 && schemaList.length > 1 && (
        <div
          onClick={() =>
            dispatch(swapSchema({ curIdx: index, targetIdx: index + 1 }))
          }
          className="comps-editor-rightclick-item"
        >
          上移一层
        </div>
      )}
      {index > 0 && schemaList.length > 1 && (
        <div
          onClick={() =>
            dispatch(swapSchema({ curIdx: index, targetIdx: index - 1 }))
          }
          className="comps-editor-rightclick-item"
        >
          下移一层
        </div>
      )}
    </>
  );
};

export default ItemRightClickMenu;
