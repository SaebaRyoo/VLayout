import React, { ReactElement, useEffect } from 'react';
import './RightClick.less';
import { useAppSelector, useAppDispatch } from '../../hooks/typedHooks';
import {
  toggleRightClick,
  setRightClickPos,
} from '@/features/Editor/editor.slice';

type RightClickProps = {
  children: ReactElement;
  showFalse?: (data: any) => void;
};

const RightClick: React.FC<RightClickProps> = ({ children, showFalse }) => {
  const dispatch = useAppDispatch();
  const show = useAppSelector((state) => state.editor.rightClick.show);
  const left = useAppSelector((state) => state.editor.rightClick.left);
  const top = useAppSelector((state) => state.editor.rightClick.top);

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
  useEffect(() => {
    // showFalse && showFalse();
    if (show) {
      document.addEventListener('contextmenu', handleContextMenu);
    }
    return () => {
      // 卸载自定义右击方法
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, [show]);

  const setShowFalse = () => {
    document.removeEventListener('contextmenu', handleContextMenu);
    dispatch(toggleRightClick(false));
  };

  const handleEventOrBubble = () => {
    // 卸载自定义右击方法 && 点击的冒泡事件
    setShowFalse();
  };

  if (!show) return null;

  // 渲染右键
  return (
    <div
      className="comps-editor-rightclick"
      style={{ left: left - 10, top: top - 10, zIndex: 9999999 }}
      onMouseLeave={handleEventOrBubble}
      onClick={handleEventOrBubble}
    >
      {children}
    </div>
  );
};

export const RightClickMenu = React.memo(RightClick);
