import React, { Component } from 'react';
import Test from './Test.jsx';

export default class TestContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const testArr = this.props.tests.map((test, i) => {
      console.log('test ===>', test);
      return <Test test={test} testId={i} key={i} />;
    });
    return <div>{testArr}</div>;
    // return (
    //   <div>
    //     {this.props.tests.map((test, i) => {
    //       return <Test test={test} testId={i} key={i} />;
    //     })}
    //   </div>
    // );
  }
}
