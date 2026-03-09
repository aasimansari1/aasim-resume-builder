import { Template } from "@/types";

export const templates: Template[] = [
  {
    id: "professional",
    name: "Professional",
    description: "Clean and traditional layout perfect for corporate roles",
    thumbnail: "/templates/professional.png",
    isPro: false,
  },
  {
    id: "modern",
    name: "Modern",
    description: "Contemporary design with a creative touch",
    thumbnail: "/templates/modern.png",
    isPro: false,
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Simple and elegant with focus on content",
    thumbnail: "/templates/minimal.png",
    isPro: false,
  },
  {
    id: "executive",
    name: "Executive",
    description: "Sophisticated layout for senior positions",
    thumbnail: "/templates/executive.png",
    isPro: true,
  },
  {
    id: "creative",
    name: "Creative",
    description: "Bold design for creative professionals",
    thumbnail: "/templates/creative.png",
    isPro: true,
  },
  {
    id: "technical",
    name: "Technical",
    description: "Optimized for tech roles with skills emphasis",
    thumbnail: "/templates/technical.png",
    isPro: true,
  },
];
