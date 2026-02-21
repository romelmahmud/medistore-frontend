import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";

const CommonLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto p-4">{children}</div>
      <Footer />
    </div>
  );
};

export default CommonLayout;
