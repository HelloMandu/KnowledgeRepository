import { useState } from "react";
import { Modal, ModalContent } from "./component";

export const ModalContainer = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  return (
    <>
      <button onClick={() => setOpenModal((openModal) => !openModal)}>
        Modal
      </button>
      <Modal
        show={openModal}
        onClose={() => setOpenModal((openModal) => !openModal)}
      >
        <ModalContent title="Modal" content="일반 모달입니다." />
      </Modal>
    </>
  );
};
