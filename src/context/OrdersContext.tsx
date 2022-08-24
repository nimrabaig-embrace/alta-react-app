import React, { useState } from "react";
import { OrderContextInterface } from "../types/orderContext.types";

export const OrdersContext = React.createContext<OrderContextInterface | null>(
  null
);

export const OrdersProvider = ({ children }: any) => {
  const [selectedOrder, setSelectedOrder] = useState<string>("");
  const [actionState, setActionState] = useState<string | null>(null);
  return (
    <OrdersContext.Provider
      value={{ selectedOrder, setSelectedOrder, actionState, setActionState }}
    >
      {children}
    </OrdersContext.Provider>
  );
};
