import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

class DashboardContainer extends Component {
  constructor(props) {
    super(props)
  }
  
  // <CustomTableCell component="th" scope="row">{row.name}</CustomTableCell>
  // <CustomTableCell numeric>
  // {(Object.keys(row.methods).toString()
  // )}</CustomTableCell>
  // <CustomTableCell numeric>{row.performance}</CustomTableCell>
  // <CustomTableCell numeric>{row.perfor}</CustomTableCell>
  // <CustomTableCell numeric>{row.protein}</CustomTableCell>




  render() {
    const { classes, rows } = this.props; 
    //console.log(this.props)
    let rowData = null;
    let rowArray ;
    let displayRow = [];
     console.log("displayRow",displayRow)
     
    if (rows) {
      rowArray = Object.keys(rows[0].methods)
      // rowData = rows.map(row => {
      //   rowArray = Object.keys(row.methods)
      //   console.log("rowArray ",rowArray)
      // })
      for(let key in rows[0].methods) {
        displayRow.push(
          <TableRow>
          <CustomTableCell component="th" scope="row">{rows[0].name}</CustomTableCell>
          <CustomTableCell component="th" scope="row">{key}</CustomTableCell>
          <CustomTableCell component="th" scope="row">{rows[0].methods[key].performance}</CustomTableCell>
          <CustomTableCell id='display' component="th" scope="row">{rows[0].methods[key].performance}</CustomTableCell>
        </TableRow>)
      }
        // return (
        //   <TableRow className={classes.row} key={row.id}>
        //     <CustomTableCell>{row.name}</CustomTableCell>
        //   </TableRow>
        // );
      
      // for(let i =0; i < rowArray.length; i++) {
      //   console.log("i",rowArray[i])
      //  displayRow.push(<CustomTableCell>{rowData[i]}</CustomTableCell>)
      // }
      // console.log("2",displayRow)
      
    }
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <CustomTableCell>Route Name</CustomTableCell>
              <CustomTableCell numeric>Methods</CustomTableCell>
              <CustomTableCell numeric>Performance (ms)</CustomTableCell>
              <CustomTableCell numeric>Performance Avg (ms)</CustomTableCell>
              <CustomTableCell numeric>Some Other Data</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayRow}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}
  
DashboardContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DashboardContainer);