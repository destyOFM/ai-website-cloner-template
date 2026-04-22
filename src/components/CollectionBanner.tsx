import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface CollectionItem {
  title: string;
  imgSrc: string;
  imgAlt?: string;
  link: string;
}

interface CollectionBannerProps {
  items: CollectionItem[]; // always 2 items
}

export function CollectionBanner({ items }: CollectionBannerProps) {
  return (
    <section className="w-full">
      <div className="flex flex-col md:flex-row">
        {items.map((item) => (
          <Link
            key={item.link}
            href={item.link}
            className={cn(
              "group relative block overflow-hidden w-full md:w-1/2",
              "h-[480px] md:h-[974px]"
            )}
          >
            <div className="absolute inset-0 transition-transform duration-400 ease-out group-hover:scale-[1.03]">
              <Image
                src={item.imgSrc}
                alt={item.imgAlt ?? item.title}
                fill
                style={{ objectFit: "cover", objectPosition: "center top" }}
              />
            </div>
            <div
              className="absolute bottom-0 left-0 right-0 bg-white"
              style={{ padding: "24px" }}
            >
              <span
                style={{
                  fontFamily: "var(--font-fjalla)",
                  fontSize: "23px",
                  textTransform: "uppercase",
                  color: "#171717",
                }}
              >
                {item.title}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
