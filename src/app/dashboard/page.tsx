import { Roles } from "@/constants/roles";
import { requireRole } from "@/lib/require-role";

const Dashboard = async () => {
  const sessionData = await requireRole([Roles.admin, Roles.seller]);

  const role = sessionData.user.role;

  const headline =
    role === Roles.admin
      ? "Admin Dashboard"
      : role === Roles.seller
        ? "Seller Dashboard"
        : "Dashboard";

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{headline}</h1>
      <p className="text-lg">
        Welcome back,{" "}
        <span className="font-semibold text-primary">
          {sessionData.user.name || "User"}!
        </span>{" "}
        <br />
        Here you can manage your{" "}
        {role === Roles.admin ? "platform and users" : "products and orders"}.
      </p>
    </div>
  );
};

export default Dashboard;
