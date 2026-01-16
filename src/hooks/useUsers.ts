import { actions } from "astro:actions";
import { useEffect, useState } from "react";
import type { User } from "../types";
import { navigate } from "astro:transitions/client";

export interface Props {
  initialUsers: User[];
  refetchIntervalMs: number;
  page: number;
}

const useUsers = ({ initialUsers, refetchIntervalMs, page = 0 }: Props) => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchUsers(page);

    const intervalId = setInterval(() => fetchUsers(page), refetchIntervalMs);
    return () => clearInterval(intervalId);
  }, [page]);

  const fetchUsers = async (page: number) => {
    try {
      setLoading(true);
      const data = await actions.getUsers.orThrow({ page });

      setUsers(data.users ?? []);
      setTotalPages(data.totalPages ?? 0);
    } catch (error) {
      alert(
        "Ha ocurrido un error al obtener los usuarios. Por favor, recarga la página.",
      );
    } finally {
      setLoading(false);
    }
  };

  return { users, totalPages, loading };
};

export default useUsers;
