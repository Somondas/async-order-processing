import type { NextApiRequest, NextApiResponse } from "next";

import { orderQueue } from "@/lib/queue";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(405).json({
      message: "Only POST allowed",
    });

  const { orderId, items } = req.body;

  if (!orderId || !Array.isArray(items)) {
    return res.status(400).json({
      message: "Invalid request",
    });
  }
  await orderQueue.add("processOrder", {
    orderId,
    items,
  });

  return res.status(200).json({
    msg: "Order queued for processing",
  });
}
