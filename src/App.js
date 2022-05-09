import "./App.css";
import Crypto from "./components/Crypto";
import { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Exchanges } from "./components/Exchanges";

// class Header extends Component {
//   render() {
//     return (
//         <h3 className='App-title'>{this.props.title} {this.props.num}</h3>
//     );
//   }
// }

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Crypto />} />
      <Route path=":name" element={<Exchanges />} />
    </Routes>
  );
};

export default App;
