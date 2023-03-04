import * as React from 'react';
import TemplatesList from './TemplatesList';
import './index.less';

const RightToolNav: React.FC = () => {
  return (
    <aside className="comps-righttoolnav-wrapper">
      <TemplatesList />
    </aside>
  );
};

export default RightToolNav;
