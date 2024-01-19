import {NextApiResponse } from 'next';
import msg91 from 'msg91';
import { NextResponse } from 'next/server';

export async function POST(req: Request, res: NextApiResponse) {

    let initialize = false
    const { phoneNumber } = await req.json();


    try {
        if (!initialize){
            msg91.initialize({authKey: process.env.MSG91_AUTH_KEY!});
            initialize = true
        }
        
        // Get the OTP service from MSG91
        let otp = msg91.getOTP(process.env.MSG91_OTP_TEMPLATE_ID!);

        // Send OTP
        await otp.send(phoneNumber);

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}