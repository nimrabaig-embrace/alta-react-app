import React, { useEffect, useState } from "react";
import PrimaryHeading from "../../components/PrimaryHeading";
import { ApiConfigURL } from "../../config/apiConfig";
import axios from "axios";
import OrdersTable from "./components/OrdersTable";
import { OrdersProvider } from '../../context/OrdersContext';

export const Orders: React.FC = () => {
  const [allOrders, setAllOrders] = useState([]);
  const getAllOrders = async () => {
    await axios
      .get(`${ApiConfigURL}/shopOrders`)
      .then(async (response: any) => {
        setAllOrders(response?.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <OrdersProvider>
      <PrimaryHeading>Orders</PrimaryHeading>
      <OrdersTable data={allOrders} />
    </OrdersProvider>
  );
};

export default Orders;
