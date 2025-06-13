// ts-nocheck
'use client';

import {useRef} from 'react';
import Link from 'next/link';

export default function Navbar() {
  const contentRef = useRef(null);

  const handleClick = () => {
    if (contentRef.current) {
      contentRef.current.style.display =
        contentRef.current.style.display === 'none' ? 'block' : 'none';
    }
  };

  return (
    <section className="navigation">
      <div className="nav-container">
        <div className="brand">
          <a href="#!">Quodis Beats</a>
        </div>
        <nav>
          <div className="nav-mobile">
            <a id="nav-toggle" href="#!"><span></span></a>
          </div>
          <ul className="nav-list">
            <li><Link href='/'><span>Spotify</span></Link></li>
            <li><Link onClick={handleClick} href=''><span>Buy</span></Link>
              <ul ref={contentRef} className="nav-dropdown hidden">
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