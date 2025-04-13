import { headers } from "next/headers";
import { WebhookReceiver } from "livekit-server-sdk";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

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

    if(event.event === "ingress_started") {
        await db.stream.update({
            where: {
                ingressId: event.ingressInfo?.ingressId,
            },
            data: {
                isStreaming: true,
            },
        })
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
        })
        return new NextResponse("ok", { status: 200 });
    }

    return new Response("ok", { status: 200 });
}