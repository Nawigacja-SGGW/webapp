import React from 'react';
import './MobileNavbar.scss';
import { Menu, Search } from '@styled-icons/material';
import { ChevronLeft } from '@styled-icons/boxicons-regular/ChevronLeft';
import { SidebarProps } from '../Sidebar/Sidebar.tsx';

function MobileNavbar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  return (
    <div className="mobile-navbar">
      <button onClick={() => setSidebarOpen(!sidebarOpen)}>
        {sidebarOpen ? <ChevronLeft size="40" fill="white" /> : <Menu size="40" fill="white" />}
      </button>
      <div className="mobile-navbar__logo">logo/nazwa</div>
      <button>
        <Search size="40" fill="white" />
      </button>
    </div>
  );
}

export default MobileNavbar;
