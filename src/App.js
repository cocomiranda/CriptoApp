import "./App.css";
import Crypto from "./components/Crypto";
import { Routes, Route } from "react-router-dom";
import { Exchanges } from "./components/Exchanges";
import TagManager from 'react-gtm-module';
import React, { useEffect  } from "react";





const App = () => {
  
  useEffect(() => {
    TagManager.initialize({ gtmId: 'GTM-5H552TG' });
  }, []);
  
  return (
    <Routes>
      <Route path="/" element={<Crypto />} />
      <Route path="/:name/:symbol/:tema/:marketCap/:volume/:icono" element={<Exchanges />} />
    </Routes>
  );
};

export default App;
