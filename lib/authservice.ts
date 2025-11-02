import { auth } from "@/auth";
import { db } from "./db";

export const getSelf = async () => {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    throw new Error("Unauthorized");
  }

  const user = await db.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!user) {
    throw new Error("Not found");
  }

  return user;
};

export const getSelfByUsername = async (username: string) => {
  const session = await auth();

  if (!session || !session.user || !session.user.username) {
    throw new Error("Unauthorized");
  }

  const user = await db.user.findUnique({
    where: { username },
  });

  if (!user) {
    throw new Error("Not found");
  }

  if (user.username !== session.user.username) {
    throw new Error("Unauthorized");
  }

  return user;
};