import { useState } from 'react';

export const useModal = () => {
  const [isShowModal, setIsShowModal] = useState(false);

  const openModal = () => {
    setIsShowModal(true);
  };

  const hideModal = () => {
    setIsShowModal(false);
  };

  return {
    isShowModal,
    openModal,
    hideModal
  };
};
