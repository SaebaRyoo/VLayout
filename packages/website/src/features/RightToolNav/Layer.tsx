import React from 'react';
import './Layer.less';
import { useAppDispatch, useAppSelector } from '@/src/hooks/typedHooks';
import {
  setCurSchemaId,
  delSchemaById,
  swapSchema,
} from '../Editor/editor.slice';
import { UpOutlined, DownOutlined, DeleteOutlined } from '@ant-design/icons';

const Layer = () => {
  const schemaList = useAppSelector((state) => state.editor.schemaList);
  const curSchemaId = useAppSelector((state) => state.editor.curSchemaId);
  const dispatch = useAppDispatch();

  const handleClick = (id: string) => {
    dispatch(setCurSchemaId(id));
  };
  return (
    <div className="comps-toolnav-layer">
      {schemaList.map((schema, index) => {
        return (
          <div
            className={
              curSchemaId === schema.id
                ? 'comps-toolnav-layer-item comps-toolnav-layer-item-click'
                : 'comps-toolnav-layer-item'
            }
            key={schema.id}
            onClick={() => handleClick(schema.id)}
          >
            <div>
              <span>{schema.type}</span>
            </div>
            <div className="comps-toolnav-layer-item-icons">
              {index !== 0 && (
                <UpOutlined
                  onClick={() =>
                    dispatch(
                      swapSchema({ curIdx: index, targetIdx: index - 1 })
                    )
                  }
                />
              )}
              {index < schemaList.length - 1 && (
                <DownOutlined
                  onClick={() =>
                    dispatch(
                      swapSchema({ curIdx: index, targetIdx: index + 1 })
                    )
                  }
                />
              )}
              <DeleteOutlined
                onClick={() => dispatch(delSchemaById({ id: schema.id }))}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Layer;
