import { departmentStats, monthlyData, stats, getComplaints } from "@/lib/mockData";
const complaints = getComplaints();
import StatusBadge from "@/components/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from "recharts";
import { ClipboardList, CheckCircle2, Clock, TrendingUp } from "lucide-react";

const COLORS = ["hsl(215,70%,28%)", "hsl(200,80%,50%)", "hsl(38,90%,55%)", "hsl(160,60%,40%)"];

const pieData = [
  { name: "Roads", value: 68 },
  { name: "Water", value: 72 },
  { name: "Electricity", value: 55 },
  { name: "Sanitation", value: 53 },
];

const statCards = [
  { icon: ClipboardList, label: "Total Complaints", value: stats.total, color: "text-primary" },
  { icon: CheckCircle2, label: "Resolved", value: stats.resolved, color: "text-success" },
  { icon: Clock, label: "In Progress", value: stats.inProgress, color: "text-warning" },
  { icon: TrendingUp, label: "Avg. Resolution", value: `${stats.avgResolutionDays}d`, color: "text-info" },
];

const Dashboard = () => {
  return (
    <div className="container py-12">
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-heading font-bold">City Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">Overview of complaints, department performance, and analytics.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((s, i) => (
          <Card key={i} className="animate-count-up" style={{ animationDelay: `${i * 100}ms` }}>
            <CardContent className="pt-6 flex items-center gap-4">
              <div className={`p-3 rounded-xl bg-muted ${s.color}`}>
                <s.icon className="h-6 w-6" />
              </div>
              <div>
                <div className="text-2xl font-heading font-bold">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <Card className="animate-fade-in" style={{ animationDelay: "200ms" }}>
          <CardHeader><CardTitle className="font-heading">Monthly Trends</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214,20%,88%)" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="complaints" stroke="hsl(215,70%,28%)" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="resolved" stroke="hsl(160,60%,40%)" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="animate-fade-in" style={{ animationDelay: "300ms" }}>
          <CardHeader><CardTitle className="font-heading">Complaints by Category</CardTitle></CardHeader>
          <CardContent className="flex justify-center">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {pieData.map((_, i) => (<Cell key={i} fill={COLORS[i % COLORS.length]} />))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Department Performance */}
      <Card className="mb-8 animate-fade-in" style={{ animationDelay: "400ms" }}>
        <CardHeader><CardTitle className="font-heading">Department Performance</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={departmentStats}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214,20%,88%)" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="resolved" fill="hsl(160,60%,40%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="pending" fill="hsl(38,90%,55%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Complaints */}
      <Card className="animate-fade-in" style={{ animationDelay: "500ms" }}>
        <CardHeader><CardTitle className="font-heading">Recent Complaints</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Citizen</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {complaints.slice(0, 5).map((c) => (
                  <TableRow key={c.id}>
                    <TableCell className="font-mono font-medium text-primary">{c.id}</TableCell>
                    <TableCell className="font-medium">{c.title}</TableCell>
                    <TableCell>{c.department}</TableCell>
                    <TableCell className="text-muted-foreground">{c.citizen}</TableCell>
                    <TableCell className="text-muted-foreground">{c.assignedTo || "—"}</TableCell>
                    <TableCell><StatusBadge status={c.status} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
