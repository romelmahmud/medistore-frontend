import Hero from "@/components/modules/home/hero";
import HowItWorks from "@/components/modules/home/how-it-works";

const HomePage = async () => {
  return (
    <div className="w-full mx-auto mb-4 ">
      <Hero />
      <HowItWorks />
    </div>
  );
};

export default HomePage;
