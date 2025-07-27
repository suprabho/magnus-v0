import { promises as fs } from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const preferences = await req.json();
    const threadId = preferences.threadId || 'default_thread';

    const folderPath = path.join(process.cwd(), 'User_data');
    // const filePath = path.join(folderPath, `user_preferences.json`);
    const filePath = path.join(folderPath, `${threadId}.json`);
    // Ensure folder exists
    await fs.mkdir(folderPath, { recursive: true });

    // Save JSON file
    await fs.writeFile(filePath, JSON.stringify(preferences, null, 2));

    return NextResponse.json({ success: true, file: filePath });
  } catch (error) {
    console.error("Error saving preferences:", error);
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}
