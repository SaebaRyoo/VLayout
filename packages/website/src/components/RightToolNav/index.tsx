import * as React from 'react';
import TemplatesList from './TemplatesList';
import './index.less';
import Layer from './Layer';

const RightToolNav: React.FC = () => {
  return (
    <aside className="comps-righttoolnav-wrapper">
      <TemplatesList />
      <Layer />
    </aside>
  );
};

export default RightToolNav;
