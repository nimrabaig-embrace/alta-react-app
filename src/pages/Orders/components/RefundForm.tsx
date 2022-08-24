import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import TextField from "@material-ui/core/TextField";
import Button from "../../../components/Button";
import PrimaryHeading from "../../../components/PrimaryHeading";
import axios from "axios";
import { ApiConfigURL } from "../../../config/apiConfig";
import Modal from "../../../components/Modal";
import { OrdersContext } from "../../../context/OrdersContext";

const validationSchema = yup.object({
  amount: yup.number().required("Amount is required"),
});

const RefundForm: React.FC<{}> = () => {
  const orderContext = useContext(OrdersContext);
  const [message, setMessage] = useState<string | null>();
  const formik = useFormik({
    initialValues: {
      amount: 0,
    },
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      if (!message) {
        axios
          .post(
            `${ApiConfigURL}/shopOrders/${orderContext?.selectedOrder?.id}/refund`,
            {
              ...values,
            }
          )
          .then((response) => {
            setMessage("Amount is successfully refunded!");
          })
          .catch((error) => {
            setMessage(error?.response?.data?.message);
          });
      } else {
        orderContext?.setActionState(null);
      }
    },
  });

  return (
    <Modal onClose={() => orderContext?.setActionState(null)}>
      <PrimaryHeading>Refund Transaction</PrimaryHeading>
      <hr
        style={{
          color: "rgba(0, 0, 0, 0.87)",
          backgroundColor: "rgba(0, 0, 0, 0.87)",
          height: 0.1,
          width: "100%",
        }}
      />
      <form
        onSubmit={formik.handleSubmit}
        style={{ margin: "40px 0px", textAlign: "left" }}
      >
        {message ? (
          <p style={{ marginBottom: 30 }}>{message}</p>
        ) : (
          <div style={{ marginBottom: 30 }}>
            <TextField
              fullWidth
              id="amount"
              name="amount"
              label="Amount"
              type={"number"}
              value={formik.values.amount}
              onChange={formik.handleChange}
              error={formik.touched.amount && Boolean(formik.errors.amount)}
              helperText={formik.touched.amount && formik.errors.amount}
            />
          </div>
        )}
        <Button type="submit">{message ? "Close" : "Refund"}</Button>
      </form>
    </Modal>
  );
};

export default RefundForm;
