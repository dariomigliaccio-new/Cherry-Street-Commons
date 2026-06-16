import InteriorPage from "@/components/site/InteriorPage";
import { getPublicSiteData, sectionBySlug } from "@/lib/site-data";

export default async function AboutPage() {
  const { content, sections, menuItems } = await getPublicSiteData();
  const section = sectionBySlug(sections, "about");

  return (
    <InteriorPage
      siteName={content.site_name ?? "Cherry Street Commons"}
      logoUrl={content.site_logo ?? ""}
      menuItems={menuItems}
      title={section?.title ?? "About Cherry Street Commons"}
      eyebrow="About"
      intro="A new affordable housing community planned for downtown San Carlos."
      section={section}
      footerText={content.footer_text ?? "Cherry Street Commons"}
      email={content.contact_email ?? ""}
      phone={content.contact_phone ?? ""}
      address={content.address ?? "1244 Cherry Street, San Carlos, CA 94070"}
    />
  );
}
