import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();
    const creds = body.filteredData;

    try {
        const dataSend = await axios.post(
            process.env.GOOGLE_SHEET_URL!,
            creds,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        return NextResponse.json({ data: dataSend.data }, { status: 201 });
    } catch (error) {
        console.error("Error sending data to Google Sheets:", error);
        return new NextResponse("Google sheet Error", { status: 401 });
    }
}
