'use client';

import { useAppDispatch, useAppSelector } from '@/redux/hook';
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
  selectProducts,
  selectTotalPrice,
} from '@/redux/feature/cartSlice';
import { useEffect, useState } from 'react';
import { CartProductType } from '@/libs/difinition';
import { Image } from '@nextui-org/image';
import { LuMinus, LuPlus, LuTrash } from 'react-icons/lu';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/react';

export default function page() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const products = useAppSelector(selectProducts);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const totalPrice = useAppSelector(selectTotalPrice);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useAppDispatch();

  //display number of product that only unique select
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [uniqueProducts, setUniqueProducts] = useState<CartProductType[]>([]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    // Filter unique products based on their IDs
    const unique = products.filter(
      (product, index, self) =>
        index === self.findIndex((t) => t.id === product.id)
    );

    // Update the state with the unique products
    setUniqueProducts(unique);
  }, [products]);

  const totalPriceEachItem = () => {};

  return (
    <main className=" p-8 md:p-16">
      <section className="mx-auto pt-8 md:max-w-screen-lg  ">
        {products.length == 0 && (
          <div className="my-32 flex flex-col items-center justify-center ">
            <Image
              alt="cartEmpty"
              src={'https://store.istad.co/media/product_images/cartEmpty.png'}
              width={200}
              height={200}
            />
            <p className="mt-4 text-2xl font-semibold ">Your cart is empty!</p>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <p>Look like you haven't make any choice yet...</p>
          </div>
        )}

        {products.length !== 0 && (
          <div className="grid grid-cols-1 overflow-y-auto lg:grid-cols-5">
            <div className="col-span-3 p-4 ">
              <div className="flex justify-between">
                <h1 className="mb-8 text-start text-xl font-bold uppercase">
                  Shopping Cart
                </h1>
                <span className="text-lg font-semibold">
                  {uniqueProducts.length} Items
                </span>
              </div>

              <hr />
              <div className={'h-[450px] overflow-y-auto'}>
                {uniqueProducts.map((product) => (
                  <div
                    className="my-4 flex w-full  flex-col items-center justify-between  space-x-4 space-y-4  rounded-xl bg-gray-50 p-4 dark:bg-gray-900 md:flex-row"
                    key={product.id}
                  >
                    <div>
                      <Image
                        className="h-[100px] w-[80px] object-cover "
                        src={product.image}
                        alt={product.name}
                      />
                    </div>

                    <div>
                      <p className="line-clamp-1 max-w-24 text-center text-lg">
                        {product.name}
                      </p>
                      <p className="text-orange-10 text-center text-lg font-bold">
                        ${product.price}
                      </p>
                    </div>

                    <div className="flex flex-col items-center justify-evenly gap-4 md:flex-grow md:flex-row ">
                      {/* increase button */}
                      <div className="flex ">
                        <div className="flex h-8 w-8 items-center justify-center rounded-l-lg border">
                          <LuPlus
                            onClick={() =>
                              dispatch(incrementQuantity(product.id))
                            }
                          />
                        </div>

                        <div className="flex h-8  w-8 items-center justify-center border">
                          <span>{product.quantity}</span>
                        </div>

                        <div className=" flex h-8  w-8 items-center justify-center rounded-r-lg border">
                          <LuMinus
                            onClick={() =>
                              dispatch(decrementQuantity(product.id))
                            }
                          />
                        </div>
                      </div>

                      <div>
                        <p className="text-orange-10 text-lg font-bold">
                          ${product.price * (product.quantity || 1)}
                        </p>
                      </div>

                      {/* remoove button */}
                      <div>
                        <Button
                          isIconOnly
                          onClick={() =>
                            dispatch(removeFromCart({ id: product.id }))
                          }
                          className="rounded-xl bg-red-500 p-2 text-white"
                        >
                          <LuTrash />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="0 bg-gary-50 col-span-2 m-4 h-[500px] rounded-lg p-4
             dark:bg-gray-950"
            >
              <h1 className="mb-8 text-start text-xl font-bold uppercase">
                Order Summary
              </h1>

              <hr />

              <div className="mt-4 flex items-center justify-between">
                <p className="text-based font-semibold">
                  {uniqueProducts.length} Items
                </p>
                <p className="text-based font-semibold">${totalPrice}</p>
              </div>

              <div className="my-4 flex w-full flex-col gap-4 py-4">
                <Input
                  type="text"
                  label="shipping"
                  placeholder="Second Delivery $5.00"
                />
                <Input
                  type="text"
                  label="Promotion Code"
                  placeholder="xxxx xxxx xxxx"
                />
                <Button
                  color={'success'}
                  variant={'ghost'}
                  radius={'md'}
                  className={'w-full'}
                >
                  Apply
                </Button>
              </div>

              <hr />

              <div className="my-4 flex items-center justify-between">
                <p className="text-based font-semibold">
                  {products.length} Items
                </p>
                <p className="text-orange-10 text-lg font-bold">
                  ${totalPrice}
                </p>
              </div>

              <Button
                color={'warning'}
                radius={'md'}
                variant={'shadow'}
                className={'w-full'}
              >
                Checkout
              </Button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
