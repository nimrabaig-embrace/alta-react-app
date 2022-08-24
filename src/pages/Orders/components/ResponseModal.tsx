import React, { useContext } from "react";
import Button from "../../../components/Button";
import Modal from "../../../components/Modal";
import { OrdersContext } from "../../../context/OrdersContext";

const ResponseModal: React.FC<{ responseMessage: string }> = ({
  responseMessage,
}) => {
  const orderContext = useContext(OrdersContext);
  return (
    <Modal onClose={() => orderContext?.setActionState(null)}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          margin: "0px auto",
        }}
      >
        <h4>Response</h4>
        <hr
          style={{
            color: "rgba(0, 0, 0, 0.87)",
            backgroundColor: "rgba(0, 0, 0, 0.87)",
            height: 0.1,
            width: "100%",
          }}
        />
        <p style={{ marginBottom: 75 }}>{responseMessage}</p>
        <Button onClick={() => orderContext?.setActionState(null)}>
          Close
        </Button>
      </div>
    </Modal>
  );
};

export default ResponseModal;
