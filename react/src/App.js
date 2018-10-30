import React, { Component } from "react";
import { hot } from "react-hot-loader";
import Tree from "react-d3-tree";
import "./App.css";
import DashboardContainer from "./DashboardContainer";
import Header from "./Header";
import Dashboard from "./components/Dashboard.jsx";

const containerStyles = {
  width: "95%",
  height: "95%"
};
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      perfData: [],
      treeData: null,
      rows: null,
      separation: {
        siblings: 0.5,
        nonSiblings: 0.5
      }
    };

    // Binding methods for tree manipulation
    this.onClick = this.onClick.bind(this);
    this.generateTree = this.generateTree.bind(this);
  }
  //click events for each node performance
  generateTree(e) {
    this.setState(this.state);
  }

  onClick(e) {
    this.setState({ rows: null });
    const myDisplay = this.state.perfData.filter(value => {
      return e.name == value.route;
    });

    if (myDisplay.length) {
      this.setState({ rows: myDisplay });
    }
  }
  componentDidMount() {
    socket.on("tree", tree => {
      console.log("socket => trees", tree);
      this.setState({
        treeData: [tree.root]
      });
    });

    socket.on("data", data => {
      this.setState(prevState => {
        prevState.perfData.push(data);
      });
    });
  }

  render() {
    if (this.state.treeData) {
      const dimensions = this.treeContainer.getBoundingClientRect();
      return (
        <div>
          <div id="dashboard">
            <Dashboard />
          </div>
          <div
            id="treeWrapper"
            style={{ width: "80em", height: "40em" }}
            ref={tc => (this.treeContainer = tc)}
          >
            <Tree
              data={this.state.treeData}
              collapsible={false}
              separation={this.state.separation}
              translate={{ x: dimensions.width / 8, y: dimensions.height / 2 }}
              onClick={this.onClick}
              initialDepth={200}
            />
          <div className="dashboard-container-wrapper">
        <DashboardContainer rows={this.state.rows} />
          </div>
        </div>
        </div>
      );
    }
    return (
      <div>
        <div id="dashboard">
          <Dashboard />
        </div>
        <div
          id="treeWrapper"
          style={{ width: "80em", height: "40em" }}
          ref={tc => (this.treeContainer = tc)}
        >
          <p>TREE WILL APPEAR HERE</p>
        </div>
        <div className="dashboard-container-wrapper">
        <DashboardContainer className="dashboard-container" rows={this.state.rows} />
        </div>
      </div>
      
    );
  }
}
export default hot(module)(App);
