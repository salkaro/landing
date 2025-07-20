
import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"

const CodeBlockExample = () => {
    return (
        <div className="rounded-lg border bg-background">
            <div className="flex items-center justify-between border-b bg-muted px-4 py-2">
                <div></div>
                <Button variant="ghost" size="icon" className="hover:bg-muted/50 text-muted-foreground">
                    <Copy className="h-4 w-4" />
                    <span className="sr-only">Copy code</span>
                </Button>
            </div>
            <div className="p-4 font-mono text-sm leading-6 text-foreground">
                <pre className="language-javascript">
                    <code>{`import React from 'react';
import fetch from "node-fetch";

const url = "https://api.salkaro.com/v1/upload?org_id={org_id}&sensor_id={sensor_id}";
const apiKey = "API_KEY";

const payload = {
    value: 28,
    status: "OK",
    timestamp: 1752696307,
};

fetch(url, {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    "Authorization": 'Bearer {apiKey}',
    },
    body: JSON.stringify(payload),
})
    .then((res) => res.json())
    .then((data) => console.log("Response:", data))
    .catch((err) => console.error("Error:", err));`}</code>
                </pre>
            </div>
        </div>
    )
}



export default CodeBlockExample



