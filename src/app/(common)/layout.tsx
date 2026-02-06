import { getUser } from "@/actions/user.actions";
import { Navbar } from "@/components/layout/navbar";
import { Roles } from "@/constants/roles";

const CommonLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const user = await getUser();

  const isDashboardUser =
    user?.role === Roles.admin
      ? "admin"
      : user?.role === Roles.seller
        ? "seller"
        : null;

  return (
    <div>
      <Navbar isDashboardUser={isDashboardUser} />
      <div className="max-w-6xl mx-auto p-4">{children}</div>
    </div>
  );
};

export default CommonLayout;
