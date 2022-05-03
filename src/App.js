import './App.css';
import Crypto from './components/Crypto';
import { Component } from 'react';


// class Header extends Component {
//   render() {
//     return (
//         <h3 className='App-title'>{this.props.title} {this.props.num}</h3>
//     );
//   }
// }

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <Header title={'hola'} num={5}/> */}
        <Crypto />
      </div>
    );
  }
}

export default App;
