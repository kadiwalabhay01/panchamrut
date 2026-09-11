// Stories / Musings Structured Data
// You can pass a direct image path (e.g. "/assets/culture_coffee_brewing.jpeg" or "/src/assets/..." or any image URL)
// or imported assets into the `image` field.

import coffeeStillLife from "@/assets/culture_coffee_brewing.jpeg";
import gheeVessel from "@/assets/taste.jpg";
import podiSpices from "@/assets/culture_coffee_roasting.jpeg";
import ragiMillet from "@/assets/culture_banana_leaf.jpeg";
import templeLore from "@/assets/temple.jpg";
import apothecaryHerbs from "@/assets/wellness.jpg";

export interface StoryItem {
  id: string;
  category: string; // e.g. "CHAPTER IV - SLOW DRIPPINGS", "APOTHECARY & ALCHEMY", "RECIPES", "TEMPLE LORE"
  title: string;
  excerpt: string;
  image: string; // Path or imported image (e.g. "/assets/my-photo.jpg" or URL)
  imageAlt?: string;
}

export const STORIES_INTRO = {
  eyebrow: "STORIES FROM THE SOUTH",
  title: "Lorem ipsum dolor sit amet consectetur.",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
};

export const INITIAL_STORIES: StoryItem[] = [
  {
    id: "mysore-filter-kaapi",
    category: "CHAPTER IV - SLOW DRIPPINGS",
    title: "The Sacred Geometry of Mysore Filter Kaapi",
    excerpt:
      "An exploration of the peaberry bean, the brass filter's silent clock, and why continuous high pulling is not showmanship, but a thermal alignment of raw decoction and dense cream.",
    image: coffeeStillLife, // You can also directly put path string: "/src/assets/culture_coffee_brewing.jpeg"
    imageAlt: "South Indian filter kaapi brass brewer with rising steam on stone counter",
  },
  {
    id: "ghee-vessel",
    category: "APOTHECARY & ALCHEMY",
    title: "The Ghee Vessel: Why Bronze Preserves Light",
    excerpt:
      "Our deep dive into why pure A2 cow ghee must reside in heavy-bottomed bronze or copper, reacting slowly over days to unlock subtle digestion-enriching elements.",
    image: gheeVessel,
    imageAlt: "Traditional bronze pan simmering golden ghee on woodfire hearth",
  },
  {
    id: "podi-lost-spices",
    category: "RECIPES",
    title: "Podi: The Lost Spices of the Banyan Estate",
    excerpt:
      "Rediscovering a rare Guntur red chili and horsegram podi recipe hand-ground on lava stones, imparting a fiery, mineralized crust to morning idlis.",
    image: podiSpices,
    imageAlt: "Traditional stone mortar with freshly pounded aromatic podi spices",
  },
  {
    id: "ragi-millet-offering",
    category: "TEMPLE LORE",
    title: "Ragi & Millet: The Pre-Vedic Offering",
    excerpt:
      "Tracing the lineage of finger millet back to stone inscriptions, exploring how this highly robust grain sustained spiritual practitioners before the age of refined white rice.",
    image: ragiMillet,
    imageAlt: "Ancient wooden spoon pouring wholesome finger millet grains on burlap",
  },

];
