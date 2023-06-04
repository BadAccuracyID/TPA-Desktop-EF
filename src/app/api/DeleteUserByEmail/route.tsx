import {NextResponse} from "next/server";
import admin from "firebase-admin";

export async function POST(req: Request) {
    let {email} = await req.json();

    let user;
    try {
        user = await admin.auth().getUserByEmail(email);
    } catch (error) {
        return NextResponse.json({
            ok: false
        });
    }
    await admin.auth().deleteUser(user.uid);
    return NextResponse.json({
        ok: true
    });
}
