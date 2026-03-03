import { NextRequest, NextResponse } from "next/server";
import { readFileSync, existsSync } from "fs";
import { extname } from "path";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const filePath = searchParams.get('path');

    if (!filePath) {
        return new NextResponse("Missing path parameter", { status: 400 });
    }

    try {
        if (!existsSync(filePath)) {
            return new NextResponse("File not found", { status: 404 });
        }

        const fileBuffer = readFileSync(filePath);

        // Get the file extension
        const ext = extname(filePath).toLowerCase();
        let contentType = "image/jpeg";

        if (ext === ".png") contentType = "image/png";
        else if (ext === ".gif") contentType = "image/gif";
        else if (ext === ".svg") contentType = "image/svg+xml";
        else if (ext === ".webp") contentType = "image/webp";

        return new NextResponse(fileBuffer, {
            headers: {
                "Content-Type": contentType,
                "Cache-Control": "public, max-age=31536000, immutable",
            },
        });
    } catch (error) {
        console.error("Error serving local image:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
