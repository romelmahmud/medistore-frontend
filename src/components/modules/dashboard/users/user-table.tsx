import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserReturnType } from "@/types";
import UserActions from "./user-actions";

const UserTable = ({ userData }: { userData: UserReturnType[] }) => {
  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Action</TableHead>

          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {userData.map((user: UserReturnType) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>{user.status}</TableCell>

            <TableCell
              className={`${
                user.status === "ACTIVE" ? "text-green-500" : "text-red-500"
              }`}
            >
              {user.status === "ACTIVE" ? "Active" : "Banned"}
            </TableCell>
            <TableCell className="text-right">
              <UserActions user={user} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserTable;
