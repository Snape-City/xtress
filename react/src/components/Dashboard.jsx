import React, { Component } from 'react';
import TestForm from './TestForm.jsx';
import TestContainer from './TestContainer.jsx';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      isModalShown: false,
      tests: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.addTest = this.addTest.bind(this);
  }

  handleChange(event) {
    this.setState({ url: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    socket.emit('testData', {
      url: this.state.url,
      tests: this.state.tests
    });
  }

  showModal = () => this.setState({ isModalShown: true });
  hideModal = () => this.setState({ isModalShown: false });

  addTest(config) {
    // console.log('config ==>', config);
    this.setState(prevState => {
      return prevState.tests.push(config);
    });
  }

  render() {
    return (
      <div>
        <label>
          Target URL:
          <input type="text" value={this.state.url} onChange={this.handleChange} />
        </label>
        <br />
        <TestContainer tests={this.state.tests} />
        <TestForm addTest={this.addTest} isModalShown={this.state.isModalShown} hideModal={this.hideModal} />
        <button onClick={this.showModal}>Add Test</button>
        <br />
        <button onClick={this.handleSubmit}>Run</button>
      </div>
    );
  }
}
