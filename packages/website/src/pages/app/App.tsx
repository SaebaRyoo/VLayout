import React, { useState } from 'react';
import Toolbar from '@/components/Toolbar';
import RightToolNav from '@/components/RightToolNav';
import Editor from '@/components/Editor';
import AttrToolList from '@/components/AttrToolList';
import './App.less';

function App() {
  return (
    <div className="home-wrapper">
      <Toolbar />
      <RightToolNav />
      <Editor />
      <AttrToolList />
    </div>
  );
}

export default App;
