import { getMe } from "@/actions/user.actions";
import Image from "next/image";

const ProfilePage = async () => {
  const user = await getMe();

  console.log(user);
  return (
    <div className=" mx-auto px-6 py-12 space-y-8">
      {/* Header */}
      <div className="flex justify-start">
        <div className="flex flex-col items-start justify-start gap-2 mb-6">
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name}
              width={120}
              height={120}
              className="rounded-full object-cover"
            />
          ) : (
            <div className="h-28 w-28 bg-muted rounded-full flex items-center justify-center text-2xl font-semibold text-foreground">
              {user.name
                .split(" ")
                .map((n: any) => n[0])
                .join("")}
            </div>
          )}
          <h1 className="text-2xl font-semibold">{user.name}</h1>

          <p className="text-muted-foreground text-sm">{user.role}</p>
        </div>
      </div>

      {/* Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <p className=" font-medium">Name</p>
          <p className="text-sm text-muted-foreground">{user.name}</p>
        </div>
        <div className="space-y-2">
          <p className="font-medium">Email</p>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
        <div className="space-y-2">
          <p className=" font-medium">Phone</p>
          <p className="text-sm text-muted-foreground">
            {user.phone || "Not Provided"}
          </p>
        </div>
        <div className="space-y-2">
          <p className=" font-medium">Account Created</p>
          <p className="text-sm text-muted-foreground">
            {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
