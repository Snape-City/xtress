import React, { Component } from "react";
import { hot } from "react-hot-loader";
import Tree from "react-d3-tree";
// import treeData from "../../../public/treeData.json" //make this more generalized....
import "./Tree.css";


const containerStyles = {
  width: '100%',
  height: '50vh',
};

class TreeContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: treeData,
      translate: undefined
    };

    // Binding methods for tree manipulation
    this.onClick = this.onClick.bind(this)

  };

  onClick() {

    //TODO:
      // Grab route from DOM node
      // Use route to target Node in the tree
      // Set all properties of the route to state obj.
      // Pass all state object to various components.

    //alert("YO")
  }

  componentDidMount() {
    const dimensions = this.treeContainer.getBoundingClientRect();
    this.setState({
      translate: {
        x: dimensions.width / 8,
        y: dimensions.height / 2
      },
      separation: {
        siblings: .5, 
        nonSiblings: .5
      }
    })
  }

  render() {
    return (
      /* <Tree /> will fill width/height of its container; in this case `#treeWrapper` */
        <div id="treeWrapper" style={containerStyles} ref={tc => (this.treeContainer = tc)}>
          <Tree data={this.state.data} translate={this.state.translate} separation={this.state.separation} orientation={'horizontal'} onClick={this.onClick} initialDepth={2} />
        </div>
    );
  }
}

export default hot(module)(TreeContainer);
//module.exports = App;