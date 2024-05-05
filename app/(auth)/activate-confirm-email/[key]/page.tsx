import React from 'react';
import { Button } from '@nextui-org/button';
import Link from 'next/link';

type Props = {
  params: {
    key: string;
  };
  searchParams: any;
};
export default function Page() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white py-6 dark:bg-black sm:py-12">
      <div className="flex max-w-xl flex-col items-center px-5 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100"
          height="100"
          viewBox="0 0 24 24"
        >
          <path
            fill="green"
            d="m8.6 22.5l-1.9-3.2l-3.6-.8l.35-3.7L1 12l2.45-2.8l-.35-3.7l3.6-.8l1.9-3.2L12 2.95l3.4-1.45l1.9 3.2l3.6.8l-.35 3.7L23 12l-2.45 2.8l.35 3.7l-3.6.8l-1.9 3.2l-3.4-1.45zm2.35-6.95L16.6 9.9l-1.4-1.45l-4.25 4.25l-2.15-2.1L7.4 12z"
          />
        </svg>
        <h2 className="mb-2 text-[42px] font-bold text-zinc-800 dark:text-foreground">
          Check your inbox
        </h2>
        <p className="mb-2 text-lg text-zinc-500">
          We are glad, that you’re with us ? We’ve sent you a verification link
          to the email address .
        </p>
        <Button
          as={Link}
          href="/login"
          color={'warning'}
          variant={'shadow'}
          className="mt-3 inline-block w-96 rounded  px-5 py-3 font-medium text-foreground  "
        >
          Open the App →
        </Button>
      </div>
    </div>
  );
}
