import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

export const LangChanger = () => {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language || "en");

  const handleChange = (value:string) => {
    i18n.changeLanguage(value);
    setLang(value);
  };

  useEffect(() => {
    setLang(i18n.language);
  }, [i18n.language]);

  const options = [
    { value: "en", label: "English", flag: "/en.svg" },
    { value: "ru", label: "Russian", flag: "/ru.svg" },
  ];

  return (
    <Select onValueChange={handleChange} value={lang}>
      <SelectTrigger className="w-[145px] md:bg-[#edb324] md:text-black font-semibold px-0 md:px-4">
        <SelectValue placeholder="Language" />
      </SelectTrigger>

      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value} className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <img src={opt.flag} alt={opt.label} className="w-5 h-3" />
              <span>{opt.label}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
