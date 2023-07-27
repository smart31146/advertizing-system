import prisma from "@/configs/prisma/prisma";
import { User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | { error: string } | null>
) {
  const { method } = req;
  const { name } = req.query as Partial<{ [key: string]: string }>;

  switch (method) {
    case "GET": {
      const user = await prisma.user
        .findUnique({
          where: {
            name,
          },
        })
        .catch((err) => {
          console.log(err);
          return { error: "Failed to get user with username" };
        });
      // console.log("user: get", user)
      res.status(200).json(user);
      break;
    }
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
