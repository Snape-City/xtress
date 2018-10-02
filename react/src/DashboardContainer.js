import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
});
// <CustomTableCell component="th" scope="row" numeric>
//   {key}
// </CustomTableCell>
// <CustomTableCell component="th" scope="row" numeric>
//   {rows.methods[key].performance}
// </CustomTableCell>
// <CustomTableCell component="th" scope="row" numeric>
//   {rows.perfor}
// </CustomTableCell>
// <CustomTableCell component="th" scope="row" numeric>
//   {rows.perfor}
// </CustomTableCell>

class DashboardContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes, rows } = this.props;
    let rowData = null;
    let rowArray;
    let displayRow = [];
    console.log("2.page", rows);
    if (rows) {
      displayRow.push(
        <TableRow>
          <CustomTableCell component="th" scope="row" numeric>
            {rows[0].route}
          </CustomTableCell>
          <CustomTableCell component="th" scope="row" numeric>
            {rows[0].method}
          </CustomTableCell>
          <CustomTableCell component="th" scope="row" numeric>
            {rows[0].min}
          </CustomTableCell>
          <CustomTableCell component="th" scope="row" numeric>
            {rows[0].max}
          </CustomTableCell>
          <CustomTableCell component="th" scope="row" numeric>
            {rows[0].avg}
          </CustomTableCell>
        </TableRow>
      );
    }
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <CustomTableCell>Route Name</CustomTableCell>
              <CustomTableCell numeric>Methods</CustomTableCell>
              <CustomTableCell numeric>Min (ms)</CustomTableCell>
              <CustomTableCell numeric>Max (ms)</CustomTableCell>
              <CustomTableCell numeric>Performance Avg (ms)</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>{displayRow}</TableBody>
        </Table>
      </Paper>
    );
  }
}

DashboardContainer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DashboardContainer);
