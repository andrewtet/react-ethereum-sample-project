import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import token from './token';

class App extends Component {
  constructor(props) {
    super(props);

    const MyContract = window.web3.eth.contract(token);

    console.log('MyContract', MyContract);

    this.state = {
      ContractInstance: MyContract.at(
        '0x905841e39de04970fb8db1ad9dde3b73d62b84be'
      )
    };

    this.querySecret = this.querySecret.bind(this);
    this.queryState = this.queryState.bind(this);
  }

  querySecret() {
    const { getSecret } = this.state.ContractInstance;

    getSecret((err, secret) => {
      if (err) {
        console.log('Error while fetching secret:', err);
      } else {
        console.log('Contract secret:', secret);
        alert('Secret: ' + secret);
      }
    });
  }

  queryState() {
    const { getState } = this.state.ContractInstance;

    getState((err, state) => {
      if (err) {
        console.log('Error while fetching state:', err);
      } else {
        console.log('Contract state:', state);
        alert('State: ' + state);
      }
    });
  }

  handleInputChange(e) {
    this.setState({
      contractState: e.target.value
    });
  }

  handleContractStateSubmit(e) {
    e.preventDefault();

    const { setState } = this.state.ContractInstance;
    const { contractState: newState } = this.state;

    console.log('SET STATE', setState);
    console.log('CONTRACT STATE', this.state.contractState);
    console.log('NEW STATE', newState);

    setState(
      newState,
      {
        gas: 300000,
        from: window.web3.eth.accounts[0],
        value: window.web3.toWei(0.01, 'ether')
      },
      (err, result) => {
        console.log('Smart Contract is Changing');
      }
    );
  }

  render() {
    return (
      <div className="app">
        <p>This is an app</p>
        <br />
        <br />
        <button onClick={this.querySecret}>Get Secret</button>
        <br />
        <br />
        <button onClick={this.queryState}>Get State</button>
        <br />
        <br />
        <span style={{ marginRight: '6px' }}>New State:</span>
        <input
          type="text"
          name="state-change"
          placeholder="Enter new state..."
          onChange={this.handleInputChange.bind(this)}
        />
        <br />
        <button
          type="submit"
          onClick={this.handleContractStateSubmit.bind(this)}
        >
          Set State
        </button>
      </div>
    );
  }
}

export default App;
