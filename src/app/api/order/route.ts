import { NextResponse } from "next/server";
import { orderQueue } from "@/lib/queue";

export async function POST(req: Request) {
  const body = await req.json();
  const { orderId, items } = body;

  if (!orderId || !Array.isArray(items)) {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }

  await orderQueue.add("processOrder", { orderId, items });

  return NextResponse.json({ msg: "Order queued for processing" });
}
