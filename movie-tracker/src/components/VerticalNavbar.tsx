import Link from 'next/link';
import { VscHome, VscAccount, VscChecklist, VscStarFull, VscEye, VscClose } from 'react-icons/vsc';

interface VerticalNavbarProps {
  isMobile?: boolean;
  onClose?: () => void;
}

export default function VerticalNavbar({ isMobile = false, onClose }: VerticalNavbarProps) {
  const navItems = [
    { name: 'Home', href: '/', icon: <VscHome size={24} /> },
    { name: 'Films', href: '/films', icon: <VscEye size={24} /> },
    { name: 'Reviews', href: '/reviews', icon: <VscStarFull size={24} /> },
    { name: 'Watchlist', href: '/watchlist', icon: <VscChecklist size={24} /> },
    { name: 'Profile', href: '/u/semihmutlu', icon: <VscAccount size={24} /> },
  ];

  const handleLinkClick = () => {
    if (isMobile && onClose) {
      onClose();
    }
  };

  if (isMobile) {
    return (
      <nav className="h-full w-full flex flex-col py-6 animate-slide-in-left">
        {/* Mobile Header */}
        <div className="flex items-center justify-between px-6 mb-8">
          <div className="font-bold text-2xl text-[#e5383b]">Letterboxd</div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white rounded-lg transition-all duration-200 hover:bg-gray-800"
          >
            <VscClose size={24} />
          </button>
        </div>
        
        {/* Mobile Navigation Items */}
        <ul className="flex flex-col px-4 space-y-2">
          {navItems.map((item, index) => (
            <li key={item.name} style={{ animationDelay: `${index * 100}ms` }} className="animate-fade-in-up">
              <Link
                href={item.href}
                onClick={handleLinkClick}
                className="flex items-center p-4 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                <span className="mr-4">{item.icon}</span>
                <span className="text-lg font-medium">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  return (
    <nav className="h-screen w-20 sticky top-0 bg-[#0b090a] border-r border-gray-800 flex flex-col items-center py-6 transition-all duration-300 hover:w-48 group">
      <div className="font-bold text-2xl text-[#e5383b] mb-10 transition-all duration-300">
        <span className="group-hover:hidden">M</span>
        <span className="hidden group-hover:block text-lg">Letterboxd</span>
      </div>
      <ul className="flex flex-col items-center space-y-6 w-full">
        {navItems.map((item) => (
          <li key={item.name} className="w-full">
            <Link
              href={item.href}
              className="flex items-center justify-center group-hover:justify-start p-3 mx-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200 transform hover:scale-105 relative overflow-hidden"
              title={item.name}
            >
              <span className="z-10">{item.icon}</span>
              <span className="ml-3 opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap hidden group-hover:block text-sm font-medium">
                {item.name}
              </span>
              <div className="absolute inset-0 bg-[#e5383b]/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
