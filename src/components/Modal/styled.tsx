import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;


export const ModalContent = styled.div`
  background-color: #ffffff;
  border-radius: 20px;
  margin: auto;
  margin-top: 80px;
  min-height: 250px;
  max-height: 680px;
  z-index: 10;
  overflow-y: auto;
  border: 1px solid rgba(0, 0, 0, 0.08);
  // @media (max-width: 1024px) {
  //   width: 95%;
  // }
  padding: 30px;
  width: 30%;
`;
