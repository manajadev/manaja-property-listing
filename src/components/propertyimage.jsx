export default function PropertyImage() {
  return (
    <div className="relative min-h-65 sm:min-h-85 lg:min-h-full">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2400&auto=format&fit=crop"
        alt="Luxury modern villa with swimming pool and wooden deck"
        className="absolute inset-0 w-full h-full object-cover
                   lg:[clip-path:polygon(20%_0,100%_0,100%_100%,0_100%)]"
        loading="eager"
        fetchPriority="high"
      />
    </div>
  );
}