
"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import {
    Eye,
    EyeOff,
    GraduationCap,
    BriefcaseBusiness,
    Mail,
    Lock,
    User,
    ImagePlus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";


export default function SignUpForm() {

    const [showPassword, setShowPassword] = useState(false);
    const [role, setRole] = useState("student");
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [imageURL, setImageURL] = useState("")
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");
    const [pending, setPending] = useState(false);
    const router = useRouter();


    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;

        if (!file) return;

        // 1. Validate image type
        if (!file.type.startsWith("image/")) {
            setError("Please select a valid image file.");
            e.target.value = "";
            return;
        }

        // 2. Validate image size (Maximum 5MB)
        if (file.size > 5 * 1024 * 1024) {
            setError("Image size must be less than 5MB.");
            e.target.value = "";
            return;
        }

        setImageFile(file);
        setError("");
        setUploading(true);

        const formData = new FormData();
        formData.append("image", file);

        const imgbbAPI = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`;

        try {
            // 3. Upload image to ImgBB
            const res = await fetch(imgbbAPI, {
                method: "POST",
                body: formData,
            });

            const result = await res.json();

            if (!res.ok || !result.success) {
                throw new Error(
                    result.error?.message || "Image upload failed."
                );
            }

            // 4. Save uploaded image URL
            setImageURL(result.data.url);

        } catch (error) {
            console.error("Image upload error:", error);

            setImageFile(null);
            setImageURL("");

            setError(
                error instanceof Error
                    ? error.message
                    : "Failed to upload image. Please try again."
            );

            e.target.value = "";

        } finally {
            setUploading(false);
        }
    };



    const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        const formData = new FormData(e.currentTarget);
        const userData = Object.fromEntries(formData.entries()) as { name: string, email: string, password: string, image: string };
        console.log(userData);

        setPending(true);

        try {
            const { error } = await authClient.signUp.email({
                name: userData.name,
                email: userData.email,
                password: userData.password,
                image: imageURL || undefined,
                role: role as "student" | "tutor",
            })

            if (error) {
                setError(
                    error.message ?? "Unable to create your account. Please try again."
                )
                return
            }

            router.push("/dashboard")
            router.refresh()
        } catch {
            setError("Something went wrong. Please try again.")
        } finally {
            setPending(false)
        }

    }

    return (
        <div className="w-full max-w-md rounded-2xl border border-[#E9E5FF] bg-white p-6 shadow-xl shadow-[#5B3DF5]/5 sm:p-8">

            {/* Logo */}
            <div className="mb-6 flex flex-col items-center">
                <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#5B3DF5] text-white shadow-lg shadow-[#5B3DF5]/25">
                    <GraduationCap size={32} />
                </div>

                <h1 className="text-2xl font-bold tracking-tight text-[#17152B]">
                    Create an Account
                </h1>

                <p className="mt-2 text-center text-sm text-[#686579]">
                    Join MentorLagbe and start your journey today.
                </p>
            </div>

            {/* Error Message */}
            {error && (
                <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                    {error}
                </div>
            )}

            <form
                onSubmit={handleSignUp}
                className="space-y-5"
            >

                {/* Full Name */}
                <div className="space-y-2">
                    <Label htmlFor="name" className="text-[#17152B]">
                        Full Name
                    </Label>

                    <div className="relative">
                        <User
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B85A3]"
                        />

                        <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Enter your full name"
                            required
                            className="h-11 border-[#E5E0F5] pl-10 text-[#17152B] placeholder:text-[#A5A0B5] focus-visible:border-[#5B3DF5] focus-visible:ring-[#5B3DF5]/20"
                        />
                    </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                    <Label htmlFor="email" className="text-[#17152B]">
                        Email Address
                    </Label>

                    <div className="relative">
                        <Mail
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B85A3]"
                        />

                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            required
                            className="h-11 border-[#E5E0F5] pl-10 text-[#17152B] placeholder:text-[#A5A0B5] focus-visible:border-[#5B3DF5] focus-visible:ring-[#5B3DF5]/20"
                        />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <span className="block text-sm font-medium text-[#D6D6DC]">
                        Profile picture
                    </span>
                    <label
                        htmlFor="image"
                        className="flex h-11 cursor-pointer items-center gap-2.5 rounded-lg border border-white/8 bg-[#f6f6fa] px-3.5 text-sm text-[#63636D] transition hover:border-[#5C53FE]/60"
                    >
                        <ImagePlus className="size-4 shrink-0 text-[#8C8C95]" />
                        <span className="truncate">
                            {imageFile ? imageFile.name : "Upload an image (optional)"}
                        </span>
                    </label>
                    <input
                        id="image"
                        name="image"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                    />
                </div>

                {/* Password */}
                <div className="space-y-2">
                    <Label htmlFor="password" className="text-[#17152B]">
                        Password
                    </Label>

                    <div className="relative">
                        <Lock
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B85A3]"
                        />

                        <Input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a password"
                            required
                            minLength={8}
                            className="h-11 border-[#E5E0F5] px-10 text-[#17152B] placeholder:text-[#A5A0B5] focus-visible:border-[#5B3DF5] focus-visible:ring-[#5B3DF5]/20"
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B85A3] transition-colors hover:text-[#5B3DF5]"
                        >
                            {showPassword ? (
                                <EyeOff size={18} />
                            ) : (
                                <Eye size={18} />
                            )}
                        </button>
                    </div>

                    <p className="text-xs text-[#8B85A3]">
                        Password must be at least 8 characters.
                    </p>
                </div>

                {/* Role Selection */}
                <div className="space-y-3">
                    <Label className="text-[#17152B]">
                        I want to join as a
                    </Label>

                    <div className="grid grid-cols-2 gap-3">

                        {/* Student */}
                        <button
                            type="button"
                            onClick={() => setRole("student")}
                            className={`flex items-center gap-3 rounded-xl border p-3 text-left transition-all ${role === "student"
                                ? "border-[#5B3DF5] bg-[#F3F0FF] ring-2 ring-[#5B3DF5]/10"
                                : "border-[#E5E0F5] hover:border-[#B5A5FF]"
                                }`}
                        >
                            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${role === "student"
                                ? "bg-[#5B3DF5] text-white"
                                : "bg-[#F0EDFF] text-[#8065F7]"
                                }`}>
                                <GraduationCap size={21} />
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-[#17152B]">
                                    Student
                                </p>
                                <p className="text-xs text-[#8B85A3]">
                                    Find tutors
                                </p>
                            </div>
                        </button>

                        {/* Tutor */}
                        <button
                            type="button"
                            onClick={() => setRole("tutor")}
                            className={`flex items-center gap-3 rounded-xl border p-3 text-left transition-all ${role === "tutor"
                                ? "border-[#5B3DF5] bg-[#F3F0FF] ring-2 ring-[#5B3DF5]/10"
                                : "border-[#E5E0F5] hover:border-[#B5A5FF]"
                                }`}
                        >
                            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${role === "tutor"
                                ? "bg-[#5B3DF5] text-white"
                                : "bg-[#F0EDFF] text-[#8065F7]"
                                }`}>
                                <BriefcaseBusiness size={20} />
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-[#17152B]">
                                    Tutor
                                </p>
                                <p className="text-xs text-[#8B85A3]">
                                    Teach students
                                </p>
                            </div>
                        </button>

                    </div>
                </div>

                {/* Terms */}
                <div className="flex items-start gap-2">
                    <Checkbox
                        id="terms"
                        required
                        className="mt-0.5 border-[#B5A5FF] data-[state=checked]:border-[#5B3DF5] data-[state=checked]:bg-[#5B3DF5]"
                    />

                    <Label
                        htmlFor="terms"
                        className="text-xs font-normal leading-5 text-[#686579]"
                    >
                        I agree to the{" "}
                        <Link
                            href="/terms"
                            className="font-semibold text-[#5B3DF5] hover:underline"
                        >
                            Terms & Conditions
                        </Link>{" "}
                        and{" "}
                        <Link
                            href="/privacy"
                            className="font-semibold text-[#5B3DF5] hover:underline"
                        >
                            Privacy Policy
                        </Link>.
                    </Label>
                </div>

                {/* Sign Up Button */}
                <Button
                    type="submit"
                    disabled={pending || uploading}
                    className="h-11 w-full bg-[#5B3DF5] font-semibold text-white shadow-md shadow-[#5B3DF5]/20 transition-all hover:bg-[#4930D0] disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {uploading
                        ? "Uploading Image..."
                        : pending
                            ? "Creating Account..."
                            : "Create Account"}
                </Button>

            </form>

            {/* Sign In */}
            <div className="mt-6 text-center text-sm text-[#686579]">
                Already have an account?{" "}
                <Link
                    href="/sign-in"
                    className="font-semibold text-[#5B3DF5] hover:text-[#4930D0] hover:underline"
                >
                    Sign In
                </Link>
            </div>

        </div>
    );
}
