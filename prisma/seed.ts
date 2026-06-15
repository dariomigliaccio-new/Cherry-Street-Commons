import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL || "dariomigliaccio@gmail.com";
  const rawPassword = process.env.ADMIN_PASSWORD || "changeme";
  const password = await bcrypt.hash(rawPassword, 12);

  await prisma.user.upsert({
    where: { email },
    update: { password },
    create: { email, password, role: "admin" },
  });

  const defaultContent = [
    { key: "site_name", value: "Cherry Street Commons", type: "text" },
    { key: "site_logo", value: "", type: "image" },
    { key: "site_tagline", value: "Community. Connection. Home.", type: "text" },
    { key: "footer_text", value: "© 2025 Cherry Street Commons. All rights reserved.", type: "text" },
    { key: "contact_email", value: "info@cherrystreetcommons.com", type: "text" },
    { key: "contact_phone", value: "(555) 123-4567", type: "text" },
    { key: "contact_address", value: "123 Cherry Street, Your City, State 12345", type: "text" },
  ];

  for (const item of defaultContent) {
    await prisma.siteContent.upsert({
      where: { key: item.key },
      update: {},
      create: item,
    });
  }

  await prisma.banner.upsert({
    where: { id: "default-banner" },
    update: {},
    create: {
      id: "default-banner",
      title: "Welcome to Cherry Street Commons",
      subtitle: "A place where community thrives",
      buttonText: "Learn More",
      buttonHref: "#about",
      imageUrl: "",
      order: 0,
      active: true,
    },
  });

  const sections = [
    { slug: "about", title: "About Us", content: "Cherry Street Commons is a vibrant community space dedicated to bringing people together.", order: 1 },
    { slug: "services", title: "Our Services", content: "We offer a wide range of community services and programs for all ages.", order: 2 },
    { slug: "events", title: "Events", content: "Stay connected with our upcoming events and community gatherings.", order: 3 },
  ];

  for (const section of sections) {
    await prisma.section.upsert({
      where: { slug: section.slug },
      update: {},
      create: section,
    });
  }

  const menuItems = [
    { label: "Home", href: "/", order: 0 },
    { label: "About", href: "#about", order: 1 },
    { label: "Services", href: "#services", order: 2 },
    { label: "Events", href: "#events", order: 3 },
    { label: "Contact", href: "#contact", order: 4 },
  ];

  for (const item of menuItems) {
    const exists = await prisma.menuItem.findFirst({ where: { label: item.label } });
    if (!exists) await prisma.menuItem.create({ data: item });
  }

  console.log("✅ Seed concluído com sucesso!");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
