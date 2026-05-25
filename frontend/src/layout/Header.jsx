import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, Menu, X } from "lucide-react";
import axios from "axios";

function Header() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);

  const handle_logout = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/logout",
        {},
        { withCredentials: true }
      );

      if (res.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navLinks = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/authors", label: "Authors" },
    { to: "/books", label: "Books" },
    { to: "/report", label: "Report" },
  ];

  return (
    <header className="bg-blue-600 shadow-md sticky top-0 z-50 print:hidden">
      <div className="max-w-7xl mx-auto px-4 py-3">
        {/* Desktop & Mobile Header */}
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/dashboard" className="text-white text-2xl font-bold">
              Library System
            </Link>
          </div>

          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-white hover:text-blue-200 font-medium"
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={handle_logout}
              className="flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 font-medium"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2 rounded hover:bg-blue-700"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-blue-500">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-blue-200 px-3 py-2 rounded font-medium"
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={() => {
                  handle_logout();
                  setIsOpen(false);
                }}
                className="flex items-center gap-2 bg-white text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-50 font-medium w-full justify-center"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;