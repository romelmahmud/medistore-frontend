import Navbar from "@/components/layout/navbar";

const CommonLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto p-4">{children}</div>
    </div>
  );
};

export default CommonLayout;
