import { getAllUsers } from "@/actions/user.actions";
import UserTableWrapper from "@/components/modules/dashboard/users/user-table-wrapper";
import PaginationControls from "@/components/ui/pagination-controls";

const AdminUserPage = async () => {
  const { data, meta }: any = await getAllUsers();
  const pagination = meta || {
    limit: 10,
    page: 1,
    total: 0,
    totalPages: 1,
  };
  return (
    <div>
      <div className="flex items-center justify-between mb-4 pr-5 max-w-7xl mx-auto">
        <h1 className="text-3xl font-semibold">Users</h1>
      </div>

      <div className="overflow-x-auto max-w-7xl mx-auto mt-12 border rounded-md">
        <UserTableWrapper userData={data} />
      </div>
      <div className=" max-w-7xl mx-auto">
        <PaginationControls meta={pagination} />
      </div>
    </div>
  );
};

export default AdminUserPage;
