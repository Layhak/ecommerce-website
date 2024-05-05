'use client';
import React, { useEffect } from 'react';
import { Card, CardFooter } from '@nextui-org/card';
import { Button } from '@nextui-org/button';
import Aos from 'aos';
import InfiniteCarouselComponent from '@/components/marquee/marquee';
import { Image } from '@nextui-org/image';
import 'aos/dist/aos.css';

export default function Page() {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  return (
    <>
      <div className={'grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'}>
        <Card
          radius="lg"
          className=" row-span-1 min-h-[465px] w-full border-none bg-[url('https://nextui.org/images/card-example-6.jpeg')] bg-cover bg-center lg:row-span-2"
          data-aos="fade-up"
        >
          <CardFooter className="absolute bottom-1 z-10 ml-1 w-[calc(100%_-_8px)] justify-between overflow-hidden rounded-large border-1 border-white/20 py-1 shadow-small before:rounded-xl before:bg-white/10">
            <p className="text-tiny text-white/80">Available soon.</p>
            <Button
              className="bg-black/20 text-tiny text-white"
              variant="flat"
              color="default"
              radius="lg"
              size="sm"
            >
              Notify me
            </Button>
          </CardFooter>
        </Card>
        <Card
          isFooterBlurred
          radius="lg"
          className="min-h-[465px] w-full border-none bg-[url('https://nextui.org/images/hero-card.jpeg')]  bg-center object-cover "
          data-aos="fade-up"
        >
          <CardFooter className="absolute bottom-1 z-10 ml-1 w-[calc(100%_-_8px)] justify-between overflow-hidden rounded-large border-1 border-white/20 py-1 shadow-small before:rounded-xl before:bg-white/10">
            <p className="text-tiny text-white/80">Available soon.</p>
            <Button
              className="bg-black/20 text-tiny text-white"
              variant="flat"
              color="default"
              radius="lg"
              size="sm"
            >
              Notify me
            </Button>
          </CardFooter>
        </Card>
        <Card
          data-aos="fade-up"
          isFooterBlurred
          radius="lg"
          className="min-h-[465px] w-full border-none  bg-[url('https://nextui.org/images/card-example-2.jpeg')] bg-center object-cover"
        >
          <CardFooter className="absolute bottom-1 z-10 ml-1 w-[calc(100%_-_8px)] justify-between overflow-hidden rounded-large border-1 border-white/20 py-1 shadow-small before:rounded-xl before:bg-white/10">
            <p className="text-tiny text-white/80">Available soon.</p>
            <Button
              className="bg-black/20 text-tiny text-white"
              variant="flat"
              color="default"
              radius="lg"
              size="sm"
            >
              Notify me
            </Button>
          </CardFooter>
        </Card>
        <div
          className="col-span-1 mt-8 ps-5 text-start lg:col-span-2"
          data-aos="fade-up"
        >
          <h2 className="text-4xl font-semibold">
            Each piece is designed to move with you
          </h2>
          <p className="text-md me-0 mt-2 text-foreground lg:me-3">
            We establish personal relationships with our boutiques to ensure
            each piece is vetted for a stress-free shopping experience.
          </p>
          <div className="mt-6 flex gap-4">
            <Button radius="full" variant={'shadow'} color={'default'}>
              Shop Now
            </Button>
            <Button radius="full" variant={'ghost'} color={'default'}>
              Contact Us
            </Button>
          </div>
        </div>
      </div>
      <div
        className={'my-20 pb-10 text-center text-2xl font-bold text-foreground'}
        data-aos="fade-up"
      >
        <h1>Our Partner</h1>
        <InfiniteCarouselComponent />
      </div>
      <section data-aos="fade-up">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="col-span-1 grid grid-cols-2 gap-4 md:col-span-2">
              <div className={'row-span-2 rounded-xl shadow-lg'}>
                <Image
                  isBlurred
                  isZoomed
                  src="https://nextui.org/images/fruit-2.jpeg"
                  height={640}
                  alt="Casual Fashion"
                  className="min-h-[100%] min-w-full rounded-xl object-cover shadow-lg"
                />
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div className={'p-10'}>
                  <Image
                    isBlurred
                    isZoomed
                    src="https://nextui.org/images/hero-card-complete.jpeg"
                    height={100}
                    alt="Casual Fashion"
                    className="round-xl object-cover  shadow-lg"
                  />
                </div>
                <Image
                  isBlurred
                  isZoomed
                  src="https://nextui.org/images/card-example-2.jpeg"
                  height={100}
                  alt="Elegant Dress"
                  className="rounded-xl  object-cover shadow-lg"
                />
              </div>
            </div>

            <div
              className="col-span-1 flex flex-col justify-center p-4"
              data-aos="fade-up"
            >
              <h2 className="mb-4 text-2xl font-semibold">
                Fashion Essentials
              </h2>
              <p className="mb-4">
                Discover the latest trends in Sparkle. From casual wear to
                formal attire, find the perfect outfit for any occasion.
              </p>
              <ul className="mb-4 text-gray-700">
                <li>
                  Explore a wide range of clothing options, including tops,
                  bottoms, dresses, and accessories.
                </li>
                <li>
                  Stay ahead of the fashion curve with our regularly updated
                  inventory.
                </li>
              </ul>
              <Button
                variant={'shadow'}
                className={
                  ' bg-gradient-to-tr from-orange-700 to-warning text-gray-50'
                }
              >
                Explore
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section>
        <h1>Our Product</h1>
      </section>
    </>
  );
}
