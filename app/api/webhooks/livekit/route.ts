import { headers } from "next/headers";
import { WebhookReceiver } from "livekit-server-sdk";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

const receiver = new WebhookReceiver(
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!
);

export async  function POST(req: Request) {
    const body = await req.text();
    const headerPayload = headers();
    const authorization = headerPayload.get("Authorization");

    if(!authorization) { return new Response("No Authorization header", {status: 400}); }

    const event = await receiver.receive(body, authorization);

    console.log("LiveKit webhook received:", event.event);

    if(event.event === "ingress_started") {
        await db.stream.update({
            where: {
                ingressId: event.ingressInfo?.ingressId,
            },
            data: {
                isStreaming: true,
            },
        });

        // Revalidate pages to show live badge immediately
        revalidatePath("/");
        revalidatePath("/search");

        return new NextResponse("ok", { status: 200 });
    }

    if(event.event === "ingress_ended") {
        await db.stream.update({
            where: {
                ingressId: event.ingressInfo?.ingressId,
            },
            data: {
                isStreaming: false,
            },
        });

        // Revalidate pages to remove live badge immediately
        revalidatePath("/");
        revalidatePath("/search");

        return new NextResponse("ok", { status: 200 });
    }

    return new Response("ok", { status: 200 });
}