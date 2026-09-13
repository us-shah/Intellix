"use client";

export default function Error({
  error,
}: {
  error: Error;
}) {
  return (
    <div className="p-8 text-red-500">
      {error.message}
    </div>
  );
}