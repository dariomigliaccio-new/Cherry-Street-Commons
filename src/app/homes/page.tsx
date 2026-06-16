import InteriorPage from "@/components/site/InteriorPage";
import { getPublicSiteData } from "@/lib/site-data";

const plans = [
  ["1 Bedroom", "Efficient apartment homes planned for smaller households."],
  ["2 Bedroom", "Flexible layouts planned for small families and shared households."],
  ["3 Bedroom", "Larger homes planned for households that need more space."],
];

export default async function HomesPage() {
  const { content, menuItems } = await getPublicSiteData();

  return (
    <InteriorPage
      siteName={content.site_name ?? "Cherry Street Commons"}
      logoUrl={content.site_logo ?? ""}
      menuItems={menuItems}
      title="Homes planned for different household sizes."
      eyebrow="Homes"
      intro="Cherry Street Commons is planned to include one, two, and three-bedroom affordable apartment homes."
      footerText={content.footer_text ?? "Cherry Street Commons"}
      email={content.contact_email ?? ""}
      phone={content.contact_phone ?? ""}
      address={content.address ?? "1244 Cherry Street, San Carlos, CA 94070"}
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {plans.map(([name, detail]) => (
          <article key={name} className="rounded-[12px] border border-[#e6e1d8] bg-white p-6">
            <p className="text-xs font-bold uppercase tracking-[0.16em]" style={{ color: "#7f1717" }}>
              Planned home
            </p>
            <h2 className="mt-4 text-2xl font-extrabold" style={{ color: "#1a1a1a" }}>
              {name}
            </h2>
            <p className="mt-3 text-sm leading-[1.65]" style={{ color: "#625e57" }}>
              {detail}
            </p>
          </article>
        ))}
      </div>
    </InteriorPage>
  );
}
