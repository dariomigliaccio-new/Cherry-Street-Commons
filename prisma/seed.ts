import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Admin user
  const email = process.env.ADMIN_EMAIL || "dariomigliaccio@gmail.com";
  const rawPassword = process.env.ADMIN_PASSWORD || "changeme";
  const password = await bcrypt.hash(rawPassword, 12);

  await prisma.user.upsert({
    where: { email },
    update: { password },
    create: { email, password, role: "admin" },
  });

  // Site content
  const defaultContent = [
    { key: "site_name", value: "Cherry Street Commons", type: "text" },
    { key: "site_logo", value: "", type: "image" },
    {
      key: "site_tagline",
      value: "Affordable Housing in Downtown San Carlos, California",
      type: "text",
    },
    {
      key: "footer_text",
      value: "© 2025 Cherry Street Commons · Eden Housing & HIP Housing · San Carlos, CA",
      type: "text",
    },
    { key: "contact_email", value: "info@cherrystreetcommons.com", type: "text" },
    { key: "contact_phone", value: "", type: "text" },
    { key: "contact_address", value: "1244 Cherry Street, San Carlos, CA", type: "text" },
  ];

  for (const item of defaultContent) {
    await prisma.siteContent.upsert({
      where: { key: item.key },
      update: { value: item.value },
      create: item,
    });
  }

  // Hero banner
  await prisma.banner.upsert({
    where: { id: "default-banner" },
    update: {},
    create: {
      id: "default-banner",
      title: "Cherry Street Commons",
      subtitle: "33 affordable homes coming to downtown San Carlos in 2026",
      buttonText: "Learn More",
      buttonHref: "#about",
      imageUrl: "",
      order: 0,
      active: true,
    },
  });

  // Sections with real content
  const sections = [
    {
      slug: "about",
      title: "About Cherry Street Commons",
      content: `Eden Housing and HIP Housing are partnering to create Cherry Street Commons — a 33-unit affordable multi-family development in downtown San Carlos.\n\nThe building design matches the surrounding look and feel of San Carlos in a Mediterranean style with tile inlays and decorative metalwork to enhance a sense of place. One, two and three-bedroom apartments are planned around a podium courtyard to provide outdoor gathering space and a small tot lot play area.\n\nA large community room with a community kitchen and media area supports a variety of activities. Laundry facilities will be provided on-site and there will be several offices and meeting rooms.`,
      order: 1,
    },
    {
      slug: "sustainability",
      title: "Sustainability & Green Living",
      content: `This building will be all-electric with individual heat pump water heaters and highly energy-efficient heating and cooling for each unit. A full photovoltaic array on the roof will generate renewable energy on-site.\n\n21 car parking spaces and 2 accessible parking spaces will be EV Ready. To support micro-mobility, we also have 20 long-term bicycle spaces, 8 scooter spaces and a shared fix-it stand.\n\nThe development will underground overhead utility lines along Cherry Street, replace the sidewalk, and include new street trees, planters, and potted plants to greatly enhance the street and pedestrian experience.`,
      order: 2,
    },
    {
      slug: "community",
      title: "A Thriving Community",
      content: `Cherry Street Commons will provide over five times the number of affordable homes that exist on the site today — ultimately providing 33 affordable homes to low-income households and families.\n\nEden and HIP hope to welcome families to the neighborhood in 2026 so they can enjoy San Carlos, the City of Good Living.\n\nDevelopment Partners: Eden Housing & HIP Housing\nArchitect: Van Meter Williams Pollack\nGeneral Contractor: Echelcon, Inc.\nFinancial Partners: City of San Carlos`,
      order: 3,
    },
  ];

  for (const section of sections) {
    await prisma.section.upsert({
      where: { slug: section.slug },
      update: { title: section.title, content: section.content },
      create: section,
    });
  }

  // Menu
  const menuItems = [
    { label: "Home", href: "/", order: 0 },
    { label: "About", href: "#about", order: 1 },
    { label: "Sustainability", href: "#sustainability", order: 2 },
    { label: "Community", href: "#community", order: 3 },
    { label: "Floor Plans", href: "#floorplans", order: 4 },
    { label: "Contact", href: "#contact", order: 5 },
  ];

  for (const item of menuItems) {
    const exists = await prisma.menuItem.findFirst({ where: { label: item.label } });
    if (!exists) {
      await prisma.menuItem.create({ data: item });
    } else {
      await prisma.menuItem.update({ where: { id: exists.id }, data: { href: item.href, order: item.order } });
    }
  }

  console.log("✅ Seed concluído com sucesso!");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
