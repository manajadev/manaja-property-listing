import TestimonialCard from "./testimonialcard";

const TESTIMONIALS = [
  {
    name: "Adaeze Okafor",
    role: "First-time buyer · Lekki",
    quote:
      "Manaja made finding my first apartment effortless. Every listing was verified and my manager responded within minutes.",
  },
  {
    name: "Tunde Bakare",
    role: "Property investor · Ikoyi",
    quote:
      "I've worked with many platforms. Manaja's verified listings and transparent manager contacts are unmatched.",
  },
  {
    name: "Fatima Yusuf",
    role: "Homeowner · Abuja",
    quote:
      "The verification process gave me the confidence to purchase remotely without a single regret.",
  },
  {
    name: "Chinedu Eze",
    role: "Business owner · Port Harcourt",
    quote:
      "Manaja understood exactly what I needed for my commercial space. Professional and transparent from start to finish.",
  },
  {
    name: "Amaka Nwosu",
    role: "Diaspora buyer · Enugu",
    quote:
      "Buying from abroad felt impossible until Manaja. Verified listings and real manager contacts made it simple.",
  },
  {
    name: "Olumide Adeyemi",
    role: "Land investor · Ibadan",
    quote:
      "I've purchased two plots through Manaja. Clean titles, honest pricing, and no surprises. Highly recommended.",
  },
];

export default function Testimonials() {
  return (
    <section
      className="bg-hero-panel text-hero-panel-foreground
                 py-16 sm:py-20 lg:py-24"
      aria-label="Client testimonials"
    >
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <p
            className="text-xs sm:text-sm font-medium tracking-[0.2em]
                       text-champagne uppercase"
          >
            Testimonials
          </p>
          <h2
            className="mt-3 font-serif
                       text-3xl sm:text-4xl lg:text-5xl
                       leading-[1.1] tracking-tight"
          >
            What our clients say
          </h2>
        </div>

        {/* Cards grid — 1 / 2 / 3 / 6 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-3">
          {TESTIMONIALS.map((t) => (
            <TestimonialCard
              key={t.name}
              name={t.name}
              role={t.role}
              quote={t.quote}
            />
          ))}
        </div>
      </div>
    </section>
  );
}