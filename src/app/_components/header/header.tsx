import { HeaderAuth } from "./auth";
import { HeaderFirstSection } from "./first_section";
import { HeaderForm } from "./form";
import { HeaderSearch } from "./search";
import { HeaderSecondSection } from "./second_section";

export function Header() {
  return (
    <div className="mx-4 mb-6 flex justify-between gap-10 pt-2 lg:gap-20">
      <HeaderFirstSection />
      <HeaderForm />
      <div className="flex items-center gap-1">
        <HeaderSearch />
        <HeaderSecondSection />
        <HeaderAuth />
      </div>
    </div>
  );
}
