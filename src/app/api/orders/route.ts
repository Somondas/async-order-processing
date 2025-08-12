import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { product_name, quantity, price, user_id } = body;

  if (!product_name || !quantity || !price || !user_id) {
    return NextResponse.json(
      {
        error: "Missing fields",
      },
      {
        status: 400,
      }
    );
  }
  const { data, error } = await supabase
    .from("orders")
    .insert([
      {
        product_name,
        quantity,
        price,
      },
    ])
    .select();

  if (error) {
    return NextResponse.json(
      {
        error: error?.message,
      },
      {
        status: 500,
      }
    );
  }
  return NextResponse.json({
    message: "Order saved",
    order: data[0],
  });
}
