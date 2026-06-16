import InteriorPage from "@/components/site/InteriorPage";
import { getPublicSiteData } from "@/lib/site-data";

export default async function LocationPage() {
  const { content, menuItems } = await getPublicSiteData();

  return (
    <InteriorPage
      siteName={content.site_name ?? "Cherry Street Commons"}
      logoUrl={content.site_logo ?? ""}
      menuItems={menuItems}
      title="1244 Cherry Street"
      eyebrow="Location"
      intro="The planned community is located in downtown San Carlos, near transit, services, and everyday needs."
      showMap
      footerText={content.footer_text ?? "Cherry Street Commons"}
      email={content.contact_email ?? ""}
      phone={content.contact_phone ?? ""}
      address={content.address ?? "1244 Cherry Street, San Carlos, CA 94070"}
    />
  );
}
