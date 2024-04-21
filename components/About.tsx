import React from "react";
import { useTranslation } from "@/contexts/TranslationsContext";
import Link from "next/link";

const About: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Link href="/about">{t?.("about_mention")}</Link>
    </div>
  );
};

export default About;
