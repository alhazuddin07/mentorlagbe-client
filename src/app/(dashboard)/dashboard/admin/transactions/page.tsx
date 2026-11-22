export const instant = false;

import { CreditCard, DollarSign, ArrowUpRight, TrendingUp, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getPayments } from "@/lib/api/actions/paymens";
import type { Payment } from "@/types/payment";

function formatAmount(amount?: number, currency = "usd") {
    if (typeof amount !== "number" || isNaN(amount)) return "$0";
    const normalized = amount >= 1000 ? amount / 100 : amount;
    const cur = (currency || "usd").toLowerCase();
    if (cur === "bdt") {
        return `৳${normalized.toLocaleString("en-BD", { maximumFractionDigits: 0 })}`;
    }
    return `$${normalized.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatDate(dateValue?: string | Date) {
    if (!dateValue) return "N/A";
    try {
        const d = new Date(dateValue);
        if (isNaN(d.getTime())) return "N/A";
        return d.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    } catch {
        return "N/A";
    }
}

export default async function AdminTransactionsPage() {
    const payments: Payment[] = await getPayments();

    const totalRevenue = payments.reduce((sum, tx) => {
        const val = typeof tx.amount === "number" ? (tx.amount >= 1000 ? tx.amount / 100 : tx.amount) : 0;
        return sum + val;
    }, 0);

    const proUsersCount = payments.filter((tx) =>
        (tx.planName || "").toLowerCase().includes("pro") ||
        (tx.paymentStatus || "").toLowerCase() === "pro"
    ).length;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Platform Transactions</h1>
                <p className="text-sm text-muted-foreground">
                    Real-time record of platform subscription payments, tuition upgrades, and Stripe checkout transactions.
                </p>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-xl border bg-card p-5 shadow-xs">
                    <div className="flex items-center justify-between text-muted-foreground">
                        <span className="text-xs font-medium uppercase tracking-wider">Total Revenue</span>
                        <div className="rounded-lg bg-primary/10 p-2 text-primary">
                            <DollarSign className="size-4" />
                        </div>
                    </div>
                    <div className="mt-3">
                        <div className="text-2xl font-bold tracking-tight">
                            ${totalRevenue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                        <p className="mt-1 flex items-center text-xs text-emerald-600">
                            <ArrowUpRight className="mr-0.5 size-3.5" />
                            From verified Stripe payments
                        </p>
                    </div>
                </div>

                <div className="rounded-xl border bg-card p-5 shadow-xs">
                    <div className="flex items-center justify-between text-muted-foreground">
                        <span className="text-xs font-medium uppercase tracking-wider">Total Transactions</span>
                        <div className="rounded-lg bg-blue-500/10 p-2 text-blue-600">
                            <CreditCard className="size-4" />
                        </div>
                    </div>
                    <div className="mt-3">
                        <div className="text-2xl font-bold tracking-tight">{payments.length}</div>
                        <p className="mt-1 text-xs text-muted-foreground">All-time processed payments</p>
                    </div>
                </div>

                <div className="rounded-xl border bg-card p-5 shadow-xs">
                    <div className="flex items-center justify-between text-muted-foreground">
                        <span className="text-xs font-medium uppercase tracking-wider">Pro Upgrades</span>
                        <div className="rounded-lg bg-purple-500/10 p-2 text-purple-600">
                            <TrendingUp className="size-4" />
                        </div>
                    </div>
                    <div className="mt-3">
                        <div className="text-2xl font-bold tracking-tight">{proUsersCount}</div>
                        <p className="mt-1 text-xs text-muted-foreground">Pro plan subscribers</p>
                    </div>
                </div>

                <div className="rounded-xl border bg-card p-5 shadow-xs">
                    <div className="flex items-center justify-between text-muted-foreground">
                        <span className="text-xs font-medium uppercase tracking-wider">Payment Gateway</span>
                        <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-600">
                            <ShieldCheck className="size-4" />
                        </div>
                    </div>
                    <div className="mt-3">
                        <div className="text-2xl font-bold tracking-tight">Stripe</div>
                        <p className="mt-1 flex items-center text-xs text-emerald-600">
                            <span className="mr-1 inline-block size-2 rounded-full bg-emerald-500" />
                            Secure & Active
                        </p>
                    </div>
                </div>
            </div>

            {/* Transactions Table Card */}
            <div className="rounded-xl border bg-card shadow-xs overflow-hidden">
                <div className="border-b px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <CreditCard className="size-5 text-primary" />
                        <span className="font-semibold text-sm">Payment History</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                        Total {payments.length} {payments.length === 1 ? "Transaction" : "Transactions"}
                    </span>
                </div>

                {payments.length === 0 ? (
                    <div className="p-12 text-center space-y-3">
                        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-muted">
                            <CreditCard className="size-6 text-muted-foreground" />
                        </div>
                        <h3 className="font-semibold text-base">No transactions yet</h3>
                        <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                            When users upgrade to Pro plans via Stripe Checkout, the payment records will appear here in real time.
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-muted/50 border-b text-xs font-semibold uppercase text-muted-foreground">
                                <tr>
                                    <th className="px-6 py-3.5">Transaction ID</th>
                                    <th className="px-6 py-3.5">User</th>
                                    <th className="px-6 py-3.5">Payment For</th>
                                    <th className="px-6 py-3.5">Amount</th>
                                    <th className="px-6 py-3.5">Gateway</th>
                                    <th className="px-6 py-3.5">Status</th>
                                    <th className="px-6 py-3.5 text-right">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {payments.map((tx, idx) => {
                                    const txnDisplay = tx.transactionId || tx.stripeSessionId || tx._id || `TXN-${idx + 1}`;
                                    const statusDisplay = tx.paymentStatus || "Completed";

                                    return (
                                        <tr key={tx._id || tx.transactionId || idx} className="hover:bg-muted/30 transition-colors">
                                            <td className="px-6 py-4 font-mono text-xs font-semibold text-primary max-w-[180px] truncate" title={txnDisplay}>
                                                {txnDisplay}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-foreground flex items-center gap-1.5">
                                                    <span>{tx.userName || "Customer"}</span>
                                                    {tx.userRole && (
                                                        <Badge variant="outline" className="text-[10px] py-0 px-1.5 capitalize font-normal">
                                                            {tx.userRole}
                                                        </Badge>
                                                    )}
                                                </div>
                                                <div className="text-xs text-muted-foreground">{tx.userEmail}</div>
                                            </td>
                                            <td className="px-6 py-4 text-xs font-medium text-foreground">
                                                {tx.planName || "MentorLagbe Pro Plan"}
                                            </td>
                                            <td className="px-6 py-4 font-semibold text-foreground">
                                                {formatAmount(tx.amount, tx.currency)}
                                            </td>
                                            <td className="px-6 py-4 text-xs">
                                                <span className="inline-flex items-center gap-1 font-medium text-muted-foreground">
                                                    <span className="inline-block size-1.5 rounded-full bg-indigo-500" />
                                                    Stripe
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <Badge variant="success" className="text-xs capitalize">
                                                    {statusDisplay}
                                                </Badge>
                                            </td>
                                            <td className="px-6 py-4 text-xs text-muted-foreground text-right">
                                                {formatDate(tx.paidAt)}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
