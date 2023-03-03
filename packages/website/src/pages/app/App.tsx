import React, { useState } from 'react';
import Toolbar from '../../components/Toolbar';
import ComponentList from '../../components/ComponentList';
import Editor from '../../components/Editor';
import AttrToolList from '../../components/AttrToolList';
import { Header } from 'header';
import { Footer } from 'footer';
import './App.less';

function App() {
  return (
    <div className="home-wrapper">
      <Toolbar />
      <ComponentList />
      <Editor />
      <AttrToolList />
    </div>
  );
}

export default App;
