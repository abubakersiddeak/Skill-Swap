import PopularSkills from "../components/PopularSkills";
import TopRatedProviders from "../components/TopRatedProviders";
import UserReviews from "../components/UserReviews";
import WorkGuide from "../components/WorkGuide";
import Carousel from "./Carousel";

export default function Main() {
  return (
    <div className=" bg-linear-to-b from-blue-50 via-blue-100 to-blue-200 py-10 space-y-20">
      <Carousel />
      <PopularSkills />
      <TopRatedProviders />
      <UserReviews />
      <WorkGuide />
    </div>
  );
}
