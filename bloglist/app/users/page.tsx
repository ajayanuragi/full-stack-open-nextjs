import { notFound } from "next/navigation";
import { getUsers } from "../services/users";
import Link from "next/link";

const Users = async () => {
  const users = await getUsers();
  if (!users) {
    notFound();
  }
  return (
    <div className="max-w-2xl w-lg mx-auto my-4">
      <h2 className="text-3xl font-bold text-black">Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="shadow px-2 py-2">
            <Link href={`/users/${user.username}`} className="text-blue-600">
              {user.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Users;
