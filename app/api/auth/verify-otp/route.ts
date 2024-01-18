import { NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import msg91 from 'msg91';


export async function POST(req: Request, res: NextApiResponse) {

    const requestBody = await req.json();
    const { phoneNumber, otp } = requestBody;
    try {
        // Initialize MSG91 client
        msg91.initialize({authKey: process.env.MSG91_AUTH_KEY!});

        // Get the OTP service from MSG91
        let otpService = msg91.getOTP(process.env.MSG91_OTP_TEMPLATE_ID!);

        // Verify OTP
        await otpService.verify(phoneNumber, otp);

        return NextResponse.json({ success: true }, {status: 200});
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
