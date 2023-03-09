import React from 'react';
import './index.less';
import Material from 'r-material';
import { useAppSelector } from '@/src/hooks/typedHooks';

const Preview: React.FC = () => {
  const schemaList = useAppSelector((state) => state.editor.schemaList);
  const canvasSize = useAppSelector((state) => state.toolbar.canvas);
  return (
    <main className="pages-preview-wrapper">
      <div
        style={{
          height: canvasSize.height,
          width: canvasSize.width,
        }}
        className="pages-preview-simulator"
      >
        {schemaList.map((schema) => {
          return <Material key={schema.id} schema={schema} />;
        })}
      </div>
    </main>
  );
};

export default Preview;
