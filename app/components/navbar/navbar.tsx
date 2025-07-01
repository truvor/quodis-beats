'use client';

import React, {useEffect, useRef, useState} from 'react';
import Link from 'next/link';

export default function Navbar() {
  const dropdownRef = useRef<HTMLLIElement | null>(null);
  const menuRef = useRef<HTMLUListElement | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  const handleDropdownToggle: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    setIsDropdownOpen(prev => !prev);
  };

  const handleBurgerToggle = () => {
    setIsBurgerOpen(prev => !prev);
  };

  const handleLinkClick = () => {
    setIsBurgerOpen(false);
    setIsDropdownOpen(false);
  }

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
        <h1 className='brand'>
          <Link href='/'>Quodis Beats</Link>
        </h1>
        <nav ref={menuRef}>
          <div className='nav-mobile'>
            <button onClick={handleBurgerToggle}
                    id='nav-toggle'
                    className={`${isBurgerOpen ? 'active' : ''}`}
                    aria-label="burger toggle">
              <span></span>
            </button>
          </div>
          <ul className={`nav-list ${isBurgerOpen ? 'open' : ''}
              ${isDropdownOpen ? 'visible' : ''}`}>
            <li><Link onClick={handleLinkClick} href='/'><span>Spotify</span></Link></li>
            <li ref={dropdownRef}><Link onClick={handleDropdownToggle}
                                        href=''><span
              className='dropdown-selector'>Buy</span></Link>
              <ul className={`nav-dropdown ${isDropdownOpen ? 'open' : ''}`}>
                <li><Link onClick={handleLinkClick} href='/beatstars'><span>Beatstars</span></Link></li>
                <li><Link onClick={handleLinkClick} href='/airbit'><span>Airbit</span></Link></li>
              </ul>
            </li>
            <li><Link onClick={handleLinkClick} href='/more'><span>Internet Speaks</span></Link></li>
          </ul>
        </nav>
      </div>
    </section>
    );
}