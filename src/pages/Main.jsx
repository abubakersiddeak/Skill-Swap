import PopularSkills from "../components/PopularSkills";
import TopRatedProviders from "../components/TopRatedProviders";
import UserReviews from "../components/UserReviews";
import WorkGuide from "../components/WorkGuide";
import Carousel from "./Carousel";
import Contact from "./Contact";
import Support from "./Support";

export default function Main() {
  return (
    <div className=" bg-linear-to-b from-blue-50 via-blue-100 to-blue-200 ">
      <Carousel />
      <PopularSkills />
      <TopRatedProviders />
      <UserReviews />
      <WorkGuide />
      <Contact />
      <Support />
    </div>
  );
}
