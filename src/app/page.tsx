import { prisma } from "@/lib/prisma";
import Navbar from "@/components/site/Navbar";
import HeroSection from "@/components/site/HeroSection";
import SectionsBlock from "@/components/site/SectionsBlock";
import Footer from "@/components/site/Footer";

export const revalidate = 60;

async function getSiteData() {
  const [contentItems, banners, sections, menuItems] = await Promise.all([
    prisma.siteContent.findMany(),
    prisma.banner.findMany({ where: { active: true }, orderBy: { order: "asc" } }),
    prisma.section.findMany({ where: { visible: true }, orderBy: { order: "asc" } }),
    prisma.menuItem.findMany({ orderBy: { order: "asc" } }),
  ]);

  const content: Record<string, string> = {};
  contentItems.forEach((c) => (content[c.key] = c.value));

  return { content, banners, sections, menuItems };
}

export default async function Home() {
  const { content, banners, sections, menuItems } = await getSiteData();

  const hero = banners[0] ?? {
    id: "default",
    title: content.site_name ?? "Cherry Street Commons",
    subtitle: content.site_tagline ?? "Affordable Housing in Downtown San Carlos",
    buttonText: "Learn More",
    buttonHref: "#about",
    imageUrl: "",
  };

  return (
    <>
      <Navbar
        siteName={content.site_name ?? "Cherry Street Commons"}
        logoUrl={content.site_logo ?? ""}
        menuItems={menuItems}
      />
      <HeroSection banner={hero} />
      <SectionsBlock sections={sections} />
      <Footer
        siteName={content.site_name ?? "Cherry Street Commons"}
        footerText={content.footer_text ?? "© 2025 Cherry Street Commons"}
        email={content.contact_email ?? ""}
        phone={content.contact_phone ?? ""}
        address={content.contact_address ?? ""}
        menuItems={menuItems}
      />
    </>
  );
}
