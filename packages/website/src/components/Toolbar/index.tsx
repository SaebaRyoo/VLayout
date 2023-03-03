import * as React from 'react';
import './index.less';
import { Button } from 'antd';

const Header: React.FC = () => {
  return (
    <header className="comps-toolbar-wrapper">
      <Button>JSON</Button>
      <Button>撤销</Button>
      <Button>重做</Button>
      <Button>预览</Button>
      <Button>保存</Button>
      <Button>清空画布</Button>
      <Button>截图</Button>
    </header>
  );
};

export default Header;
