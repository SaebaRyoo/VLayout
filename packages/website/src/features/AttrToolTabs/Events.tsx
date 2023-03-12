import { Button, Drawer, Tabs, Tag } from 'antd';
import React, { useMemo, useState } from 'react';
import eventList from '@/utils/events';
import CodeMirror from '@/src/components/CodeMirror';
import { removeEvent, setEvents } from '../Editor/editor.slice';
import { useAppDispatch } from '@/src/hooks/typedHooks';

interface EventsProps {
  id: string;
  events: {
    [key in string]: (data?: any) => void;
  };
}

const Events: React.FC<EventsProps> = ({ events }) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {Object.keys(events).map((event) => (
        <Tag
          key={event}
          closable
          // onClick={}
          onClose={() => dispatch(removeEvent(event))}
        >
          {event}
        </Tag>
      ))}
      <Button onClick={showDrawer}>添加事件</Button>
      <EventDrawer events={events} open={open} onClose={onClose} />
    </div>
  );
};

interface EventDrawerProps {
  open: boolean;
  onClose: () => void;
  events: EventsProps['events'];
}
const EventDrawer: React.FC<EventDrawerProps> = ({ open, onClose }) => {
  const dispatch = useAppDispatch();
  const [key, updateKey] = useState('onClick');
  const [value, updateValue] = useState(
    `// 请在这里直接写逻辑，比如跳转\n// window.location.href = 'http://www.baidu.com'`
  );

  const handleValueChange = (value: string) => {
    updateValue(value);
  };

  const items = useMemo(
    () =>
      eventList.map((event) => ({
        key: event.key,
        label: event.name,
        children: <CodeMirror value={value} onChange={handleValueChange} />,
      })),
    [eventList]
  );

  const handleKeyChange = (key: string) => {
    updateKey(key);
  };
  const handleClick = () => {
    dispatch(setEvents({ value, key }));
    onClose();
  };
  return (
    <Drawer
      placement="left"
      title={null}
      closable={false}
      onClose={onClose}
      open={open}
    >
      <Tabs activeKey={key} items={items} onChange={handleKeyChange} />

      <Button onClick={handleClick} style={{ marginTop: 20 }}>
        添加 {key} 事件
      </Button>
    </Drawer>
  );
};

export default Events;
