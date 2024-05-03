'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="grid h-screen place-content-center text-6xl">
      <h2>Something went wrong!</h2>
      {error && <p className="text-red-500">{error.message}</p>}
      <button
        className="my-4 rounded-xl bg-red-400 p-4 font-medium text-white"
        onClick={reset}
      >
        Try again
      </button>
    </div>
  );
}
