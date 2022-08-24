import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import TextField from "@material-ui/core/TextField";
import Button from "../../components/Button";
import { FormContainer } from "./styled";
import PrimaryHeading from "../../components/PrimaryHeading";
import axios from "axios";
import { ApiConfigURL } from "../../config/apiConfig";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  code: yup.string().required("Code is required"),
  description: yup.string().required("description is required"),
  quantity: yup.number().required("Quantity is required"),
  price: yup.number().required("Price is required"),
});

const CreateOrderForm = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      code: "",
      description: "",
      quantity: null,
      price: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      axios
        .post(`${ApiConfigURL}/shopOrders`, {
          orderLines: [{ ...values }],
        })
        .then((response) => {
          console.log("response", response);
          navigate('/');
        })
        .catch((e) => {
          console.log("error", e);
        });
    },
  });

  return (
    <FormContainer>
      <PrimaryHeading>Create Order</PrimaryHeading>
      <form
        onSubmit={formik.handleSubmit}
        style={{ margin: "40px 0px", textAlign: "left" }}
      >
        <div style={{ marginBottom: 30 }}>
          <TextField
            fullWidth
            id="code"
            name="code"
            label="Code"
            value={formik.values.code}
            onChange={formik.handleChange}
            error={formik.touched.code && Boolean(formik.errors.code)}
            helperText={formik.touched.code && formik.errors.code}
          />
          <TextField
            fullWidth
            id="quantity"
            name="quantity"
            label="Quantity"
            value={formik.values.quantity}
            onChange={formik.handleChange}
            error={formik.touched.quantity && Boolean(formik.errors.quantity)}
            helperText={formik.touched.quantity && formik.errors.quantity}
          />
          <TextField
            fullWidth
            id="price"
            name="price"
            label="Price"
            value={formik.values.price}
            onChange={formik.handleChange}
            error={formik.touched.price && Boolean(formik.errors.price)}
            helperText={formik.touched.price && formik.errors.price}
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            id="description"
            name="description"
            label="Description"
            type="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
          />
        </div>
        <Button type="submit">
          Add
        </Button>
      </form>
    </FormContainer>
  );
};

export default CreateOrderForm;
