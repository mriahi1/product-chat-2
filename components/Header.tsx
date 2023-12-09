import React, { useState } from "react";
import Modal from "@/components/Modal";
import { useTranslation } from "@/contexts/TranslationsContext";
import Link from 'next/link';

interface HeaderProps {
  // Define any props here if needed
}

const Header: React.FC<HeaderProps> = () => {
  const { t, language, setLanguage } = useTranslation();
  const [showSignupModal, setShowSignupModal] = useState<boolean>(false);

  const handleProfileClick = () => {
    setShowSignupModal(true);
  };

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value);
  };

  return (
    <>
      <header className="header-nav fixed top-0 left-0 right-0 z-10 flex justify-between items-center p-2">
        <div className="logo">
          <Link href="/">
            {/* <h1>FETCHIZY <small>beta</small></h1> */}
            <img src={"LOGO_FETCHIZY.png"} alt="" className="h-12 rounded" />
          </Link>
        </div>

        <div className="flex items-center">
          {/* Ajout du lien vers "About.tsx" */}
          <Link href="/about" className="about-btn">
            <h1 className="mr-4">{t?.('about_mention')}</h1>
          </Link>

          <select
            value={language}
            onChange={handleLanguageChange}
            className="appearance-none bg-transparent py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="en">EN</option>
            <option value="fr">FR</option>
          </select>
        </div>
      </header>

      {/* Signup Modal */}
      {showSignupModal && (
        <Modal onClose={() => setShowSignupModal(false)}>
          <div className="text-center p-5">
            <h2 className="mb-4">{t("sign_in_up")}</h2>
            <form>
              {/* ... (le reste de votre formulaire) */}
            </form>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Header;