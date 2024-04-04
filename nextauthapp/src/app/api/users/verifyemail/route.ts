import { connect } from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

connect()

export async function POST(request: NextRequest, response: NextResponse) {
    try {
        const reqBody = await request.json()
        const { token } = reqBody
        console.log("token:", token)
        const user: any = User.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } })
        console.log("user:", user)
        if (!user) {
            return NextResponse.json({ error: "invalid token" }, { status: 400 })
        }

        user.isVerfied = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({
            message: "Email verified successflly",
            success: true
        })

    } catch (error: any) {
        return NextResponse.json({ error: error.message })
    }
}