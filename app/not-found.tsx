import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen w-screen flex items-center justify-center flex-col space-y-3">
      <h2>404 | Not Found</h2>
      <p>Could not find requested resource!</p>
      <Link
        href="/"
        className="px-3 py-3 border rounded-lg dark:hover:bg-neutral-900 hover:bg-neutral-300"
      >
        Return Home
      </Link>
    </div>
  );
}
