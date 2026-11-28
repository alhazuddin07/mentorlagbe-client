
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    Eye,
    EyeOff,
    Mail,
    Lock,
    Loader2,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "../ui/toast";

export default function SignInForm() {
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const [pending, setPending] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: true,
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        try {
            setPending(true);

            const { error } = await authClient.signIn.email({
                email: formData.email,
                password: formData.password,
                rememberMe: formData.rememberMe,
            });

            if (error) {
                setError(error.message || "Invalid email or password.");
                return;
            }

            toast.add({
                title: "success",
                description: "Login successfully!",
            });

            router.push("/dashboard");

        } catch (error) {
            console.error("Sign in error:", error);
            setError("Something went wrong. Please try again.");
            toast.add({
                title: 'error',
                description: "Something went wrong. Please try again"
            })
        } finally {
            setPending(false);
        }
    };

    return (
        <div className="w-full max-w-md rounded-2xl border border-[#E5E0F5] bg-white p-6 shadow-xl shadow-[#5B3DF5]/5 sm:p-8">

            {/* Heading */}
            <div className="mb-7 text-center">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#17152B]">
                    Welcome Back!
                </h1>

                <p className="mt-2 text-sm sm:text-base text-[#686579] leading-normal">
                    Sign in to continue your learning journey.
                </p>
            </div>

            {/* Error Message */}
            {error && (
                <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                    {error}
                </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">

                {/* Email */}
                <div className="space-y-2">
                    <Label htmlFor="email" className="text-[#17152B]">
                        Email Address
                    </Label>

                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#8B85A3]" />

                        <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    email: e.target.value,
                                })
                            }
                            className="h-11 border-[#E5E0F5] pl-10 text-[#17152B] placeholder:text-[#A5A0B5] focus-visible:ring-[#5B3DF5]"
                            required
                        />
                    </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                    <Label htmlFor="password" className="text-[#17152B]">
                        Password
                    </Label>

                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#8B85A3]" />

                        <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    password: e.target.value,
                                })
                            }
                            className="h-11 border-[#E5E0F5] pl-10 pr-11 text-[#17152B] placeholder:text-[#A5A0B5] focus-visible:ring-[#5B3DF5]"
                            required
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B85A3] hover:text-[#5B3DF5]"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? (
                                <EyeOff className="size-4" />
                            ) : (
                                <Eye className="size-4" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between gap-2">
                    <label className="flex cursor-pointer items-center gap-2 text-sm text-[#686579]">
                        <input
                            type="checkbox"
                            checked={formData.rememberMe}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    rememberMe: e.target.checked,
                                })
                            }
                            className="size-4 accent-[#5B3DF5]"
                        />
                        Remember me
                    </label>

                    <Link
                        href="#"
                        className="text-sm font-medium text-[#5B3DF5] hover:underline"
                    >
                        Forgot password?
                    </Link>
                </div>

                {/* Submit Button */}
                <Button
                    type="submit"
                    disabled={pending}
                    className="h-11 w-full bg-[#5B3DF5] font-semibold text-white shadow-md shadow-[#5B3DF5]/20 hover:bg-[#4930D0]"
                >
                    {pending ? (
                        <>
                            <Loader2 className="size-4 animate-spin" />
                            Signing In...
                        </>
                    ) : (
                        "Sign In"
                    )}
                </Button>
            </form>

            {/* Sign Up Link */}
            <p className="mt-7 text-center text-sm text-[#686579]">
                Don&apos;t have an account?{" "}
                <Link
                    href="/sign-up"
                    className="font-semibold text-[#5B3DF5] hover:underline"
                >
                    Create Account
                </Link>
            </p>
        </div>
    );
}
