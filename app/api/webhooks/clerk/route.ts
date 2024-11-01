import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { resetIngresses } from "@/actions/ingress";

export async function POST(req: Request) {
    const webhookSecret: string = process.env.CLERK_WEBHOOK_SECRET || "your-secret";
    if(!webhookSecret) {
        throw new Error("There is no WEBHOOK_SECRET in .env || .env.local. Please add one from Clerk Dashboard");
    }

    // Getting the headers
    const svix_id = req.headers.get("svix-id") ?? "";
    const svix_timestamp = req.headers.get("svix-timestamp") ?? "";
    const svix_signature = req.headers.get("svix-signature") ?? "";
  
    
    if(!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('An error has occured - no svix headers',{
            status: 400
        })
    }

    // Getting the body
    // Getting the payload
    // Initializing the webhook
    const payload = await req.json();
    const body = JSON.stringify(payload);
    const sivx = new Webhook(webhookSecret);

    let msg: WebhookEvent;

    // verification of the payload
    try {
        msg = sivx.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as WebhookEvent
    } catch(err) {
        console.error("Verification error: ", err);
        return new Response("An error has occured", {
            status: 400
        })
    }

    const eventType = msg.type;
    if (eventType === "user.created") {
        await db.user.create({
            data: {
                externalUserId: payload.data.id,
                username: payload.data.username,
                imageUrl: payload.data.image_url,
                stream: {
                    create: {
                        name: `${payload.data.username}'s stream`
                    }
                }
            }
        })
    }

    if (eventType === "user.updated") {
        const currentUser = await db.user.findUnique({
            where: {
                externalUserId: payload.data.id
            } 
        })
        
        if(!currentUser) {
            return new Response("User not found", {status: 404});
        }
        
        await db.user.update({
            where: {
                externalUserId: payload.data.id
            },
            data: {
                username: payload.data.username,
                imageUrl : payload.data.image_url
            }
        })
    }

    if(eventType === "user.deleted") {
        await resetIngresses(payload.data.id);
        await db.user.delete({
            where: {
                externalUserId: payload.data.id,
            },
        })
    }

    return new Response('', {status: 200})
}