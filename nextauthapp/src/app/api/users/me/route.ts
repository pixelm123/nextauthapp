import { getDataFromToken } from "@/helpers/detDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import { connect } from '@/dbconfig/dbconfig';
import User from "@/models/userModel";

connect()

export async function GET(request: NextRequest) {
    try {
        const userID = await getDataFromToken(request)
        const user = await User.findOne({ _id: userID }).select("-password")
        if (user) {
            return NextResponse.json({ success: true, message: "User Found", data: user })
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 })

    }
}