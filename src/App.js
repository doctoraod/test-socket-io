import React, { Component } from 'react';
import io from 'socket.io-client';
import logo from './logo.svg';
import './App.css';

const SOCKET_URL = 'http://localhost:3001'

class App extends Component {
  constructor() {
    super();
    this.state = {
      dataList: []
    }
  }
  componentDidMount() {
    var socket = io(SOCKET_URL);
    const self = this
    socket.on('news', function (data) {
      const temp = self.state.dataList
      temp.unshift(data)
      self.setState({
        dataList: temp
      })
      // socket.emit('my other event', { my: 'data' });
    });
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        {
          this.state.dataList.map((value, key) => {
            return (
              <p className="App-intro" key={key}>
                {value.createdAt} - {value.message}
              </p>
            )
          })
        }
      </div>
    );
  }
}

export default App;
