import Image from "next/image";
import Banner from "./Pages/Home/Banner/page";
import Services from "./services/page";

export default function Home() {
  return (
    <div>
      <Banner></Banner>
      <Services></Services>
    </div>
  );
}
