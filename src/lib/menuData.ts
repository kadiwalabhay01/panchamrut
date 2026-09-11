// Menu Data Structure & Default Entries
// You can easily modify, add, or delete categories and food items from this file.

import menuBreakfastImg from "@/assets/menu/1.jpeg";
import menuMealsImg from "@/assets/menu/2.jpeg";
import dishDosaImg from "@/assets/menu/3.jpeg";
import dishCoffeeImg from "@/assets/menu/4.jpeg";
import menuSweetsImg from "@/assets/menu/5.jpeg";

export interface MenuItem {
  id: string;
  name: string;
  price: string;
  tag?: string; // e.g., "PRATAH-KALA", "ATELIER CLASSIC"
  image?: string; // Optional specific dish photo or image link
}

export interface MenuChapter {
  id: string;
  romanId: string;
  title: string;
  shortName: string;
  image: string;
  imageAlt: string;
  items: MenuItem[];
}

export const MENU_INTRO = {
  eyebrow: "AN IMMERSIVE CULINARY",
  title: "Lorem ipsum dolor sit amet consectetur.",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  chaptersLabel: "THE FIVE CHAPTERS",
};

export const MENU_CHAPTERS: MenuChapter[] = [
  {
    id: "breakfast",
    romanId: "I",
    shortName: "I. Breakfast",
    title: "Pratah Breakfast",
    image: menuBreakfastImg,
    imageAlt: "Steaming Thattu Idlis served on fresh banana leaf with chutneys and sambar",
    items: [
      {
        id: "thattu-idli",
        name: "Thattu Idli with Heritage Ghee",
        price: "₹180",
        tag: "PRATAH-KALA",
        image: menuBreakfastImg,
      },
      {
        id: "vada-sambar",
        name: "Vada with Sambar & Chutneys",
        price: "₹140",
        tag: "SACRED MORNING",
        image: dishDosaImg,
      },
      {
        id: "khara-bath",
        name: "Khara Bath",
        price: "₹160",
        tag: "KARNATAK FLAVOURS",
        image: menuBreakfastImg,
      },
      {
        id: "panchamrut-fruit-bowl",
        name: "Panchamrut Fruit & Curd Bowl",
        price: "₹220",
        tag: "TRADITIONAL",
        image: menuBreakfastImg,
      },
    ],
  },
  {
    id: "rice",
    romanId: "II",
    shortName: "II. Rice",
    title: "Anna Sadhana",
    image: menuMealsImg,
    imageAlt: "Fragrant South Indian flavored rice served in traditional brassware",
    items: [
      {
        id: "temple-lemon-rice",
        name: "Temple Lemon Rice",
        price: "₹210",
        tag: "ANNADHAANA",
        image: menuMealsImg,
      },
      {
        id: "classic-curd-rice",
        name: "Classic Curd Rice",
        price: "₹230",
        tag: "GRANDMOTHER'S RECIPE",
        image: menuMealsImg,
      },
      {
        id: "bisi-bele-bath",
        name: "Bisi Bele Bath",
        price: "₹280",
        tag: "MYSORE HERITAGE",
        image: menuMealsImg,
      },
      {
        id: "coconut-milk-pulav",
        name: "Coconut Milk Pulav",
        price: "₹290",
        tag: "COASTAL",
        image: menuMealsImg,
      },
    ],
  },
  {
    id: "dosa",
    romanId: "III",
    shortName: "III. Dosa",
    title: "Prasada of Griddle",
    image: dishDosaImg,
    imageAlt: "Golden crisp Mysore Masala Dosa roasted with ghee on banana leaf",
    items: [
      {
        id: "panchamrut-masala-dosa",
        name: "Panchamrut Special Masala Dosa",
        price: "₹280",
        tag: "FRAGRANT OF MYSORE",
        image: dishDosaImg,
      },
      {
        id: "ragi-millet-crepe",
        name: "Ragi & Millet Crepe",
        price: "₹210",
        tag: "ANCIENT GRAINS",
        image: dishDosaImg,
      },
      {
        id: "karampodi-onion-dosa",
        name: "Karampodi Onion Dosa",
        price: "₹230",
        tag: "SPICE CRUST",
        image: dishDosaImg,
      },
      {
        id: "podi-onion-uttapam",
        name: "Podi Onion Uttapam",
        price: "₹230",
        tag: "THICK GRIDDLE CAKE",
        image: dishDosaImg,
      },
    ],
  },
  {
    id: "coffee",
    romanId: "IV",
    shortName: "IV. Filter Coffee",
    title: "Kaapi Chayana",
    image: dishCoffeeImg,
    imageAlt: "Traditional South Indian Filter Coffee poured into davara tumbler",
    items: [
      {
        id: "mysore-kaapi",
        name: "Traditional Mysore Kaapi",
        price: "₹120",
        tag: "CHIKMAGALUR",
        image: dishCoffeeImg,
      },
      {
        id: "black-decoction",
        name: "Black Decoction",
        price: "₹100",
        tag: "ESTATE SELECTION",
        image: dishCoffeeImg,
      },
      {
        id: "cold-brew-kaapi",
        name: "Cold Brew Kaapi",
        price: "₹190",
        tag: "CONTEMPORARY",
        image: dishCoffeeImg,
      },
      {
        id: "cardamom-ginger-brew",
        name: "Cardamom & Ginger Brew",
        price: "₹130",
        tag: "WELLBEING",
        image: dishCoffeeImg,
      },
    ],
  },
  {
    id: "sweets",
    romanId: "V",
    shortName: "V. Sweets",
    title: "Madhura Prasad",
    image: menuSweetsImg,
    imageAlt: "Sacred South Indian sweets including Mysore Pak and Elaneer Payasam",
    items: [
      {
        id: "melt-in-mouth-mysore-pak",
        name: "Royal Ghee Mysore Pak",
        price: "₹190",
        tag: "MYSORE PALACE",
        image: menuSweetsImg,
      },
      {
        id: "elaneer-payasam",
        name: "Tender Coconut Elaneer Payasam",
        price: "₹210",
        tag: "KERALA COAST",
        image: menuSweetsImg,
      },
      {
        id: "kesari-bath",
        name: "Pineapple Saffron Kesari Bath",
        price: "₹160",
        tag: "TEMPLE PRASAD",
        image: menuSweetsImg,
      },
      {
        id: "paal-poli",
        name: "Paal Poli in Saffron Milk",
        price: "₹180",
        tag: "HERITAGE FEAST",
        image: menuSweetsImg,
      },
    ],
  },
];
