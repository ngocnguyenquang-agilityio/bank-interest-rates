'use client';

import { Button } from '@/components';
import { HTMLAttributes, ReactNode } from 'react';

// Hooks
import { useClickOutside } from '@/hooks';
interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  content: string;
  onClickHideModal: () => void;
  children?: ReactNode;
}

export const Modal = ({ title, content, onClickHideModal, children, ...rest }: ModalProps) => {
  const modalRef = useClickOutside(() => {
    onClickHideModal();
  });

  return (
    <>
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        {...rest}
      >
        <div className="relative w-full my-6 mx-auto max-w-2xl">
          <div
            className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
            ref={modalRef}
          >
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-2xl font-semibold">{title}</h3>
              <span
                className=" h-6 w-6 text-xl block cursor-pointer outline-none focus:outline-none"
                onClick={onClickHideModal}
              >
                x
              </span>
            </div>
            <div className="relative p-6 flex-auto">
              <p className="my-4 text-blueGray-500 text-lg leading-relaxed">{content}</p>
            </div>
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b gap-2">
              <Button variant="outlineSecondary" onClick={onClickHideModal}>
                Close
              </Button>
              {children}
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black" />
    </>
  );
};
