import { actions } from "astro:actions";
import { useEffect, useState } from "react";
import type { User } from "../types";

export interface Props {
  initialUsers: User[];
  refetchIntervalMs: number;
}

const useUsers = ({ initialUsers, refetchIntervalMs }: Props) => {
  const [users, setUsers] = useState<User[]>(initialUsers);

  useEffect(() => {
    const intervalId = setInterval(() => fetchUsers(), refetchIntervalMs);
    return () => clearInterval(intervalId);
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await actions.getUsers.orThrow();

      setUsers(data.users);
    } catch (error) {
      // TODO: more UI friendly error handling
      alert(
        "Ha ocurrido un error al obtener los usuarios. Por favor, recarga la página.",
      );
    }
  };

  return { users };
};

export default useUsers;
