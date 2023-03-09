import React from 'react';
import Toolbar from '@/features/Toolbar';
import RightToolNav from '@/features/RightToolNav';
import Editor from '@/features/Editor';
import AttrToolTabs from '@/features/AttrToolTabs';
import './App.less';

function App() {
  return (
    <div className="home-wrapper">
      <Toolbar />
      <RightToolNav />
      <Editor />
      <AttrToolTabs />
    </div>
  );
}

export default App;
