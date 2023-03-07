import React, { useState } from 'react';
import Toolbar from '@/components/Toolbar';
import RightToolNav from '@/components/RightToolNav';
import Editor from '@/components/Editor';
import AttrToolTabs from '@/src/components/AttrToolTabs';
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
