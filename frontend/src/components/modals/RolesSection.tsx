import type { ProjectRole } from "@/constants/Projects";
import { RolesList } from "@/components/modals/RolesList";
import { WorkMethodTimeline } from "@/components/modals/WorkMethodTimeline";

export function RolesSection({
  heading,
  items,
}: {
  heading?: string;
  items: ProjectRole[];
}) {
  if (heading === "작업 방식") {
    return <WorkMethodTimeline items={items} />;
  }
  return <RolesList items={items} />;
}
