import Footer from "@/features/landing/layout/Footer";
import Header from "@/features/landing/layout/Header";
import { yekanBakh } from "@/lib/config/fonts";

const PersianLyout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main dir="rtl" className={`font-yekan`}>
      <Header/>
      {children}
      <Footer/>
    </main>
  );
};

export default PersianLyout;
