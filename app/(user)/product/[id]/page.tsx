'use client';
import React from 'react';
import { Button } from '@nextui-org/button';
import Link from 'next/link';
import CardDetail from '@/components/card/cardDetail';
import { useGetProductByIdQuery } from '@/redux/service/product';
import { useAppDispatch } from '@/redux/hook';
import { addToCart } from '@/redux/feature/cartSlice';

type Props = {
  params: { id: any };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function ProductDetail({ params }: Props) {
  const { id } = params;
  const { data, error, isLoading } = useGetProductByIdQuery(id);
  const dispatch = useAppDispatch();

  const quantity = data?.quantity | 0;
  const price = data?.price | 0;
  const image = data?.image ?? '';
  const name = data?.name ?? '';

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // event.stopPropagation(); // Prevents the event from bubbling up to the card's onClick
    console.log('Button clicked');
    dispatch(addToCart({ id, name, image, price, quantity }));
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading product details</p>;
  }

  if (!data) {
    return <p>Product not found</p>;
  }

  return (
    <section className={'mt-10 min-h-screen'}>
      <Link href={'/'}>Go back</Link>
      <div className={'grid grid-cols-1 gap-5 lg:grid-cols-3'}>
        <div>
          <h1 className={'pb-5 pt-20 text-4xl font-bold'}>
            Product Detail
            <span className={'block pt-2 text-medium font-normal'}>
              created by: {data.seller ?? 'Layhak'}
            </span>
            <span className={'block pt-2 text-medium font-normal'}>
              on: {data.created_at?.substring(0, 10) ?? 'Layhak'}
            </span>
          </h1>
          <CardDetail image={data.image} />
        </div>
        <div className={'col-span-2 py-20 '}>
          <h1 className={'px-5 pb-5 pt-2 text-3xl font-bold'}>{data.name}</h1>
          <h3
            className={
              'min-w-1/4 mx-5 my-5 max-w-[300px] rounded-full bg-amber-400 p-2 text-center text-medium font-bold text-gray-800 '
            }
          >
            {data.category}
          </h3>
          <div className={'min-h-[200px]'}>
            <p className={'p-5 text-lg text-gray-800 dark:text-gray-400 '}>
              {data.desc}
            </p>
          </div>
          <div className={'flex items-end justify-between gap-5'}>
            <div>
              <p className={'my-5 px-5 pt-5 text-2xl font-bold'}>
                ${data.price}
              </p>
              <Button
                color={'warning'}
                className={'mx-5  text-gray-100'}
                onClick={handleButtonClick}
                variant="shadow"
              >
                Add to cart
              </Button>
            </div>
            <h1 className={'me-5 text-xl font-bold md:text-2xl lg:text-3xl'}>
              In-Stock: {data.quantity}
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
