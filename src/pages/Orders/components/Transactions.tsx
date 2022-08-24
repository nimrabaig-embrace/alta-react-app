import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Button from "../../../components/Button";

const Transactions = ({ data }: any) => {
  return (
    <>
      <Box sx={{ margin: 1 }}>
        <Typography variant="h6" gutterBottom component="div">
          Transactions
        </Typography>
        <Table size="small" aria-label="purchases">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>type</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Settled Amount ($)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((transaction: any) => (
              <TableRow key={transaction?.id}>
                <TableCell component="th" scope="row">
                  {transaction?.id}
                </TableCell>
                <TableCell>{transaction?.date}</TableCell>
                <TableCell align="right">{transaction?.type}</TableCell>
                <TableCell align="right">{transaction?.amount}</TableCell>
                <TableCell align="right">
                  {transaction?.settledAmount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      <Button
        style={{
          margin: "0px auto",
        }}
      >
        Close
      </Button>
    </>
  );
};

export default Transactions;
