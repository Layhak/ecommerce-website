'use client';
import {
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from '@nextui-org/react';
import React, { useState } from 'react';
import { ModalType } from '@/libs/difinition';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';
import { useUploadImageMutation } from '@/redux/service/product';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Image } from '@nextui-org/image';
import { Button } from '@nextui-org/button';

const FILE_SIZE = 1024 * 1024 * 2; // 2MB
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];

type Input = {
  name: string;
  fileProduct: null;
};

const initfile: Input = {
  name: '',
  fileProduct: null,
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  fileProduct: Yup.mixed()
    .test('fileFormat', 'Unsupported Format', (value: any) => {
      if (!value) {
        return true;
      }
      return SUPPORTED_FORMATS.includes(value.type);
    })
    .test('fileSize', 'File Size is too large', (value: any) => {
      if (!value) {
        true;
      }
      return value.size <= FILE_SIZE;
    })

    .required('Required'),
});

export default function CreateProductImageModalComponent({
  isOpen,
  onOpenChange,
}: ModalType) {
  const [uploadImage, { data, error }] = useUploadImageMutation();
  const handleUploadImage = async (file: any, name: any) => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', file);
    console.log(formData);

    try {
      const response = await uploadImage({ data: formData }); // Correct way to call the mutation function
      console.log(response); // Handle the response as needed
      toast.success('Upload Image successfully');
    } catch (error) {
      console.error(error); // Handle errors
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
                Upload Product Image
              </ModalHeader>
              <ModalBody>
                <Formik
                  validationSchema={validationSchema}
                  initialValues={initfile}
                  onSubmit={async (values: any) => {
                    console.log(values.fileProduct);
                    console.log(values.name);
                    const name = values.name;
                    const image = values.fileProduct;
                    handleUploadImage(image, name);
                  }}
                >
                  {({ setFieldValue }) => (
                    <Form>
                      <div className="mb-5">
                        <label htmlFor="name">Product image Name</label>
                        <Field
                          type="text"
                          name="name"
                          id="name"
                          className="block w-full rounded-md border-0 px-3 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className={'text-xs text-danger'}
                        />
                      </div>
                      <div className="mb-5">
                        <label htmlFor="fileProduct">Product image</label>
                        <Field
                          type="file"
                          name="fileProduct"
                          id="fileProduct"
                          component={CustomInput}
                          setFieldValue={setFieldValue}
                        />
                        <ErrorMessage name="fileProduct" component="div" />
                      </div>
                      <div className={'flex gap-5'}>
                        <Button
                          variant={'shadow'}
                          color={'danger'}
                          onClick={onClose}
                        >
                          Cancel
                        </Button>
                        {/* handle submit  */}
                        <Button
                          type="submit"
                          variant={'shadow'}
                          color={'success'}
                          onClick={() => {
                            onClose();
                            //wait 5s to reload
                            setTimeout(() => {
                              window.location.reload();
                            }, 5000);
                          }}
                        >
                          Submit
                        </Button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
      <ToastContainer />
    </>
  );
}

const CustomInput = ({ field, form, setFieldValue }: any) => {
  const [imagePreview, setImagePreview] = useState('');

  const handleUploadedFile = (e: any) => {
    const file = e.target.files[0];
    const localUrl = URL.createObjectURL(file);
    console.log(localUrl);
    setImagePreview(localUrl);

    setFieldValue(field.name, file);
  };
  return (
    <div>
      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 dark:border-gray-50">
        <div className="text-center">
          <div className="mt-4 flex text-sm leading-6 text-gray-600">
            <label
              htmlFor="fileProduct"
              className="relative cursor-pointer rounded-md bg-transparent font-semibold text-foreground focus-within:outline-none focus-within:ring-2 focus-within:ring-warning focus-within:ring-offset-2 hover:text-warning"
            >
              <span>Upload a file</span>
              <input
                id={'fileProduct'}
                onChange={(e) => handleUploadedFile(e)}
                type="file"
                className="sr-only"
              />
            </label>
          </div>
          <p className="text-xs leading-5 text-gray-600">
            PNG, JPG, GIF up to 2MB
          </p>
        </div>
      </div>
      {/*<input onChange={(e) => handleUploadedFile(e)} type="file" />*/}
      {imagePreview && (
        <Image width={200} height={200} src={imagePreview} alt="preview" />
      )}
    </div>
  );
};
