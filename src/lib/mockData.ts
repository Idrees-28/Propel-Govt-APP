export type ComplaintStatus = "Registered" | "Assigned" | "In Progress" | "Resolved";
export type ComplaintCategory = "Roads" | "Water Supply" | "Electricity" | "Sanitation";

export interface Complaint {
  id: string;
  title: string;
  description: string;
  category: ComplaintCategory;
  location: string;
  status: ComplaintStatus;
  date: string;
  citizen: string;
  assignedTo?: string;
  department: string;
}

export const getComplaints = (): Complaint[] => {
  const stored = localStorage.getItem("complaints");
  if (stored) return JSON.parse(stored);
  localStorage.setItem("complaints", JSON.stringify(defaultComplaints));
  return defaultComplaints;
};

export const addComplaint = (complaint: Complaint) => {
  const current = getComplaints();
  current.unshift(complaint);
  localStorage.setItem("complaints", JSON.stringify(current));
};

const defaultComplaints: Complaint[] = [

];

export const stats = {
  total: 0,
  resolved: 0,
  inProgress: 0,
  pending: 0,
  avgResolutionDays: 0,
};

export const departmentStats = [
  { name: "Roads", complaints: 0, resolved: 0, pending: 0 },
  { name: "Water Supply", complaints: 0, resolved: 0, pending: 0 },
  { name: "Electricity", complaints: 0, resolved: 0, pending: 0 },
  { name: "Sanitation", complaints: 0, resolved: 0, pending: 0 },
];

export const monthlyData = [
  { month: "Sep", complaints: 0, resolved: 0 },
  { month: "Oct", complaints: 0, resolved: 0 },
  { month: "Nov", complaints: 0, resolved: 0 },
  { month: "Dec", complaints: 0, resolved: 0 },
  { month: "Jan", complaints: 0, resolved: 0 },
  { month: "Feb", complaints: 0, resolved: 0 },
];
