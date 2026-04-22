import Image from 'next/image';

export function HeroSlideshow() {
  return (
    <div className="relative w-full h-[500px] md:h-[988px]">
      {/* desktop */}
      <Image
        src="/images/hero-banner-desktop.jpg"
        alt="Gallery Dept."
        fill
        priority
        className="hidden md:block object-cover object-center"
      />
      {/* mobile */}
      <Image
        src="/images/hero-banner-mobile.jpg"
        alt="Gallery Dept."
        fill
        priority
        className="block md:hidden object-cover object-center"
      />
    </div>
  );
}
