import MoodInput from "@/components/MoodInput";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home - Halamd",
};

const Home = () => {
  return (
    <div className="">
      <MoodInput />
    </div>
  );
};

export default Home;
