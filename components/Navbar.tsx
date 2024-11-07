"use client";
import { useState } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';
// import { supabase } from '../lib/supabaseClient';// Import the Supabase client

// import { supabase } from '@/lib/supabaseClient';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // const handleLogout = async () => {
  //   const { error } = await supabase.auth.signOut();
  //   if (error) {
  //     console.error('Error logging out:', error.message);
  //   } else {
  //     // Optionally, redirect or show a message after logout
  //     console.log('Logged out successfully');
  //     // You can redirect to the home page or another page if needed
  //     window.location.href = '/'; // Redirect to home page
  //   }
  // };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        {/* Brand/Logo */}
        <Link href="/" className={styles.navBrand}>
          Pantheon Client
        </Link>

        {/* Hamburger Menu Button */}
        <button 
          className={styles.hamburger}
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation Links */}
        <div className={`${styles.navMenu} ${isOpen ? styles.active : ''}`}>
          <Link href="/" className={styles.navLink}>
            Home
          </Link>
          <Link href="/salesreport" className={styles.navLink}>
            Sales Report
          </Link>
          <Link href="/about" className={styles.navLink}>
            About
          </Link>
          <Link href="/services" className={styles.navLink}>
            Services
          </Link>
          <Link href="/contact" className={styles.navLink}>
            Contact
          </Link>
          <button 
            // onClick={handleLogout} 
            className={styles.navLink}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 