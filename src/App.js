// TUTORIAL LINK
// https://medium.com/gitconnected/react-ethereum-getting-started-with-the-minimum-toolset-required-part-3-of-4-6f8c55c751f5

import React, { Component } from 'react';
import './App.css';
import { token, address } from './ether';

class App extends Component {
  constructor(props) {
    super(props);

    const MyContract = window.web3.eth.contract(token);

    this.state = {
      ContractInstance: MyContract.at(address)
    };
    this.state.event = this.state.ContractInstance.ExperimentComplete();
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

  queryConditionResult() {
    const { psudeoRandomResult } = this.state.ContractInstance;

    psudeoRandomResult((err, result) => {
      alert('Psudeo Random Result: ' + result);
    });
  }

  activateExperiment() {
    const { setExperimentInMotion } = this.state.ContractInstance;

    setExperimentInMotion(
      {
        gas: 300000,
        from: window.web3.eth.accounts[0],
        value: window.web3.toWei(0.01, 'ether')
      },
      (err, result) => {
        console.log('Experiment set in motion');
      }
    );
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
    this.state.event.watch((err, event) => {
      if (err) {
        console.error('An error occured in the watch event', err);
      }
      console.log('This is the event', event);
      console.log('This is the result', event.args.result);
    });
    return (
      <div className="app">
        <p>This is an app</p>
        <br />
        <br />
        <button onClick={this.querySecret.bind(this)}>Get Secret</button>
        <br />
        <br />
        <button onClick={this.queryState.bind(this)}>Get State</button>
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
        <br />
        <br />
        <button onClick={this.queryConditionResult.bind(this)}>
          Query Smart Contract Conditional Result
        </button>
        <br />
        <br />
        <button onClick={this.activateExperiment.bind(this)}>
          Run Smart Contract Conditionl Experiment
        </button>
      </div>
    );
  }
}

export default App;
