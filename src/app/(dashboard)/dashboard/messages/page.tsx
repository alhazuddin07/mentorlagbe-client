import { Search, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function DashboardMessagesPage() {
    const conversations = [
        {
            id: "conv-1",
            name: "Dr. Farhan Chowdhury",
            role: "Tutor",
            lastMessage: "I reviewed your physics syllabus. Let's schedule the first session.",
            time: "10:30 AM",
            unread: 2,
            active: true,
        },
        {
            id: "conv-2",
            name: "Sadman Sakib",
            role: "Student",
            lastMessage: "Thank you! I will prepare the chapter questions beforehand.",
            time: "Yesterday",
            unread: 0,
            active: false,
        },
        {
            id: "conv-3",
            name: "Nusrat Jahan",
            role: "Tutor",
            lastMessage: "Class notes for Lesson 3 have been uploaded to Drive.",
            time: "Nov 15",
            unread: 0,
            active: false,
        },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Messages</h1>
                <p className="text-sm text-muted-foreground">
                    Connect and chat directly with students and tutors.
                </p>
            </div>

            <div className="grid md:grid-cols-3 rounded-xl border bg-card shadow-xs overflow-hidden min-h-[500px]">
                {/* Conversation List */}
                <div className="border-r border-border md:col-span-1 flex flex-col">
                    <div className="p-3 border-b">
                        <div className="relative">
                            <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Search conversations..."
                                className="pl-9 h-9 text-xs"
                            />
                        </div>
                    </div>

                    <div className="divide-y divide-border overflow-y-auto flex-1">
                        {conversations.map((c) => (
                            <div
                                key={c.id}
                                className={`p-4 cursor-pointer hover:bg-muted/40 transition-colors flex items-start gap-3 ${
                                    c.active ? "bg-muted/50" : ""
                                }`}
                            >
                                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-xs">
                                    {c.name.charAt(0)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <p className="text-xs font-semibold text-foreground truncate">
                                            {c.name}
                                        </p>
                                        <span className="text-[10px] text-muted-foreground">
                                            {c.time}
                                        </span>
                                    </div>
                                    <p className="text-[11px] text-muted-foreground truncate mt-0.5">
                                        {c.lastMessage}
                                    </p>
                                </div>
                                {c.unread > 0 && (
                                    <span className="flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                                        {c.unread}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Chat Panel */}
                <div className="md:col-span-2 flex flex-col h-[500px]">
                    <div className="p-4 border-b flex items-center justify-between bg-muted/20">
                        <div className="flex items-center gap-3">
                            <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-xs">
                                D
                            </div>
                            <div>
                                <h3 className="font-semibold text-sm">Dr. Farhan Chowdhury</h3>
                                <p className="text-[11px] text-emerald-600 font-medium">Online</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 p-4 space-y-3 overflow-y-auto bg-muted/10">
                        <div className="flex flex-col items-start max-w-[80%]">
                            <div className="rounded-2xl rounded-tl-none bg-muted px-4 py-2.5 text-xs text-foreground">
                                Hello! Thanks for reaching out regarding the HSC Physics tuition.
                            </div>
                            <span className="text-[10px] text-muted-foreground mt-1 px-1">10:28 AM</span>
                        </div>

                        <div className="flex flex-col items-end ml-auto max-w-[80%]">
                            <div className="rounded-2xl rounded-tr-none bg-primary text-primary-foreground px-4 py-2.5 text-xs">
                                Good morning! Yes, I want to confirm if you teach 3 days per week online.
                            </div>
                            <span className="text-[10px] text-muted-foreground mt-1 px-1">10:29 AM</span>
                        </div>

                        <div className="flex flex-col items-start max-w-[80%]">
                            <div className="rounded-2xl rounded-tl-none bg-muted px-4 py-2.5 text-xs text-foreground">
                                I reviewed your physics syllabus. Let&apos;s schedule the first session.
                            </div>
                            <span className="text-[10px] text-muted-foreground mt-1 px-1">10:30 AM</span>
                        </div>
                    </div>

                    <div className="p-3 border-t bg-background flex items-center gap-2">
                        <Input
                            placeholder="Type a message..."
                            className="h-10 text-xs flex-1"
                        />
                        <Button size="sm" className="h-10 px-4">
                            <Send className="size-3.5" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
