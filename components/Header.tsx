// Header.tsx

import React, { useState } from "react";
import Link from "next/link";
import { useTranslation } from "@/contexts/TranslationsContext";

const HamburgerMenu = ({
  showMenu,
  toggleMenu,
}: {
  showMenu: boolean;
  toggleMenu: () => void;
}) => (
  <div className="block text-white lg:hidden" onClick={toggleMenu}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-6 w-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
  </div>
);

const Header: React.FC = () => {
  const { t, language, setLanguage } = useTranslation();
  const [showMenu, setShowMenu] = useState(true);

  const toggleMenu = () => setShowMenu(!showMenu);
  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setLanguage(event.target.value);
  };

  const responsiveMenuClassName = showMenu ? "header-nav" : "header-nav";

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-10 flex justify-between items-center p-4 h-16"
        style={{ backgroundColor: "#F3FFF2" }}
      >
        <div className="logo">
          <Link href="/">
            <img
              src={"/LOGO_FETCHIZY.png"}
              alt="logo"
              className="h-12 rounded ml-4"
            />
          </Link>
        </div>

        <nav className={responsiveMenuClassName}>
          <Link className="nav-link" href="/">
            {t?.("blog")}
          </Link>
          <Link className="nav-link" href="/chat">
            {t?.("chat")}
          </Link>
          <Link className="nav-link" href="/about">
            {t?.("about_mention")}
          </Link>
          <select
            value={language}
            onChange={handleLanguageChange}
            className="language-select bg-transparent border-none"
          >
            <option value="en">EN</option>
            <option value="fr">FR</option>
          </select>
        </nav>
      </header>
      <div className="header-divider"></div>
    </>
  );
};

export default Header;
