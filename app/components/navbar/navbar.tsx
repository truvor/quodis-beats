'use client';

import {useEffect, useRef, useState} from 'react';
import Link from 'next/link';

export default function Navbar() {
  const dropdownRef = useRef<HTMLUListElement | null>(null);
  const menuRef = useRef<HTMLUListElement | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(prev => !prev);
  };

  const handleBurgerToggle = () => {
    setIsBurgerOpen(prev => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as HTMLElement;

      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setIsDropdownOpen(false);
      }

      if (menuRef.current && !menuRef.current.contains(target)) {
        setIsBurgerOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  return (
    <section className='navigation'>
      <div className='nav-container'>
        <div className='brand'>
          <Link href='/'>Quodis Beats</Link>
        </div>
        <nav ref={menuRef}>
          <div className='nav-mobile'>
            <button onClick={handleBurgerToggle}
                    id='nav-toggle'
                    className={`${isBurgerOpen ? 'active' : ''}`}>
              <span></span>
            </button>
          </div>
          <ul className={`nav-list ${isBurgerOpen ? 'open' : ''}
              ${isDropdownOpen ? 'visible' : ''}`}>
            <li><Link href='/'><span>Spotify</span></Link></li>
            <li><Link onClick={handleDropdownToggle} href=''><span
              className='dropdown-selector'>Buy</span></Link>

                <ul ref={dropdownRef}
                    className={`nav-dropdown ${isDropdownOpen ? 'open': ''}`}>
                  <li><Link href='/beatstars'><span>Beatstars</span></Link></li>
                  <li><Link href='/airbit'><span>Airbit</span></Link></li>
                </ul>

            </li>
            <li><Link href='/more'><span>More</span></Link></li>
          </ul>
        </nav>
      </div>
    </section>
    );
}