import Link from 'next/link';
import { VscHome, VscAccount, VscChecklist, VscStarFull, VscEye } from 'react-icons/vsc';

export default function VerticalNavbar() {
  const navItems = [
    { name: 'Home', href: '/', icon: <VscHome size={24} /> },
    { name: 'Films', href: '/films', icon: <VscEye size={24} /> },
    { name: 'Reviews', href: '/reviews', icon: <VscStarFull size={24} /> },
    { name: 'Watchlist', href: '/watchlist', icon: <VscChecklist size={24} /> },
    { name: 'Profile', href: '/u/semihmutlu', icon: <VscAccount size={24} /> },
  ];

  return (
    <nav className="h-screen w-20 sticky top-0 bg-[#0b090a] border-r border-gray-800 flex flex-col items-center py-6">
      <div className="font-bold text-2xl text-[#e5383b] mb-10">M</div>
      <ul className="flex flex-col items-center space-y-6">
        {navItems.map((item) => (
          <li key={item.name}>
            <Link
              href={item.href}
              className="flex flex-col items-center p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors duration-200"
              title={item.name}
            >
              {item.icon}
              <span className="text-xs mt-1">{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}