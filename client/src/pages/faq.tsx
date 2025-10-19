import Footer from "@/components/shared/footer";
import { Header } from "@/components/shared/header";
import { Menus } from "@/components/shared/menus";
import { Navbar } from "@/components/shared/navbar";
import { useTranslation } from "react-i18next";

interface FaqItem {
  question: string;
  answer: string;
}

export const Faq = () => {
  const { t } = useTranslation();
  
  const faqs = t("faq.items", { returnObjects: true }) as FaqItem[];

  return (
    <div className="pt-24" id="all">
      <Navbar />
      <Menus />
      <div className="pb-8 px-[5%]">
        <h1 className="text-xl md:text-3xl font-bold text-white">
          {t("faq.title")}
        </h1>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-6">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="space-y-3 bg-[#272f48] border-2 border-white shadow-md rounded-xl p-5 hover:shadow-lg transition-transform hover:scale-[1.02]"
            >
              <h1 className="font-semibold text-lg text-[#edb324]">
                {faq.question}
              </h1>
              <div className="h-[1px] w-full bg-white" />
              <p className="text-sm text-white">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
      <Header />
    </div>
  );
};
