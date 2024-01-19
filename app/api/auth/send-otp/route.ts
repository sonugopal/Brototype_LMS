import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(req:Request, res: NextResponse) {
    const body = await req.json()
    const {phoneNumber} = body
    const template_id = process.env.MSG91_OTP_TEMPLATE_ID!;
    const headers = {
        authkey:process.env.MSG91_AUTH_KEY!
    };

    try {
        const url = `https://control.msg91.com/api/v5/otp?template_id=${template_id}&mobile=${phoneNumber}&otp_length=4&otp_expiry=5`;
        const datas = {
            Param1: "Student",
        };
        const { data } = await axios.post(url, datas, { headers });

        if (data.type === "error") throw new Error(data.message);

        return NextResponse.json({ success: true }, {status: 200});
    } catch (error: any) {
        return NextResponse.json({ success: false,  message: error.message }, {status: 500});
    }
}
