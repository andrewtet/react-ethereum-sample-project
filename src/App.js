import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    const MyContract = window.web3.eth.contract([
      {
        constant: false,
        inputs: [],
        name: 'kill',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
      },
      {
        constant: true,
        inputs: [],
        name: 'getSecret',
        outputs: [{ name: '', type: 'string' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
      },
      {
        constant: true,
        inputs: [],
        name: 'you_awesome',
        outputs: [{ name: '', type: 'string' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
      },
      {
        inputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'constructor'
      },
      { payable: true, stateMutability: 'payable', type: 'fallback' }
    ]);

    console.log('MyContract', MyContract);

    this.state = {
      ContractInstance: MyContract.at(
        '0xf056c154494126e48fd790d54714085efea5e0bb'
      )
    };

    this.querySecret = this.querySecret.bind(this);
  }

  querySecret() {
    const { getSecret } = this.state.ContractInstance;

    getSecret((err, secret) => {
      if (err) {
        console.log('Error while fetching secret:', err);
      } else {
        console.log('Contract secret:', secret);
        this.setState({
          secret
        });
      }
    });
  }

  render() {
    return (
      <div className="app">
        <p>This is an app</p>
        <br />
        <br />
        <button onClick={this.querySecret}>Get Secret</button>
        <p>Secret: {this.state.secret || ''}</p>
      </div>
    );
  }
}

export default App;
