import React, { useState, useEffect } from "react";
import Collapse from "@mui/material/Collapse";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PrimaryHeading from "../../components/PrimaryHeading";
import { useParams } from "react-router-dom";
import { ApiConfigURL } from "../../config/apiConfig";
import axios from "axios";

const Row = (props: { row: any }) => {
  const { row } = props;
  const [open] = React.useState(false);
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell component="th" scope="row">
          {`${row.id}`}
        </TableCell>
        <TableCell align="center">{row.date}</TableCell>
        <TableCell align="center">{row.type}</TableCell>
        <TableCell align="right">{row.amount}</TableCell>
        <TableCell align="right">{row.settledAmount}</TableCell>
        <TableCell align="center" style={{ cursor: "pointer" }}>
          {row?.transactions?.length > 0 && <VisibilityIcon />}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit></Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const { id } = useParams();
  const getOrder = async () => {
    await axios
      .get(`${ApiConfigURL}/shopOrders/${id}`)
      .then(async (response: any) => {
        setTransactions(response?.data?.transactions);
      })
      .catch((error) => {
        console.log(error)
      });
  };

  useEffect(() => {
    getOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <PrimaryHeading>Transactions</PrimaryHeading>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">type</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Settled Amount ($)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions?.length > 0 &&
              transactions?.map((row: any) => <Row key={row.id} row={row} />)}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Transactions;
