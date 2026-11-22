export const instant = false;

import { checkoutVerify } from '@/lib/api/actions/paymens'
import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'
import { connection } from 'next/server'
import Link from 'next/link'
import {
    CalendarDays,
    CheckCircle2,
    CreditCard,
    Crown,
    Mail,
    ReceiptText,
    User,
    UserRound
} from 'lucide-react'

export default async function Success({
    searchParams
}: {
    searchParams: Promise<{ session_id?: string }>
}) {
    await connection()

    const { session_id } = await searchParams

    if (!session_id) {
        return redirect('/')
    }

    // Check Stripe session
    const { status, payment_status } =
        await stripe.checkout.sessions.retrieve(session_id)

    if (status === 'open') {
        return redirect('/')
    }

    if (status !== 'complete' || payment_status !== 'paid') {
        return redirect('/')
    }

    // Verify payment from backend
    const result = await checkoutVerify(session_id)

    console.log('Verification Result:', result)

    if (!result.success || !result.payment) {
        return (
            <main className="min-h-screen flex items-center justify-center px-4">
                <div className="max-w-md rounded-2xl border p-8 text-center shadow-lg">
                    <h1 className="text-2xl font-bold">
                        {result.message || 'Payment verification failed'}
                    </h1>

                    <p className="mt-3 text-gray-500">
                        We couldn&apos;t retrieve your payment details.
                    </p>

                    <Link
                        href="/tuitions"
                        className="mt-6 inline-flex rounded-lg bg-green-600 px-5 py-3 text-white"
                    >
                        Continue applying
                    </Link>
                </div>
            </main>
        )
    }

    const payment = result.payment
    const alreadyVerified = result.alreadyVerified

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4 py-12">
            <div className="w-full max-w-lg overflow-hidden rounded-2xl border bg-white dark:bg-gray-900 shadow-xl">

                {/* Success Header */}
                <div className="flex flex-col items-center px-6 py-10 text-center">
                    <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-500/10">
                        <CheckCircle2
                            size={48}
                            className="text-green-600 dark:text-green-400"
                        />
                    </div>

                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {alreadyVerified
                            ? 'Payment Already Verified!'
                            : 'Payment Successful!'}
                    </h1>

                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        {alreadyVerified
                            ? 'Your payment has already been verified successfully.'
                            : 'Your payment has been completed successfully.'}
                    </p>

                    <span className="mt-4 rounded-full bg-green-100 px-4 py-1.5 text-xs font-semibold text-green-700 dark:bg-green-500/10 dark:text-green-400">
                        {alreadyVerified
                            ? 'Subscription Active'
                            : 'Subscription Activated'}
                    </span>
                </div>

                <div className="border-t border-dashed" />

                {/* Payment Details */}
                <div className="space-y-5 px-6 py-7">
                    <h2 className="font-semibold text-gray-900 dark:text-white">
                        Payment Details
                    </h2>

                    {/* Customer Name */}
                    <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-gray-100 p-2.5 dark:bg-gray-800">
                            <User size={20} className="text-gray-600 dark:text-gray-300" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs text-gray-500">Customer Name</p>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {payment.userName || 'Not available'}
                            </p>
                        </div>
                    </div>

                    {/* Customer Email */}
                    <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-gray-100 p-2.5 dark:bg-gray-800">
                            <Mail size={20} className="text-gray-600 dark:text-gray-300" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs text-gray-500">Customer Email</p>
                            <p className="break-all text-sm font-medium text-gray-900 dark:text-white">
                                {payment.userEmail || 'Not available'}
                            </p>
                        </div>
                    </div>

                    {/* User Role */}
                    <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-gray-100 p-2.5 dark:bg-gray-800">
                            <UserRound size={20} className="text-gray-600 dark:text-gray-300" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">User Role</p>
                            <p className="text-sm font-medium capitalize text-gray-900 dark:text-white">
                                {payment.userRole || 'Not available'}
                            </p>
                        </div>
                    </div>

                    {/* Plan Name */}
                    <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-gray-100 p-2.5 dark:bg-gray-800">
                            <Crown size={20} className="text-gray-600 dark:text-gray-300" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Plan Name</p>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {payment.planName || 'Not available'}
                            </p>
                        </div>
                    </div>

                    {/* Amount */}
                    <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-gray-100 p-2.5 dark:bg-gray-800">
                            <CreditCard size={20} className="text-gray-600 dark:text-gray-300" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Subscription Amount</p>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                {typeof payment.amount === "number"
                                    ? `$${(payment.amount >= 100 ? payment.amount / 100 : payment.amount).toFixed(2)}/month`
                                    : "$10.00/month"}
                            </p>
                        </div>
                    </div>

                    {/* Transaction ID */}
                    <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-gray-100 p-2.5 dark:bg-gray-800">
                            <ReceiptText size={20} className="text-gray-600 dark:text-gray-300" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs text-gray-500">Transaction ID</p>
                            <p className="break-all text-sm font-medium text-gray-900 dark:text-white">
                                {payment.transactionId || 'Not available'}
                            </p>
                        </div>
                    </div>

                    {/* Stripe Session ID */}
                    <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-gray-100 p-2.5 dark:bg-gray-800">
                            <ReceiptText size={20} className="text-gray-600 dark:text-gray-300" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs text-gray-500">Stripe Session ID</p>
                            <p className="break-all text-sm font-medium text-gray-900 dark:text-white">
                                {payment.stripeSessionId}
                            </p>
                        </div>
                    </div>

                    {/* Payment Date */}
                    <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-gray-100 p-2.5 dark:bg-gray-800">
                            <CalendarDays size={20} className="text-gray-600 dark:text-gray-300" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Payment Date</p>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {new Date(payment.paidAt).toLocaleString('en-BD', {
                                    dateStyle: 'medium',
                                    timeStyle: 'short',
                                })}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="border-t px-6 py-6 text-center">
                    <p className="mb-5 text-sm text-gray-500 dark:text-gray-400">
                        {alreadyVerified
                            ? 'Your payment information is already saved and verified.'
                            : 'Thank you for your purchase! Your payment has been recorded successfully.'}
                    </p>

                    <Link
                        href="/tuitions"
                        className="inline-flex w-full items-center justify-center rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
                    >
                        Continue Applying
                    </Link>
                </div>
            </div>
        </main>
    )
}