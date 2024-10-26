'use client';

export default function Error() {
  return (
    <div className="h-screen text-black flex flex-col gap-3 justify-center items-center ">
      <div className="flex items-center justify-center gap-3 text-red-600">
        <h1 className="text-4xl font-bold ">500</h1>
        <div className="h-5 w-[1px] bg-black "></div>
        <p>Internal Service Error</p>
      </div>
      <div className="flex flex-col gap-4 items-start max-w-96 ml-32 text-gray-500 text-sm">
        <p>Oops, something went wrong.</p>
        <p>
          Please try accessing the home page again or feel free to contact us if
          the problem persists
        </p>
      </div>
    </div>
  );
}
