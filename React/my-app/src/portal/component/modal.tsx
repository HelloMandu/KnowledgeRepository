import { ReactNode } from "react";
import styled from "@emotion/styled";

const BackDrop = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
  transition: opacity 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

interface ModalProps {
  show: boolean;
  children: ReactNode;
  onClose: () => void;
}

export const Modal = ({ show, children, onClose }: ModalProps) => {
  if (!show) {
    return null;
  }
  return <BackDrop onClick={onClose}>{children}</BackDrop>;
};
