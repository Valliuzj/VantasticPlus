// components/Navbar.js
import Link from 'next/link';
import { ScreenWrapper } from './ScreenWrapper';
import { Button } from './ui/button';

const Navbar = () => {
  return (
    <nav className='sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all'>
    <ScreenWrapper>
    <div className='flex h-14 items-center justify-between border-b border-zinc-200'>
            <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
              <Link href="/" className='text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 hover:border-gray-300 focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out'>
                  Home
              </Link>

              <Link href="/study-tools" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 hover:border-gray-300 focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out">
                  Study tools
              </Link>

              <Link href="/subject-areas" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 hover:border-gray-300 focus:outline-none focus:border-gray-300 transition duration-150">
                  Subject areas
              </Link>
            </div>

          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <Button className="text-gray-900 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Generate
            </Button>
            <Button className="ml-4 text-gray-900 bg-white hover:bg-gray-100 text-sm font-medium py-2 px-4 rounded border border-gray-300">
              Log in
            </Button>
            <Button className="ml-4 text-gray-900 bg-yellow-400 hover:bg-yellow-500 text-sm font-medium py-2 px-4 rounded">
              Sign up
            </Button>
          </div>

        </div>
      </ScreenWrapper>
    </nav>
  );
};

export default Navbar;
