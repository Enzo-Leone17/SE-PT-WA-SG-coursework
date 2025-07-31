import { Link } from "react-router-dom";
import { useState } from "react";
import { HomeIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

type HeroIcon = React.ComponentType<
  React.PropsWithoutRef<React.ComponentProps<"svg">> & {
    title?: string | undefined;
    titleId?: string | undefined;
  }
>;

export interface NaviLink {
  heroicon?: HeroIcon;
  name: string;
  link: string;
}

interface NavbarProps {
  links: NaviLink[] | undefined;
  baseUrlname: string;
}

export default function Navbar({ links, baseUrlname }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const toggleMobileMenu = (): void => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = (): void => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="relative bg-gray-800 backdrop-blur-lg border-b border-white/10 shadow-2xl">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-800/10 to-blue-800/10 animate-pulse"></div>
      <div className="absolute top-0 left-1/4 w-32 h-16 bg-purple-500/5 rounded-full blur-2xl"></div>
      <div className="absolute top-0 right-1/4 w-32 h-16 bg-blue-500/5 rounded-full blur-2xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 md:h-20">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link
                to="/"
                className="text-xl sm:text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent hover:from-purple-300 hover:to-blue-300 transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex items-center justify-center">
                  <HomeIcon className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
                  <span className="ml-2">{baseUrlname}</span>
                </div>
              </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-6 lg:ml-10 flex items-center space-x-1 lg:space-x-2">
              {links?.map((link) => (
                <Link
                  to={`/${link.link}`}
                  key={link.link}
                  className="relative group text-white/80 hover:text-white px-3 lg:px-4 py-2 lg:py-2.5 rounded-xl text-sm lg:text-base font-medium transition-all duration-300 transform hover:scale-105 hover:bg-white/10 backdrop-blur-sm border border-transparent hover:border-white/20 hover:shadow-lg"
                >
                  <div className="flex-col items-center justify-center">
                    <div className="flex items-center justify-center">
                      {link.heroicon && <link.heroicon className="w-6 h-6" />}
                    </div>
                    <span>{link.name}</span>
                  </div>

                  {/* Animated underline */}
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 group-hover:w-3/4 transition-all duration-300 rounded-full"></span>
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 backdrop-blur-sm border border-transparent hover:border-white/20 transition-all duration-300 transform hover:scale-105 shadow-lg"
              aria-expanded="false"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="w-6 h-6" strokeWidth={2.5} />
              ) : (
                <Bars3Icon className="w-6 h-6" strokeWidth={2.5} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? "max-h-96 opacity-100 pb-4"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 shadow-2xl mt-2 p-4">
            <div className="space-y-2">
              {links?.map((link) => (
                <Link
                  to={`/${link.link}`}
                  key={link.link}
                  onClick={closeMobileMenu}
                  className="block text-white/80 hover:text-white hover:bg-white/10 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 transform hover:scale-[1.02] border border-transparent hover:border-white/20 hover:shadow-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full opacity-60"></div>
                    <span>
                      <div className="flex-col items-center justify-center">
                        <div className="flex items-center justify-center">
                          {link.heroicon && (
                            <link.heroicon className="w-4 h-4" />
                          )}
                        </div>
                        <span>{link.name}</span>
                      </div>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-0 md:hidden"
          onClick={closeMobileMenu}
        />
      )}
    </nav>
  );
}
