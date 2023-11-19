import React, { useState } from "react";
import Modal from "@/components/Modal";
import { useTranslation } from "@/contexts/TranslationsContext";

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
      <header className="flex justify-between items-center p-4">
        <div className="logo">
          <h1>{t("logo")}</h1>
        </div>
        
        <div className="flex items-center">
          <div className="profile cursor-pointer mr-4" onClick={handleProfileClick}>
            <h1>{t("search_history")}</h1>
          </div>

          <select
            value={language}
            onChange={handleLanguageChange}
            className="appearance-none bg-transparent border-b border-gray-300 hover:border-blue-500 focus:border-blue-500 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:shadow-outline"
          >
            <option value="en">🇬🇧 English</option>
            <option value="fr">🇫🇷 French</option>
          </select>
        </div>
      </header>

      {/* Signup Modal */}
      {showSignupModal && (
        <Modal onClose={() => setShowSignupModal(false)}>
          <form>
            <button type="submit">{t("signup")}</button>
          </form>
        </Modal>
      )}
    </>
  );
};

export default Header;
