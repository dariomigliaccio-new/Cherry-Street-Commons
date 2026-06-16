import Navbar from "@/components/site/Navbar";
import HeroSection from "@/components/site/HeroSection";
import SectionsBlock from "@/components/site/SectionsBlock";
import { defaultHero, getPublicSiteData } from "@/lib/site-data";

export default async function Home() {
  const { content, banners, menuItems } = await getPublicSiteData();
  const hero = banners[0] ?? defaultHero(content);

  return (
    <>
      <Navbar
        siteName={content.site_name ?? "Cherry Street Commons"}
        logoUrl={content.site_logo ?? ""}
        menuItems={menuItems}
      />
      <main style={{ paddingTop: "80px" }}>
        <HeroSection banner={hero} />
        <SectionsBlock />
      </main>
    </>
  );
}
