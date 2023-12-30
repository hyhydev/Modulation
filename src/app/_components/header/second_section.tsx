import { currentUser } from "@clerk/nextjs";
import { Bell } from "lucide-react";
// import { useUIStore } from "~/stores/uiStore";
import { EpisodeForm } from "../episode_form/episode_form";
import { Button } from "~/ui/components/ui/button";

import { isHyhy } from "~/utils/auth";

export async function HeaderSecondSection() {
  const user = await currentUser();
  // const { fullWidthSearch } = useUIStore();

  return (
    <div
      className={`mr-2 flex-shrink-0 items-center md:gap-2`}
      // className={`mr-2 flex-shrink-0 items-center md:gap-2 ${
      //   fullWidthSearch ? "hidden" : "flex"
      // }`}
    >
      {user && isHyhy(user.username ?? "") && <EpisodeForm />}

      <Button size="icon" variant="ghost">
        <Bell />
      </Button>

      {/* <ThemeSwitch /> */}
    </div>
  );
}
