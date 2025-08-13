import { useState } from "react";
import { HiHome, HiMenu, HiX, HiBookmark } from "react-icons/hi";
import { Link } from "react-router-dom";
import SearchBar from "./Search";

interface NavbarProps {
  onSearch?: (value: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav
      role="navigation"
      className="bg-white shadow-md px-6 py-3 fixed w-full top-0 z-50"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo desktop */}
        <div className="hidden md:block text-2xl font-bold text-green-700">
          <Link to="/">Al-Qur'an</Link>
        </div>

        {/* Search desktop */}
        <div className="hidden md:block flex-1 max-w-md mx-4">
          <SearchBar handleSearch={onSearch || (() => {})} />
        </div>

        {/* Menu desktop */}
        <ul className="hidden md:flex space-x-8 text-green-700 font-semibold">
          <li>
            <Link to="/about" className="hover:text-green-900">
              About
            </Link>
          </li>
          <li>
            <Link to="/surah" className="hover:text-green-900">
              Surah
            </Link>
          </li>
          <li>
            <Link to="/bookmark" className="flex items-center gap-2 text-gray-700 hover:text-blue-500">
            <HiBookmark size={18} />
            </Link>
          </li>
        </ul>

        {/* Mobile navbar: Home | Search | Menu button */}
        <div className="flex items-center space-x-3 md:hidden text-green-700 w-full px-4">
          {/* Home icon */}
          <Link to="/" aria-label="Home">
            <HiHome className="w-6 h-6 cursor-pointer" aria-hidden="true" />
          </Link>

          {/* Search bar */}
          <div className="flex-grow">
            <SearchBar handleSearch={onSearch || (() => {})} />
          </div>

          {/* Menu toggle button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? (
              <HiX className="w-7 h-7" />
            ) : (
              <HiMenu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          role="menu"
          className="mt-3 bg-green-50 rounded-md p-4 shadow-lg md:hidden max-w-md mx-auto"
        >
          <ul className="space-y-3 text-green-700 font-semibold">
            <li role="none">
              <Link
                to="/about"
                role="menuitem"
                className="hover:text-green-900 block"
                onClick={() => setMobileMenuOpen(false)} 
              >
                About
              </Link>
            </li>
            <li role="none">
              <Link
                to="/surah"
                role="menuitem"
                className="hover:text-green-900 block"
                onClick={() => setMobileMenuOpen(false)}
              >
                Surah
              </Link>
            </li>
             <Link
                to="/bookmark"
                role="menuitem"
                className="hover:text-green-900 block"
                onClick={() => setMobileMenuOpen(false)} 
              >
                Bookmark
              </Link>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
