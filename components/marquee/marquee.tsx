'use client';
import React from 'react';
import Marquee from 'react-fast-marquee';
import { Image } from '@nextui-org/image';

export default function InfiniteCarouselComponent() {
  return (
    <div className="mt-5 flex w-full items-center justify-center">
      <Marquee
        pauseOnHover={true} // Changed from true to false
        className="  h-[100px] overflow-hidden"
      >
        <div className=" mx-5 flex h-[350px] flex-col items-center justify-center pr-10 ">
          <Image
            src="https://api.iconify.design/logos:aws.svg"
            className="w-20 rounded-none "
            alt=""
          />
        </div>

        <div className=" mx-5 flex h-[350px] flex-col items-center justify-center pr-10 ">
          <Image
            src="https://api.iconify.design/logos:apple-app-store.svg"
            className="w-16  rounded-none "
            alt=""
          />
        </div>

        <div className=" mx-5 flex h-[350px] flex-col items-center justify-center pr-10 ">
          <Image
            src="https://api.iconify.design/logos:android-vertical.svg"
            className="w-24 rounded-none "
            alt=""
          />
        </div>

        <div className=" mx-5 flex h-[350px] flex-col items-center justify-center pr-10 ">
          <Image
            src="https://api.iconify.design/logos:kickstarter.svg"
            className="w-40 rounded-none "
            alt=""
          />
        </div>

        <div className=" mx-5 flex h-[350px] flex-col items-center justify-center pr-10 ">
          <Image
            src="https://api.iconify.design/logos:microsoft.svg"
            className="w-40 rounded-none "
            alt=""
          />
        </div>

        <div className=" mx-5 flex h-[350px] flex-col items-center justify-center pr-10 ">
          <Image
            src="https://api.iconify.design/logos:get-satisfaction.svg"
            className="w-40 rounded-none "
            alt=""
          />
        </div>

        <div className=" mx-5 flex h-[350px] flex-col items-center justify-center pr-10 ">
          <Image
            src="https://api.iconify.design/logos:spotify.svg"
            className="w-40 rounded-none "
            alt=""
          />
        </div>

        <div className=" mx-5 flex h-[350px] flex-col items-center justify-center pr-10 ">
          <Image
            src="https://api.iconify.design/logos:samsung.svg"
            className="w-40 rounded-none "
            alt=""
          />
        </div>
      </Marquee>
    </div>
  );
}
