import React, { useState } from 'react';
import { ImageType, ModalType, ProductType } from '@/libs/difinition';
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
import { useCreateProductMutation } from '@/redux/service/product';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import ProductDropdownComponent from '@/components/dropdown/ProductDropdownComponent';
import CategoryDropdownComponent from '@/components/dropdown/CategoryDropdownComponent';
import { PlusIcon } from '@/components/icons';
import CreateCategoryIconModalComponent from '@/components/modal/CreateCategoryIconModal';
import CreateProductImageModalComponent from '@/components/modal/CreateProductImageModal';

const initialValues: ProductType = {
  category: {
    name: '',
    icon: '',
  },
  name: '',
  price: 0,
  quantity: 0,
  desc: '',
  image: '',
};
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  price: Yup.number()
    .required('Price is required')
    .min(0, 'Price must be greater than 0'),
  quantity: Yup.number()
    .required('Quantity is required')
    .min(0, 'Quantity must be greater than 0'),
  desc: Yup.string().required('Description is required'),
  category: Yup.object().shape({
    name: Yup.string().required('Category name is required'),
  }),
});

export default function CreateModalComponent({
  isOpen,
  onOpenChange,
}: ModalType) {
  const CreateCategoryIconModal = useDisclosure();
  const CreateProductImageModal = useDisclosure();
  const [createProduct, { data, isLoading, error }] =
    useCreateProductMutation();
  const [categoryImage, setCategoryImage] = useState<ImageType | null>(null);
  const [productImage, setProductImage] = useState<ImageType | null>(null);
  const handleCreateProduct = async (values: ProductType) => {
    try {
      // Use the form values to create a new product
      const result = await createProduct({
        newProduct: {
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

      // If the product creation was successful, show the toast notification
      // @ts-ignore
      if (result.data) {
        toast.success('Product created successfully', {
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
        //wait for 2 seconds and then reload
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.error('Error during product creation:', error);
    }
  };
  return (
    <>
      <Formik
        onSubmit={handleCreateProduct}
        initialValues={initialValues}
        validationSchema={validationSchema}
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
                  Create Product
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
                    <div className={'flex gap-5'}>
                      <CategoryDropdownComponent
                        selectedImage={categoryImage}
                        setSelectedImage={setCategoryImage}
                      />
                      <Button
                        color={'default'}
                        variant={'shadow'}
                        onPress={CreateCategoryIconModal.onOpen}
                        isIconOnly
                      >
                        <PlusIcon />
                      </Button>
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
                        onPress={() => {
                          // handleDelete().then((r) => console.log(r));
                          onClose();
                        }}
                      >
                        Create
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
      <CreateCategoryIconModalComponent
        isOpen={CreateCategoryIconModal.isOpen}
        onOpenChange={CreateCategoryIconModal.onOpenChange}
        onClose={CreateCategoryIconModal.onClose}
      />
      <CreateProductImageModalComponent
        isOpen={CreateProductImageModal.isOpen}
        onClose={CreateProductImageModal.onClose}
        onOpenChange={CreateProductImageModal.onOpenChange}
      />
    </>
  );
}
