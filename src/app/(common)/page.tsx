import Categories from "@/components/modules/home/Categories";
import FAQ from "@/components/modules/home/faq";
import Hero from "@/components/modules/home/hero";

import HowItWorks from "@/components/modules/home/how-it-works";
import MedicinesSection from "@/components/modules/home/MedicineSection";
import Testimonials from "@/components/testimonials";

const HomePage = async () => {
  return (
    <div className="w-full mx-auto mb-4 ">
      <Hero />
      <Categories />
      <HowItWorks />
      <MedicinesSection />
      <FAQ />
      <Testimonials />
    </div>
  );
};

export default HomePage;
