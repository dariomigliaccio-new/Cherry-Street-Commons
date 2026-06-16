import InteriorPage from "@/components/site/InteriorPage";
import { getPublicSiteData } from "@/lib/site-data";

export default async function ApplyPage() {
  const { content, menuItems } = await getPublicSiteData();

  return (
    <InteriorPage
      siteName={content.site_name ?? "Cherry Street Commons"}
      logoUrl={content.site_logo ?? ""}
      menuItems={menuItems}
      title="Application information will be shared as opening approaches."
      eyebrow="Apply"
      intro="Cherry Street Commons is expected to open in 2026. Details about applications, eligibility, and resident selection will be posted when available."
      footerText={content.footer_text ?? "Cherry Street Commons"}
      email={content.contact_email ?? ""}
      phone={content.contact_phone ?? ""}
      address={content.address ?? "1244 Cherry Street, San Carlos, CA 94070"}
    >
      <div className="rounded-[12px] border border-[#e6e1d8] bg-[#f7f4ef] p-6">
        <h2 className="text-xl font-extrabold" style={{ color: "#1a1a1a" }}>
          Current status
        </h2>
        <p className="mt-3 text-sm leading-[1.7]" style={{ color: "#625e57" }}>
          Applications are not open yet. Please check back for official updates as the project moves closer to completion.
        </p>
      </div>
    </InteriorPage>
  );
}
