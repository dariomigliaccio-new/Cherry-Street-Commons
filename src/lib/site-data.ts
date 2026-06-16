import { connection } from "next/server";
import { prisma } from "@/lib/prisma";

export type PublicMenuItem = {
  id: string;
  label: string;
  href: string;
  order: number;
  visible: boolean;
};

export type PublicSection = {
  id: string;
  slug: string;
  title: string;
  content: string;
  imageUrl: string;
  order: number;
  visible: boolean;
};

export type PublicBanner = {
  id: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonHref: string;
  imageUrl: string;
};

export type PublicSiteData = {
  content: Record<string, string>;
  banners: PublicBanner[];
  sections: PublicSection[];
  menuItems: PublicMenuItem[];
};

export const routeBySlug: Record<string, string> = {
  home: "/",
  about: "/about",
  floorplans: "/homes",
  homes: "/homes",
  location: "/location",
  sustainability: "/sustainability",
  community: "/community",
  apply: "/apply",
  contact: "/apply",
};

export function normalizeHref(href: string) {
  if (!href || href === "#") return "/";
  if (href.startsWith("#")) return routeBySlug[href.slice(1)] ?? "/";
  return href;
}

export async function getPublicSiteData(): Promise<PublicSiteData> {
  await connection();

  const [contentItems, banners, sections, menuItems] = await Promise.all([
    prisma.siteContent.findMany(),
    prisma.banner.findMany({ where: { active: true }, orderBy: { order: "asc" } }),
    prisma.section.findMany({ where: { visible: true }, orderBy: { order: "asc" } }),
    prisma.menuItem.findMany({ orderBy: { order: "asc" } }),
  ]);

  const content: Record<string, string> = {};
  contentItems.forEach((item) => {
    content[item.key] = item.value;
  });

  return { content, banners, sections, menuItems };
}

export function defaultHero(content: Record<string, string>): PublicBanner {
  return {
    id: "default",
    title: content.site_name ?? "Cherry Street Commons",
    subtitle: content.site_tagline ?? "Affordable Housing in Downtown San Carlos",
    buttonText: "Learn More",
    buttonHref: "/about",
    imageUrl: "",
  };
}

export function sectionBySlug(sections: PublicSection[], slug: string) {
  return sections.find((section) => section.slug === slug);
}
