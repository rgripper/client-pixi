import * as React from 'react';
import './App.css';
import Canvas from './Canvas';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Pixi</h1>
        </header>
        <main><Canvas width={1366} height={768}/></main>
      </div>
    );
  }
}

export default App;
