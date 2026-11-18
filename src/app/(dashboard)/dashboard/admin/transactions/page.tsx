import { CreditCard } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AdminTransactionsPage() {
    const transactions = [
        {
            id: "TXN-9021",
            userName: "Engr. Tanvir Ahmed",
            userEmail: "tanvir.engr@example.com",
            type: "Tutor Pro Subscription",
            amount: "1,500 BDT",
            method: "bKash",
            status: "completed",
            date: "Nov 17, 2026",
        },
        {
            id: "TXN-9020",
            userName: "Sadman Sakib",
            userEmail: "sadman.s@example.com",
            type: "Student Priority Matching",
            amount: "500 BDT",
            method: "Nagad",
            status: "completed",
            date: "Nov 16, 2026",
        },
        {
            id: "TXN-9019",
            userName: "Dr. Farhan Chowdhury",
            userEmail: "farhan.c@example.com",
            type: "Featured Tuition Placement",
            amount: "2,000 BDT",
            method: "Visa Card",
            status: "completed",
            date: "Nov 14, 2026",
        },
        {
            id: "TXN-9018",
            userName: "Ayesha Siddiqa",
            userEmail: "ayesha.s@example.com",
            type: "Student Pro Plan",
            amount: "800 BDT",
            method: "bKash",
            status: "completed",
            date: "Nov 12, 2026",
        },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Platform Transactions</h1>
                <p className="text-sm text-muted-foreground">
                    Record of platform subscription payments, tuition placement fees, and transactions.
                </p>
            </div>

            <div className="rounded-xl border bg-card shadow-xs overflow-hidden">
                <div className="border-b px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <CreditCard className="size-5 text-primary" />
                        <span className="font-semibold text-sm">Payment History</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                        Total {transactions.length} Transactions
                    </span>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-muted/50 border-b text-xs font-semibold uppercase text-muted-foreground">
                            <tr>
                                <th className="px-6 py-3.5">Transaction ID</th>
                                <th className="px-6 py-3.5">User</th>
                                <th className="px-6 py-3.5">Payment For</th>
                                <th className="px-6 py-3.5">Amount</th>
                                <th className="px-6 py-3.5">Method</th>
                                <th className="px-6 py-3.5">Status</th>
                                <th className="px-6 py-3.5 text-right">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {transactions.map((tx) => (
                                <tr key={tx.id} className="hover:bg-muted/30 transition-colors">
                                    <td className="px-6 py-4 font-mono text-xs font-semibold text-primary">
                                        {tx.id}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-foreground">{tx.userName}</div>
                                        <div className="text-xs text-muted-foreground">{tx.userEmail}</div>
                                    </td>
                                    <td className="px-6 py-4 text-xs font-medium text-foreground">
                                        {tx.type}
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-foreground">
                                        {tx.amount}
                                    </td>
                                    <td className="px-6 py-4 text-xs text-muted-foreground">
                                        {tx.method}
                                    </td>
                                    <td className="px-6 py-4">
                                        <Badge variant="success" className="text-xs capitalize">
                                            {tx.status}
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-4 text-xs text-muted-foreground text-right">
                                        {tx.date}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

