import React, { useState } from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { selectCurSchema } from '../Editor/editor.slice';
import { useAppSelector } from '@/src/hooks/typedHooks';
import Attrs from './Attrs';

import './index.less';
import type { Schema } from '@lxnxbnq/r-material';
import Events from './Events';

const BlackList = ['position', 'left', 'top'];

const AttrToolTabs: React.FC = () => {
  const [activeKey, setActiveKey] = useState('styles');
  const schemaList = useAppSelector((state) => state.editor.schemaList);
  const curSchemaId = useAppSelector((state) => state.editor.curSchemaId);

  const schema = selectCurSchema(schemaList, curSchemaId);
  const handleChange = (activeKey: string) => {
    setActiveKey(activeKey);
  };

  // 由于React的更新策略会导致在移动的时候不停的更新整个子组件，
  // 所以直接排除掉{x,y}这类频繁变动的state，然后在子组件内做优化策略。
  const getUsefulStyle = () => {
    const style: Schema['style'] = {};
    schema &&
      Object.keys(schema.style).forEach((key) => {
        if (BlackList.indexOf(key) < 0) {
          style[key] = schema.style[key];
        }
      });
    return style;
  };

  const items: TabsProps['items'] = [
    {
      key: 'styles',
      label: '属性',
      children: schema?.style ? (
        <Attrs
          propValue={schema.propValue}
          id={schema?.id}
          style={schema?.style && getUsefulStyle()}
        />
      ) : null,
    },
    {
      key: 'events',
      label: '事件',
      children: schema?.events ? (
        <Events id={schema?.id} events={schema?.events} />
      ) : null,
    },
    // {
    //   key: 'animations',
    //   label: '动画',
    //   children: `content3`,
    // },
  ];
  return (
    <aside className="comps-attrtoollist-wrapper">
      {!curSchemaId ? (
        '请先选择一个需要编辑内容'
      ) : (
        <Tabs activeKey={activeKey} items={items} onChange={handleChange} />
      )}
    </aside>
  );
};

export default AttrToolTabs;
