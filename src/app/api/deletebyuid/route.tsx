import {adminAuth} from "@/components/datastore/firebase/admin/FirebaseAdminConfig";
import {NextApiRequest, NextApiResponse} from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {uid} = req.body;

    try {
        await adminAuth.deleteUser(uid);
        res.status(200).json({message: "success"});
    } catch (e) {
        res.status(500).json({message: "failed"});
    }

    return;
}
