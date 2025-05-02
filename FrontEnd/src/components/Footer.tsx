import React from 'react';
import { Github, Twitter, Instagram, Twitch } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-background-light text-text-secondary py-6 px-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p>© 2025 FURIA Fan Chat. All rights reserved.</p>
            <p className="text-sm">Not officially affiliated with FURIA Esports.</p>
          </div>
          <div className="flex space-x-4">
            <SocialIcon icon={<Twitter size={20} />} />
            <SocialIcon icon={<Instagram size={20} />} />
            <SocialIcon icon={<Twitch size={20} />} />
            <SocialIcon icon={<Github size={20} />} />
          </div>
        </div>
      </div>
    </footer>
  );
};

interface SocialIconProps {
  icon: React.ReactNode;
}

const SocialIcon: React.FC<SocialIconProps> = ({ icon }) => {
  return (
    <a
      href="#"
      className="h-10 w-10 rounded-full bg-background flex items-center justify-center hover:bg-primary transition-colors duration-300"
    >
      {icon}
    </a>
  );
};

export default Footer;