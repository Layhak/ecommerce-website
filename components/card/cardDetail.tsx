'use client';
import { Card } from '@nextui-org/card';
import { Image } from '@nextui-org/image';
import {
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
} from '@nextui-org/modal';
import React from 'react';

type PropsType = {
  image: string;
};

function CardDetail({ image }: PropsType) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <Card isFooterBlurred radius="lg" className="w-[100%] border-none">
      <Image
        alt="Woman listing to music"
        className="h-96 w-full cursor-pointer rounded-large object-cover object-center md:min-w-[700px] lg:min-w-[400px]"
        src={image}
        onClick={onOpen}
      />
      <Modal isOpen={isOpen} size={'4xl'} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalBody className={'p-8'}>
                <Image
                  alt={image}
                  src={image}
                  className={' max-h-[750px] w-full min-w-[830px] rounded-none'}
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </Card>
  );
}

export default CardDetail;
