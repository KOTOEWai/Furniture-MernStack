import { Link } from "react-router-dom";


export default function Component() {
  return (
    <div className="flex items-center min-h-screen px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="w-full space-y-6 text-center">
        <div className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">404 Page Not Found</h1>
          <p className="text-gray-500">Sorry, we couldn&#x27;t find the page you&#x27;re looking for.</p>
        </div>
        <Link
          to="/"
          className="inline-flex items-center h-10 px-8 text-sm font-medium transition-colors bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-100 hover:text-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
         
        >
          Return to website
        </Link>
      </div>
    </div>
  )
}