import InteriorPage from "@/components/site/InteriorPage";
import { getPublicSiteData, sectionBySlug } from "@/lib/site-data";

export default async function CommunityPage() {
  const { content, sections, menuItems } = await getPublicSiteData();
  const section = sectionBySlug(sections, "community");

  return (
    <InteriorPage
      siteName={content.site_name ?? "Cherry Street Commons"}
      logoUrl={content.site_logo ?? ""}
      menuItems={menuItems}
      title={section?.title ?? "Community"}
      eyebrow="Community"
      intro="A downtown housing community planned with neighborhood access and long-term affordability in mind."
      section={section}
      footerText={content.footer_text ?? "Cherry Street Commons"}
      email={content.contact_email ?? ""}
      phone={content.contact_phone ?? ""}
      address={content.address ?? "1244 Cherry Street, San Carlos, CA 94070"}
    />
  );
}
