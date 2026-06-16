import Link from "next/link";

const HOME_CARDS = [
  {
    title: "About the Project",
    text: "Learn about the planned affordable homes at Cherry Street Commons.",
    href: "/about",
  },
  {
    title: "Homes",
    text: "Review the planned one, two, and three-bedroom apartment mix.",
    href: "/homes",
  },
  {
    title: "Location",
    text: "See the downtown San Carlos address and nearby connections.",
    href: "/location",
  },
  {
    title: "Apply",
    text: "Find out how resident information will be shared as opening approaches.",
    href: "/apply",
  },
];

export default function SectionsBlock() {
  return (
    <section className="bg-white py-[58px] md:py-[62px]">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10">
        <div className="mx-auto mb-10 max-w-[780px] text-center">
          <h2
            className="text-[2rem] font-extrabold leading-[1.1] md:text-[3.2rem]"
            style={{ color: "#1a1a1a" }}
          >
            Welcome to Cherry Street Commons.
          </h2>
          <p className="mx-auto mt-5 max-w-[720px] text-base leading-[1.65] md:text-[1.15rem]" style={{ color: "#67635c" }}>
            Affordable homes are coming to downtown San Carlos with practical layouts,
            neighborhood access, and a clear path for future resident updates.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {HOME_CARDS.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="group flex min-h-[176px] flex-col justify-between rounded-[12px] border border-[#e6e1d8] bg-white p-[25px] text-left no-underline transition-colors hover:border-[#7f1717]"
              style={{ color: "#1a1a1a" }}
            >
              <span>
                <span className="block text-[1.04rem] font-extrabold leading-snug">
                  {card.title}
                </span>
                <span className="mt-3 block text-sm leading-[1.55]" style={{ color: "#67635c" }}>
                  {card.text}
                </span>
              </span>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#7f1717]">
                Open
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
