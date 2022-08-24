import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import VisibilityIcon from "@mui/icons-material/Visibility";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ApiConfigURL } from "../../../../config/apiConfig";
import { OrdersContext } from "../../../../context/OrdersContext";
import ResponseModal from "../ResponseModal";
import RefundForm from "../RefundForm";
import CaptureForm from "../CaptureForm";

const Row = (props: { row: any; setResponseMessage: any }) => {
  const navigate = useNavigate();
  const orderContext = useContext(OrdersContext);
  const [isTransactionChanged, setTransactionChanged] = useState(false);
  const { row, setResponseMessage } = props;
  const [expand, setExpand] = useState(false);

  const handleReserve = (id: string) => {
    orderContext?.setActionState("reserve");
    axios
      .post(`${ApiConfigURL}/shopOrders/${id}/reserve`)
      .then((response) => {
        setResponseMessage("Transaction is successfully reserved!");
        setTransactionChanged(true);
      })
      .catch((error) => {
        if (error?.response) {
          setResponseMessage(error?.response?.data?.message + ".");
          console.log("error", error, error?.response?.data?.message);
        }
      });
  };

  const handleRelease = (id: string) => {
    orderContext?.setActionState("release");
    axios
      .post(`${ApiConfigURL}/shopOrders/${id}/release`)
      .then((response) => {
        setResponseMessage("Transaction is successfully released!");
        setTransactionChanged(true);
      })
      .catch((error) => {
        if (error?.response) {
          setResponseMessage(error?.response?.data?.message + ".");
          console.log("error", error, error?.response?.data?.message);
        }
      });
  };

  const handleRefund = (order: any) => {
    orderContext?.setSelectedOrder(order);
    orderContext?.setActionState("refund");
  };

  const handleCapture = (order: any) => {
    orderContext?.setSelectedOrder(order);
    orderContext?.setActionState("capture");
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setExpand(!expand)}
          >
            {expand ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {`${row.id}`}
        </TableCell>
        <TableCell align="right">{row.orderAmount}</TableCell>
        <TableCell align="right">{row.settledAmount}</TableCell>

        <TableCell align="right">
          <span
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "self",
            }}
          >
            <button onClick={() => handleReserve(row?.id)}>Reserve</button>
            <button onClick={() => handleRelease(row?.id)}>Release</button>
            <button onClick={() => handleRefund(row)}>Refund</button>
            <button onClick={() => handleCapture(row)}>Capture</button>
          </span>
        </TableCell>
        <TableCell>
          {(isTransactionChanged || row?.transactions?.length > 0) && (
            <VisibilityIcon
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate(`/transactions/${row?.id}`);
              }}
            />
          )}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={expand} timeout="auto" unmountOnExit>
            {row?.orderLines?.length > 0 && (
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Order Lines
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Code</TableCell>
                      <TableCell align="left">description</TableCell>
                      <TableCell align="right">quantity</TableCell>
                      <TableCell align="right">Price ($)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.orderLines?.map((orderLine: any) => (
                      <TableRow key={orderLine?.id}>
                        <TableCell component="th" scope="row">
                          {orderLine?.id}
                        </TableCell>
                        <TableCell>{orderLine?.code}</TableCell>
                        <TableCell align="left">
                          {orderLine?.description}
                        </TableCell>
                        <TableCell align="right">
                          {orderLine?.quantity}
                        </TableCell>
                        <TableCell align="right">{orderLine?.price}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            )}
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

const OrdersTable = ({ data }: any) => {
  const orderContext = useContext(OrdersContext);
  const [responseMessage, setResponseMessage] = useState("");
  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>ID</TableCell>
              <TableCell align="right">Order Amount</TableCell>
              <TableCell align="right">Settled Amount</TableCell>
              <TableCell align="center">Operations</TableCell>
              <TableCell align="center">View</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.length > 0 &&
              data?.map((row: any) => (
                <Row
                  key={row.id}
                  row={row}
                  setResponseMessage={setResponseMessage}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {(orderContext?.actionState === "reserve" ||
        orderContext?.actionState === "release") &&
        responseMessage && <ResponseModal responseMessage={responseMessage} />}
      {orderContext?.actionState === "refund" && <RefundForm />}
      {orderContext?.actionState === "capture" && <CaptureForm />}
    </>
  );
};

export default OrdersTable;
