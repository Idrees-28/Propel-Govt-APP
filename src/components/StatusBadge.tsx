import type { ComplaintStatus } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";

const statusStyles: Record<ComplaintStatus, string> = {
  Registered: "bg-info/15 text-info border-info/30",
  Assigned: "bg-accent/15 text-accent-foreground border-accent/30",
  "In Progress": "bg-warning/15 text-warning-foreground border-warning/30",
  Resolved: "bg-success/15 text-success border-success/30",
};

const StatusBadge = ({ status }: { status: ComplaintStatus }) => (
  <Badge variant="outline" className={`${statusStyles[status]} font-medium`}>
    {status}
  </Badge>
);

export default StatusBadge;
