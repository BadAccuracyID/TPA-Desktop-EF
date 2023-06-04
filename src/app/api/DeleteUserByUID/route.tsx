import {NextResponse} from "next/server";
import {getAdminApp} from "@/components/datastore/firebase/admin/FirebaseAdminConfig";

export async function POST(req: Request) {
    let {uid} = await req.json();

    const adminApp = getAdminApp();
    if (!adminApp) {
        throw new Error('adminApp not initialized!')
    }

    await adminApp.auth().deleteUser(uid);
    return NextResponse.json({
        ok: true
    });
}
