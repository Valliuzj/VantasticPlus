// components/Navbar.js
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0">
              <img className="h-8 w-8" src="/logo1.png" alt="Logo" />
            </div>
            <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
              <Link href="/">
                <p className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 hover:border-gray-300 focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out">
                  Home
                </p>
              </Link>
              <Link href="/study-tools">
                <p className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 hover:border-gray-300 focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out">
                  Study tools
                </p>
              </Link>
              <Link href="/subject-areas">
                <p className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 hover:border-gray-300 focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out">
                  Subject areas
                </p>
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <button className="text-gray-900 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Generate
            </button>
            <button className="ml-4 text-gray-900 bg-white hover:bg-gray-100 text-sm font-medium py-2 px-4 rounded border border-gray-300">
              Log in
            </button>
            <button className="ml-4 text-gray-900 bg-yellow-400 hover:bg-yellow-500 text-sm font-medium py-2 px-4 rounded">
              Sign up
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
