"use client";

import {
  ClientSideSuspense,
  LiveblocksProvider,
  RoomProvider,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { getUsers } from "@/actions/get-users";
import { User } from "@/lib/types";

interface Props {
  children: React.ReactNode;
}

export const Room = ({ children }: Props) => {
  const [users, setUsers] = useState<User[]>([]);

  const params = useParams();

  const fetchUsers = useMemo(
    () => async () => {
      const list = await getUsers();

      setUsers(list);
    },
    []
  );

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <LiveblocksProvider
      authEndpoint="/api/liveblocks-auth"
      throttle={16}
      resolveUsers={({ userIds }) => {
        return userIds.map(
          (userId) => users.find((user) => user.id === userId) ?? undefined
        );
      }}
      resolveMentionSuggestions={({ text }) => {
        let filteredUsers = users;

        if (text) {
          filteredUsers = users.filter((user) =>
            user.name.toLowerCase().includes(text.toLowerCase())
          );
        }

        return filteredUsers.map((user) => user.id);
      }}
      resolveRoomsInfo={() => []}
    >
      <RoomProvider id={params.documentId as string}>
        <ClientSideSuspense fallback={null}>{children}</ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
};
