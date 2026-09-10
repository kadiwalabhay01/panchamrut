import { createFileRoute } from "@tanstack/react-router";
import { useCinematicScroll } from "@/components/panchamrut/useCinematicScroll";
import { Header } from "@/components/Header";
import { SceneOpening } from "@/components/panchamrut/SceneOpening";
import { SceneTaste } from "@/components/panchamrut/SceneTaste";
import { SceneTradition } from "@/components/panchamrut/SceneTradition";
import { SceneWellness } from "@/components/panchamrut/SceneWellness";
import { SceneCommunity } from "@/components/panchamrut/SceneCommunity";
import { SceneCulture } from "@/components/panchamrut/SceneCulture";
// import { SceneMenu } from "@/components/panchamrut/SceneMenu";
import { SceneVisit } from "@/components/panchamrut/SceneVisit";
import { SceneFinal } from "@/components/panchamrut/SceneFinal";
import { Footer } from "@/components/Footer";

const TITLE = "Panchamrut — Five Elements. One Soulful Meal.";
const DESCRIPTION =
  "A cinematic scroll through Panchamrut: taste, tradition, wellness, community and culture, from the first lamp to the last cup of filter coffee.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  useCinematicScroll();

  return (
    <main className="bg-night">
      <h1 className="sr-only">Panchamrut — Five Elements. One Soulful Meal.</h1>
      <Header />
      <SceneOpening />
      <SceneTaste />
      <SceneTradition />
      <SceneWellness />
      <SceneCommunity />
      <SceneCulture />
      {/* <SceneMenu /> */}
      <SceneVisit />
      <SceneFinal />
      <Footer />
    </main>
  );
}
