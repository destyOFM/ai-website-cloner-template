import { cn } from "@/lib/utils";

export function AnnouncementBar() {
  return (
    <div className={cn("w-full bg-white")}>
      <div
        className={cn(
          "hidden md:flex items-center justify-center bg-white",
          "h-[22px] px-10"
        )}
      >
        <span
          className="text-[13px] text-[#171717]"
          style={{ fontFamily: "var(--font-courier)" }}
        >
          Free shipping to Canada on all orders above CA$980.00
        </span>
      </div>

      <div
        className={cn(
          "flex items-center bg-white h-[30px] px-10",
          "relative"
        )}
      >
        <div className="flex items-center gap-0.5 z-10">
          <span
            className="text-[13px] text-[#171717] cursor-pointer select-none"
            style={{ fontFamily: "var(--font-courier)" }}
          >
            CANADA (CAD$)
          </span>
          <span className="text-[13px] text-[#171717] leading-none">▾</span>
        </div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span
            className="text-[13px] text-[#171717]"
            style={{ fontFamily: "var(--font-courier)" }}
          >
            FREE SHIPPING ON ORDERS $500+ (US)
          </span>
        </div>

        <div className="ml-auto" />
      </div>
    </div>
  );
}
