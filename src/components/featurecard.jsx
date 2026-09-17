export default function FeatureCard({ image, alt }) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-muted h-105 sm:h-125 lg:h-140">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  );
}