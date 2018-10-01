import React, { Component } from 'react';

export default class TestForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      config: {}
    };
  }

  resetConfig = () => this.setState({ config: {} });

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      config: Object.assign({}, this.state.config, { [name]: value })
    });
  };

  handleTestFormSubmit = event => {
    event.preventDefault();
    this.props.addTest(this.state.config);
    this.resetConfig();
    this.props.hideModal();
  };

  handleClose = () => {
    this.resetConfig();
    this.props.hideModal();
  };

  render() {
    const { modalShown } = this.props;
    const showHideClassName = modalShown ? 'modal display-block' : 'modal display-none';

    return (
      <div className={showHideClassName}>
        <form onSubmit={this.handleTestFormSubmit} className="test-form-modal">
          <label>
            Route:
            <input type="text" name="route" onChange={this.handleChange} />
          </label>
          <br />
          <label>
            Method:
            <input type="text" name="method" onChange={this.handleChange} />
          </label>
          <br />
          <label>
            Number of Requests:
            <input type="number" name="numRequests" onChange={this.handleChange} />
          </label>
          <br />
          <label>
            Headers:
            <input type="text" name="headerKey" placeholder="key" onChange={this.handleChange} />
            <input type="text" name="headerValue" placeholder="value" onChange={this.handleChange} />
          </label>
          <br />
          <label>
            Cookies:
            <input type="text" name="cookieKey" placeholder="key" onChange={this.handleChange} />
            <input type="text" name="cookieValue" placeholder="value" onChange={this.handleChange} />
          </label>
          <br />
          <input type="submit" value="Add Test" />
          <input type="button" value="Close" onClick={this.handleClose} />
        </form>
      </div>
    );
  }
}
