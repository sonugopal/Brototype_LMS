import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(req: Request, res: NextResponse) {
    const body = await req.json()
    const { phoneNumber, otp } = body;
    const headers = {
        authkey: process.env.MSG91_AUTH_KEY!
    };

    try {
        const url = `${process.env.MSG91_BASEURL!}/verify?mobile=${phoneNumber}&otp=${otp}&authkey=${process.env.MSG91_AUTH_KEY!}`;
        const { data } = await axios.get(url, { headers });

        if (data.type === "error") throw new Error(data.message);

        return NextResponse.json({ success: true }, {status: 200});
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, {status: 500});
    }
}
