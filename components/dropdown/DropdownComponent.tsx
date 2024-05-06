'use client';
import React from 'react';
import { Image } from '@nextui-org/image';
import { Button } from '@nextui-org/button';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Pagination,
} from '@nextui-org/react';

type PropsType = {
  results: {
    results: ImageType[];
    total: number;
  } | null;
  setPage: (page: number) => void;
  page: number;
  selectedImage: ImageType | null;
  setSelectedImage: (image: ImageType | null) => void;
};

type ImageType = {
  id: number | string;
  name: string;
  image: string;
};

type DropdownItemType = {
  key: number | string;
  value: string;
  image?: string;
};

const DropDownComponent = ({
  results,
  setPage,
  page,
  selectedImage,
  setSelectedImage,
}: PropsType) => {
  const images: ImageType[] = results?.results || [];
  const totalPages = Math.ceil((results?.total || 0) / 5);

  const handleSelectChange = (selectedId: number | string) => {
    if (selectedId !== 'pagination') {
      const selectedImage = images.find(
        (image) => image.id === Number(selectedId)
      );
      setSelectedImage(selectedImage || null);
    }
  };

  const dropdownItems: DropdownItemType[] = images.map((image) => ({
    key: Number(image.id),
    value: image.name,
    image: image.image,
  }));

  dropdownItems.push({
    key: 'pagination',
    value: 'pagination',
  });

  return (
    <Dropdown closeOnSelect={false}>
      <DropdownTrigger>
        <Button variant="bordered">
          {selectedImage ? selectedImage.name : 'Select Image'}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Select an Image"
        items={dropdownItems}
        onAction={handleSelectChange}
        className={'max-h-72  overflow-y-auto'}
      >
        {(item) =>
          item.key === 'pagination' ? (
            <DropdownItem
              key="pagination"
              className="min-w-72
              justify-center"
              onClick={(e) => e.preventDefault()}
            >
              <Pagination
                total={totalPages}
                page={page}
                onChange={(newPage: number) => setPage(newPage)}
                variant="bordered"
              />
            </DropdownItem>
          ) : (
            <DropdownItem key={item.key} textValue={item.value}>
              <div className="flex items-center gap-2">
                <Image
                  src={item.image as string}
                  alt={item.value}
                  className="mr-2 inline-block h-8 w-8"
                  width={50}
                  height={50}
                />
                <span className={'line-clamp-1 w-44'}>
                  {item.value || 'Default Name'}
                </span>
              </div>
            </DropdownItem>
          )
        }
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropDownComponent;
