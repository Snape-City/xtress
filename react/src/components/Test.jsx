import React, { Component } from 'react';

export default class Test extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { test, testId } = this.props;
    if (test) {
      return (
        <div id="test">
          Test {testId} ==> {test.method} {test.route}
        </div>
      );
    }
    return null;
  }
}
