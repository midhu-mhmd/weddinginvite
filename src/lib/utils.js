import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// ─── Wedding Constants ───
export const WEDDING = {
  groomFirst: "Alexander",
  brideFirst: "Josephine",
  groomInitial: "A",
  brideInitial: "J",
  date: new Date("2026-10-24T16:00:00"),
  dateDisplay: "October 24, 2026",
  venue: {
    ceremony: {
      name: "The Grand Botanical Gardens",
      address: "123 Nature's Way",
      city: "Portland, Oregon",
      time: "4:00 PM",
      mapUrl: "https://maps.google.com/?q=The+Grand+Botanical+Gardens+Portland+Oregon",
    },
    reception: {
      name: "The Olive Grove Estate",
      address: "456 Vineyard Lane",
      city: "Portland, Oregon",
      time: "6:30 PM",
      mapUrl: "https://maps.google.com/?q=Olive+Grove+Estate+Portland+Oregon",
    },
  },
  schedule: [
    { time: "3:30 PM", title: "Guest Arrival", description: "Welcome drinks in the garden courtyard", icon: "glass-water" },
    { time: "4:00 PM", title: "Ceremony", description: "Under the ancient oak canopy", icon: "heart" },
    { time: "4:45 PM", title: "Cocktail Hour", description: "Lawn games, live acoustic set & canapés", icon: "wine" },
    { time: "6:00 PM", title: "Dinner", description: "Seated dinner in the olive grove pavilion", icon: "utensils" },
    { time: "7:30 PM", title: "First Dance", description: "Our moment on the floor", icon: "music" },
    { time: "8:00 PM", title: "Dancing & Celebration", description: "Live band and open bar until midnight", icon: "party-popper" },
    { time: "11:30 PM", title: "Sparkler Send-Off", description: "Light the way for our grand exit", icon: "sparkles" },
  ],
  story: [
    {
      year: "2021",
      title: "The First Hello",
      text: "A rainy Tuesday morning, a tiny coffee shop, and two people reaching for the last oat milk latte. That small collision turned into a three-hour conversation that neither of us wanted to end.",
      image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&q=80&w=800",
    },
    {
      year: "2022",
      title: "The Adventure Begins",
      text: "From weekend road trips to spontaneous flights, we explored the world together. Every sunset looked better side by side, and every challenge felt lighter because we were a team.",
      image: "https://images.unsplash.com/photo-1529634597503-139d3726fed5?auto=format&fit=crop&q=80&w=800",
    },
    {
      year: "2023",
      title: "Our First Home",
      text: "A cozy apartment that became our sanctuary. Sunday pancakes, furniture assembly arguments (with laughter), and a golden retriever named Biscuit who stole both our hearts.",
      image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&q=80&w=800",
    },
    {
      year: "2025",
      title: "The Proposal",
      text: "Under a canopy of fairy lights at the very coffee shop where it all began. One knee, one ring, one tearful 'yes.' The barista cried too.",
      image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=800",
    },
  ],
  gallery: [
    { src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800", alt: "Couple portrait", span: "col-span-2 row-span-2" },
    { src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=600", alt: "Wedding details", span: "" },
    { src: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80&w=600", alt: "Couple walking", span: "" },
    { src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=600", alt: "Venue exterior", span: "col-span-2" },
    { src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=600", alt: "Flowers close-up", span: "" },
    { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600", alt: "Ring details", span: "" },
  ],
  dressCode: {
    title: "Garden Formal",
    description: "Think elegant but comfortable — you'll be walking on grass. Earthy, muted tones encouraged; please avoid bright white (that's the bride's job).",
    swatches: [
      { name: "Charcoal", color: "#2C2C2C" },
      { name: "Dusty Rose", color: "#D4A5A5" },
      { name: "Blush", color: "#E8B4B8" },
      { name: "Cream", color: "#FFF8F0" },
      { name: "Mauve", color: "#9E7B8A" },
    ],
  },
};
