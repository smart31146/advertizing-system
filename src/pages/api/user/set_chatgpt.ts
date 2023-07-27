import prisma from "@/configs/prisma/prisma";
import { User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | { error: string } | null>
) {
  const { method } = req;
  const { name, api_key, model } = req.body as { [key: string]: string };

  switch (method) {
    case "POST": {
      const user = await prisma.user
        .update({
          where: {
            name,
          },
          data: {
            api_key,
            model,
          },
        })
        .catch((err) => {
          console.log(err);
          return { error: "Failed to update api_key with username" };
        });
      // console.log("user: update", user)
      res.status(200).json(user);
      break;
    }
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
