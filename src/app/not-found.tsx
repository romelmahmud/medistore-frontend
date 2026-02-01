import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-100 gap-2">
      <div>
        <h2 className="text-xl font-semibold">Not Found</h2>
        <p className="mb-3">Could not find requested resource</p>
        <Link href="/" className="px-4 py-2 text-white bg-gray-800  rounded-sm">
          Return Home
        </Link>
      </div>
    </div>
  );
}
