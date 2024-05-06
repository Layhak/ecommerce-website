'use client';
import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';
import React from 'react';
import { ModalTypeWithId } from '@/libs/difinition';
import { useDeleteProductMutation } from '@/redux/service/product';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function DeleteModalComponent({
  id,
  isOpen,
  onOpenChange,
}: ModalTypeWithId) {
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
  const handleDelete = async () => {
    try {
      await deleteProduct({ id: id });
      toast.success('Product deleted successfully', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        transition: Bounce,
      });
      //delay 5s to reload page
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Are you sure you want to delete this product?
              </ModalHeader>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="danger"
                  onPress={() => {
                    handleDelete().then((r) => console.log(r));
                    onClose();
                  }}
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <ToastContainer />
    </>
  );
}
