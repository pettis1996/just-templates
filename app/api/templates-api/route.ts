import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") as "templates" | "components";

    if (!type) {
        return NextResponse.json({ error: "Type is required" }, { status: 400 });
    }

    const supabase = createClient();

    let tableName: string;
    if (type === "templates") {
        tableName = "website_templates";
    } else if (type === "components") {
        tableName = "component_templates";
    } else {
        return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }

    const { data, error } = await supabase.from(tableName).select("*");

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}