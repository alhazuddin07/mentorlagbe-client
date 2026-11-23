
"use client";

import { useState } from "react";
import { UploadCloud, X } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { imgbbApiURL } from "@/lib/imageBB";
import { authClient } from "@/lib/auth-client";
import { toast } from "../ui/toast";
import { useRouter } from "next/navigation";
import { createTuition, TuitionPaymentRequiredError } from "@/lib/api/tuitions/tuitions-api";

export default function PostTuitionForm() {
    const [mode, setMode] = useState<"online" | "offline">("online");
    const [preview, setPreview] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const { data: session } = authClient.useSession();
    const user = session?.user;

    const router = useRouter();

    // Image Preview
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            setError("Please select a valid image.");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setError("Image size must be less than 5MB.");
            return;
        }

        if (preview) URL.revokeObjectURL(preview);

        setImageFile(file);
        setPreview(URL.createObjectURL(file));
        setError("");
    };

    // Remove Image
    const removeImage = () => {
        if (preview) URL.revokeObjectURL(preview);

        setImageFile(null);
        setPreview("");
    };

    // Form Submit
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Get form data before async operations
        const form = e.currentTarget;
        const formData = new FormData(form);

        try {
            setUploading(true);
            setError("");
            setSuccess("");

            // 1. Check image
            if (!imageFile) {
                setError("Please select a banner image.");
                return;
            }

            // 2. Upload image to ImgBB
            const imageFormData = new FormData();
            imageFormData.append("image", imageFile);

            const imageRes = await fetch(imgbbApiURL, {
                method: "POST",
                body: imageFormData,
            });

            const imageResult = await imageRes.json();

            if (!imageRes.ok || !imageResult.success) {
                throw new Error("Image upload failed.");
            }

            // 3. Get uploaded image URL
            const uploadedImageURL = imageResult.data.url;

            // 4. Prepare tuition data
            const tuitionData = {
                tutorId: session?.user.id,
                title: String(formData.get("title") || ""),
                subject: String(formData.get("subject") || ""),
                classLevel: String(formData.get("classLevel") || ""),
                mode,
                location: mode === "offline"
                    ? String(formData.get("location") || "")
                    : "",
                monthlyFee: Number(formData.get("monthlyFee")),
                daysPerWeek: Number(formData.get("daysPerWeek")),
                description: String(formData.get("description") || ""),
                bannerImage: uploadedImageURL,

                tutorName: user?.name,
                tutorEmail: user?.email,
                tutoreImage: user?.image,
            };

            // 5. Send data to Express backend
            const result = await createTuition(tuitionData);

            // 6. Success
            console.log("Tuition created:", result);

            setSuccess("Tuition posted successfully!");

            router.refresh();

            toast.add({
                title: "Success",
                description: "Tution post Created successfully!"
            })

            router.push('/dashboard');

            // Reset form
            form.reset();
            setMode("online");
            setImageFile(null);

            if (preview) URL.revokeObjectURL(preview);
            setPreview("");

        } catch (error) {
            console.error("Tuition submission error:", error);

            // Backend denied the post: the free post limit is reached.
            if (error instanceof TuitionPaymentRequiredError) {
                toast.add({
                    title: "Upgrade to Pro",
                    description: error.message
                });

                router.push("/pricing");
                return;
            }

            setError(
                error instanceof Error
                    ? error.message
                    : "Something went wrong."
            );
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="mx-auto w-full max-w-5xl">

            {/* Heading */}
            <div className="mb-5">
                <h1 className="text-2xl font-bold tracking-tight text-[#17152B]">
                    Post a New Tuition
                </h1>

                <p className="mt-1 text-sm text-[#686579]">
                    Fill in details about the subject, class level, mode, and fees.
                    Tuitions will be reviewed by admin prior to publication.
                </p>
            </div>

            {/* Form Card */}
            <div className="rounded-2xl border border-[#E5E0F5] bg-white p-5 shadow-sm sm:p-7">

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Tuition Title */}
                    <div className="space-y-2">
                        <Label htmlFor="title">
                            Tuition Title <span className="text-red-500">*</span>
                        </Label>

                        <Input
                            id="title"
                            name="title"
                            placeholder="e.g. Master HSC Higher Mathematics & Calculus"
                            required
                            className="h-11"
                        />
                    </div>

                    {/* Subject & Class Level */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                        <div className="space-y-2">
                            <Label htmlFor="subject">
                                Subject <span className="text-red-500">*</span>
                            </Label>

                            <select
                                id="subject"
                                name="subject"
                                required
                                defaultValue=""
                                className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-[#5B3DF5] focus:ring-2 focus:ring-[#5B3DF5]/20"
                            >
                                <option value="" disabled>
                                    Select Subject
                                </option>
                                <option value="Mathematics">Mathematics</option>
                                <option value="Physics">Physics</option>
                                <option value="Chemistry">Chemistry</option>
                                <option value="Biology">Biology</option>
                                <option value="English">English</option>
                                <option value="ICT">ICT</option>
                                <option value="Bangla">Bangla</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="classLevel">
                                Class Level <span className="text-red-500">*</span>
                            </Label>

                            <select
                                id="classLevel"
                                name="classLevel"
                                required
                                defaultValue=""
                                className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-[#5B3DF5] focus:ring-2 focus:ring-[#5B3DF5]/20"
                            >
                                <option value="" disabled>
                                    Select Class
                                </option>
                                <option value="Class 1-5">Class 1-5</option>
                                <option value="Class 6-8">Class 6-8</option>
                                <option value="Class 9-10">Class 9-10</option>
                                <option value="SSC">SSC</option>
                                <option value="HSC">HSC</option>
                                <option value="Admission">Admission</option>
                                <option value="University">University</option>
                            </select>
                        </div>

                    </div>

                    {/* Tuition Mode */}
                    <div className="space-y-3">
                        <Label>
                            Tuition Mode <span className="text-red-500">*</span>
                        </Label>

                        <div className="flex flex-wrap gap-5">

                            <label className="flex cursor-pointer items-center gap-2 text-sm text-[#686579]">
                                <input
                                    type="radio"
                                    name="mode"
                                    value="online"
                                    checked={mode === "online"}
                                    className="size-4 accent-[#5B3DF5]"
                                    onChange={(e) => {
                                        const value = e.target.value;

                                        if (value === "online" || value === "offline") {
                                            setMode(value);
                                        }
                                    }}
                                />
                                Online (Zoom / Meet)
                            </label>

                            <label className="flex cursor-pointer items-center gap-2 text-sm text-[#686579]">
                                <input
                                    type="radio"
                                    name="mode"
                                    value="offline"
                                    checked={mode === "offline"}
                                    className="size-4 accent-[#5B3DF5]"
                                    onChange={(e) => {
                                        const value = e.target.value;

                                        if (value === "online" || value === "offline") {
                                            setMode(value);
                                        }
                                    }}
                                />
                                Offline (In-Person / Home Visit)
                            </label>

                        </div>
                    </div>

                    {/* Location */}
                    {mode === "offline" && (
                        <div className="space-y-2">
                            <Label htmlFor="location">
                                Location <span className="text-red-500">*</span>
                            </Label>

                            <Input
                                id="location"
                                name="location"
                                placeholder="e.g. Mirpur, Dhaka"
                                required
                                className="h-11"
                            />
                        </div>
                    )}

                    {/* Monthly Fee & Days Per Week */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                        <div className="space-y-2">
                            <Label htmlFor="monthlyFee">
                                Monthly Fee (৳ BDT) <span className="text-red-500">*</span>
                            </Label>

                            <Input
                                id="monthlyFee"
                                name="monthlyFee"
                                type="number"
                                min="1"
                                placeholder="e.g. 150"
                                required
                                className="h-11"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="daysPerWeek">
                                Days Per Week <span className="text-red-500">*</span>
                            </Label>

                            <select
                                id="daysPerWeek"
                                name="daysPerWeek"
                                required
                                defaultValue=""
                                className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-[#5B3DF5] focus:ring-2 focus:ring-[#5B3DF5]/20"
                            >
                                <option value="" disabled>
                                    Select Days
                                </option>
                                <option value="2">2 days / week</option>
                                <option value="3">3 days / week</option>
                                <option value="4">4 days / week</option>
                                <option value="5">5 days / week</option>
                                <option value="6">6 days / week</option>
                                <option value="7">7 days / week</option>
                            </select>
                        </div>

                    </div>

                    {/* Banner Image */}
                    <div className="space-y-3">
                        <Label htmlFor="bannerImage">
                            Banner Image <span className="text-red-500">*</span>
                        </Label>

                        <div className="flex flex-wrap items-center gap-4">

                            <label
                                htmlFor="bannerImage"
                                className="flex h-11 cursor-pointer items-center gap-2 rounded-lg border border-[#E5E0F5] bg-[#F7F6FC] px-4 text-sm font-medium text-[#5B3DF5] transition hover:bg-[#F3F0FF]"
                            >
                                <UploadCloud className="size-4" />
                                Upload Image (ImgBB)
                            </label>

                            <input
                                id="bannerImage"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />

                            <span className="text-xs text-[#8B85A3]">
                                Maximum image size 5MB
                            </span>

                        </div>

                        {preview && (
                            <div className="relative w-fit">
                                <Image
                                    src={preview}
                                    alt="Banner preview"
                                    width={176}
                                    height={112}
                                    unoptimized
                                    className="h-28 w-44 rounded-lg border object-cover"
                                />

                                <button
                                    type="button"
                                    onClick={removeImage}
                                    className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white shadow"
                                    aria-label="Remove image"
                                >
                                    <X className="size-3" />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Tuition Description */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="description">
                                Tuition Description <span className="text-red-500">*</span>
                            </Label>

                            <span className="text-xs text-[#8B85A3]">
                                Minimum 50 characters
                            </span>
                        </div>

                        <Textarea
                            id="description"
                            name="description"
                            required
                            minLength={50}
                            maxLength={1000}
                            placeholder="Describe what students will learn, your teaching methodology, prerequisites, and expected outcomes..."
                            className="min-h-36 resize-y"
                        />
                    </div>

                    {/* Error & Success Message */}
                    {error && (
                        <p className="text-sm text-red-500">
                            {error}
                        </p>
                    )}

                    {success && (
                        <p className="text-sm text-green-600">
                            {success}
                        </p>
                    )}

                    {/* Submit */}
                    <div className="flex justify-end border-t border-[#E5E0F5] pt-5">
                        <Button
                            type="submit"
                            disabled={uploading}
                            className="h-11 w-full bg-[#5B3DF5] px-8 font-semibold text-white hover:bg-[#4930D0] sm:w-auto"
                        >
                            {uploading ? "Uploading..." : "Post Tuition"}
                        </Button>
                    </div>

                </form>
            </div>
        </div>
    );
}
