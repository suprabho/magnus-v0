import { promises as fs } from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const preferences = await req.json();
    const threadId = preferences.threadId || 'default_thread';

    const folderPath = path.join(process.cwd(), 'User_data');
    const filePath = path.join(folderPath, `${threadId}.json`);
    await fs.mkdir(folderPath, { recursive: true });

    // Overwrite the file with new data — this always replaces existing content
    await fs.writeFile(filePath, JSON.stringify(preferences, null, 2));

    return NextResponse.json({ success: true, file: filePath });
  } catch (error) {
    console.error("Error saving preferences:", error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}