import React, { useState } from 'react';
import { Menu, X, MessageSquare, Trophy, Calendar, User } from 'lucide-react';
import furiaLogo from '../assets/Furia_Esports_logo.png';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-background-light py-4 px-6 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <div className="h-10 w-10 mr-3">
            <img src={furiaLogo} alt="FURIA Logo" className="h-full w-full" />
          </div>
          {/* Logo and Title */}
          <h1 className="text-2xl font-bold text-white glow">
            FURIA <span className="text-primary text-gray ">FAN CHAT</span>
          </h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <NavItem icon={<MessageSquare size={18} />} text="Chat" />
          <NavItem icon={<Trophy size={18} />} text="Matches" />
          <NavItem icon={<Calendar size={18} />} text="Schedule" />
          <button className="bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-md transition-colors duration-300 flex items-center">
            <User size={18} className="mr-2" />
            Login
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-background-light mt-4 py-4 px-6 space-y-4 animate-fade-in-down">
          <NavItem icon={<MessageSquare size={18} />} text="Chat" />
          <NavItem icon={<Trophy size={18} />} text="Matches" />
          <NavItem icon={<Calendar size={18} />} text="Schedule" />
          <button className="bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-md transition-colors duration-300 w-full flex items-center justify-center">
            <User size={18} className="mr-2" />
            Login
          </button>
        </div>
      )}
    </nav>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  text: string;
}

const NavItem: React.FC<NavItemProps> = ({ icon, text }) => {
  return (
    <a
      href="#"
      className="text-text-secondary hover:text-primary flex items-center transition-colors duration-300"
    >
      <span className="mr-2">{icon}</span>
      {text}
    </a>
  );
};

export default Navbar;