import React, { useEffect, useState } from 'react';
import { ImageType, ModalTypeWithId, ProductType } from '@/libs/difinition';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';
import {
  useLazyGetProductByIdQuery,
  useUpdateProductMutation,
} from '@/redux/service/product';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import ProductDropdownComponent from '@/components/dropdown/ProductDropdownComponent';
import { PlusIcon } from '@/components/icons';
import CreateProductImageModalComponent from '@/components/modal/CreateProductImageModal';

type CategoryType = {
  name: string;
};
type UpdateProductType = {
  id: number;
  category: CategoryType;
  name: string;
  price: number;
  quantity: number;
  desc: string;
  image?: string;
};
type UpdateProductProps = {
  product?: ProductType;
};
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  price: Yup.number().required('Price is required'),
  desc: Yup.string().required('Description is required'),
  category: Yup.object().shape({
    name: Yup.string().required('Category name is required'),
  }),
});

export default function UpdateModalComponent({
  id,
  isOpen,
  onOpenChange,
}: ModalTypeWithId & UpdateProductProps) {
  const CreateCategoryIconModal = useDisclosure();
  const CreateProductImageModal = useDisclosure();
  const [trigger, { data: product, error: fetchError }] =
    useLazyGetProductByIdQuery();
  console.log(product);
  const [updateProduct, { isLoading, error: updateError }] =
    useUpdateProductMutation();

  const [productImage, setProductImage] = useState<ImageType | null>(null);
  const [categoryImage, setCategoryImage] = useState<ImageType | null>(null);
  useEffect(() => {
    if (isOpen) {
      trigger(id);
    }
  }, [isOpen, id, trigger]);
  useEffect(() => {
    if (product) {
      setProductImage({
        id: product.id, // Set the correct id
        name: product.name, // Set the correct name
        image: product.image,
      });
      setCategoryImage({
        id: product.category.id, // Set the correct id
        name: product.category.name, // Set the correct name
        image: product.category.icon,
      });
    }
  }, [product]);

  const initialValues: UpdateProductType = {
    id: product?.id || 0,
    category: {
      name: product?.category || '',
    },
    name: product?.name || '',
    price: Number(product?.price) || 0,
    image: product?.image || '',
    quantity: Number(product?.quantity) || 0,
    desc: product?.desc || '',
  };

  const handleUpdateProduct = async (values: UpdateProductType) => {
    try {
      const result = await updateProduct({
        id: values.id,
        updatedProduct: {
          category: {
            name: values.category.name,
            icon: categoryImage?.image,
          },
          name: values.name,
          price: values.price,
          quantity: values.quantity,
          desc: values.desc,
          image: productImage?.image,
        },
      });

      // @ts-ignore
      if (result.data) {
        toast.success('Product updated successfully', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
          transition: Bounce,
        });
        // Wait for 2 seconds and then redirect to the shop page
        setTimeout(() => {
          window.location.href = '/my-shop';
        }, 2000);
      }
    } catch (error) {
      console.error('Failed to update product', error); // Log the error
    }
  };

  return (
    <>
      <Formik
        onSubmit={handleUpdateProduct}
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize // allows initialValues to update when product data changes
      >
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          isDismissable={false}
          className={'h-[75%] overflow-y-auto'}
          isKeyboardDismissDisabled={true}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Update Product
                </ModalHeader>
                <ModalBody>
                  <Form method="POST" className="space-y-6">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Product Name
                        </label>
                        <Field
                          className="block w-full rounded-md border-0 px-3 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          type="text"
                          name="name"
                          id="name"
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="text-xs italic text-red-500"
                        />
                      </div>
                      <div className="sm:col-span-1">
                        <label
                          htmlFor="price"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Price
                        </label>
                        <Field
                          className="block w-full rounded-md border-0 px-3 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          type="text"
                          name="price"
                          id="price"
                        />
                        <ErrorMessage
                          name="price"
                          component="div"
                          className="text-xs italic text-red-500"
                        />
                      </div>
                      <div className="sm:col-span-1">
                        <label
                          htmlFor="quantity"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Quantity
                        </label>
                        <Field
                          className="block w-full rounded-md border-0 px-3 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          type="text"
                          name="quantity"
                          id="quantity"
                        />
                        <ErrorMessage
                          name="quantity"
                          component="div"
                          className="text-xs italic text-red-500"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="desc"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Description
                        </label>
                        <Field
                          as="textarea"
                          className="block w-full rounded-md border-0 px-3 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          name="desc"
                          id="desc"
                          rows={4}
                        />
                        <ErrorMessage
                          name="desc"
                          component="div"
                          className="text-xs italic text-red-500"
                        />
                      </div>
                      <div className={'flex gap-5'}>
                        <ProductDropdownComponent
                          selectedImage={productImage}
                          setSelectedImage={setProductImage}
                        />
                        <Button
                          color={'default'}
                          variant={'shadow'}
                          onPress={CreateProductImageModal.onOpen}
                          isIconOnly
                        >
                          <PlusIcon />
                        </Button>
                      </div>
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="category.name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Category Name
                        </label>
                        <Field
                          className="block w-full rounded-md border-0 px-3 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          type="text"
                          name="category.name"
                          id="category.name"
                        />
                        <ErrorMessage
                          name="category.name"
                          component="div"
                          className="text-xs italic text-red-500"
                        />
                      </div>
                    </div>
                    <div className={'grid grid-cols-2 gap-5'}>
                      <Button color="danger" variant="shadow" onPress={onClose}>
                        Close
                      </Button>
                      <Button
                        color="success"
                        type={'submit'}
                        variant={'shadow'}
                        className={'text-foreground'}
                        onPress={onClose}
                      >
                        Update
                      </Button>
                    </div>
                  </Form>
                </ModalBody>
                <ModalFooter></ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </Formik>
      <ToastContainer />
      <CreateProductImageModalComponent
        isOpen={CreateProductImageModal.isOpen}
        onClose={CreateProductImageModal.onClose}
        onOpenChange={CreateProductImageModal.onOpenChange}
      />
    </>
  );
}
