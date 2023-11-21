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
          <h1>FETCHIZY <small>beta</small></h1>
        </div>
        
        <div className="flex items-center">
          <div className="profile cursor-pointer mr-4" onClick={handleProfileClick}>
            <h1>{t("profile")}</h1>
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
          <div className="text-center p-5">
            <h2 className="mb-4">{t("sign_in_up")}</h2>
            <form>
              <input
                type="email"
                placeholder={t("email")}
                className="block w-full p-2 mb-4 border rounded"
              />
              <input
                type="password"
                placeholder={t("password")}
                className="block w-full p-2 mb-4 border rounded"
              />
              <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mb-2">
                {t("sign_in")}
              </button>
              {/* <button type="button" className="w-full bg-gray-500 text-white p-2 rounded">
                {t("sign_up")}
              </button> */}
            </form>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Header;
