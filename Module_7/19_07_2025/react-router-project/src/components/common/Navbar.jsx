import { Link } from "react-router-dom";

export default function Navbar({links, baseUrlname}) {
  return (
    <nav className="bg-gray-800">
      <div className="max-w-screen mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="text-white font-bold text-xl">
                {baseUrlname}
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {links.map((link) => (
                <Link
                to={`/${link.link}`}
                key={link.link}
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                {link.name}
              </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
