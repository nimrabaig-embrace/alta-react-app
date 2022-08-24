import React from "react";
import { Overlay, ModalContent } from "./styled";

export const Modal = ({ children, onClose = () => {} }: any) => {
  return (
    <>
      <Overlay onClick={onClose}>
        <ModalContent>{children}</ModalContent>
      </Overlay>
    </>
  );
};

export default Modal;
