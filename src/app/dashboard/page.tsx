import { Roles } from "@/constants/roles";
import { requireRole } from "@/lib/require-role";

const Dashboard = async () => {
  await requireRole([Roles.admin, Roles.seller]);
  return <div>Dashboard</div>;
};

export default Dashboard;
