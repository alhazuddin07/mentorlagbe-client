"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Camera, UserRound, Save } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";

type UserProps = {
    user: {
        name: string;
        image?: string | null;
    };
};

export const UpdateProfileForm = ({ user }: UserProps) => {
    const router = useRouter();

    const [name, setName] = useState(user.name || "");
    const [image, setImage] = useState(
        user.image || "/default-avatar.png"
    );
    const [preview, setPreview] = useState(
        user.image || "/default-avatar.png"
    );
    const [imageFile, setImageFile] = useState<File | null>(null);

    // 2. Image Upload Function
    const uploadImage = async (file: File) => {
        const formData = new FormData();
        formData.append("image", file);

        const res = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`, {
            method: "POST",
            body: formData,
        }
        );

        const data = await res.json();

        if (!data.success) {
            throw new Error("Image upload failed");
        }

        return data.data.display_url;
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) return;

        setImageFile(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            let imageUrl = image;

            if (imageFile) {
                imageUrl = await uploadImage(imageFile);
            }

            const { error } = await authClient.updateUser({
                name,
                image: imageUrl,
            });

            if (error) {
                throw new Error(error.message);
            }

            toast.add({
                title: "Success",
                description: "Profile updated successfully!",
            });

            router.refresh();
            router.push("/");

        } catch (error) {
            console.error(error);
            toast.add({
                title: "Error",
                description: "Profile update failed!",
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0b0714] px-4 py-12">
            <div className="mx-auto max-w-xl">

                {/* Heading */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Update Profile
                    </h1>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        Manage your personal information and profile picture.
                    </p>
                </div>

                {/* Profile Card */}
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#16101f] sm:p-8">

                    <form onSubmit={handleSubmit} className="space-y-7">

                        {/* Profile Image */}
                        <div className="flex flex-col items-center">
                            <div className="relative">
                                <Image
                                    src={preview}
                                    alt="Profile"
                                    loading="eager"
                                    width={112}
                                    height={112}
                                    className="h-28 w-28 rounded-full border-4 border-purple-100 object-cover dark:border-purple-500/20"
                                    unoptimized
                                />

                                <label
                                    htmlFor="profileImage"
                                    className="absolute bottom-1 right-1 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-purple-600 text-white shadow-md transition hover:bg-purple-700"
                                >
                                    <Camera size={17} />
                                </label>

                                <input
                                    id="profileImage"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </div>

                            <h3 className="mt-3 font-semibold text-gray-900 dark:text-white">
                                Profile Picture
                            </h3>
                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                Click the camera icon to change your photo
                            </p>
                        </div>

                        {/* Name Input */}
                        <div className="space-y-2">
                            <label
                                htmlFor="name"
                                className="text-sm font-medium text-gray-700 dark:text-gray-200"
                            >
                                Full Name
                            </label>

                            <div className="relative">
                                <UserRound
                                    size={18}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                />

                                <input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder={user?.name}
                                    required
                                    className="w-full rounded-lg border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm text-gray-900 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 dark:border-white/10 dark:bg-[#0b0714] dark:text-white"
                                />
                            </div>
                        </div>

                        {/* Save Button */}
                        <button
                            type="submit"
                            className="flex w-full items-center justify-center gap-2 rounded-lg bg-purple-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-purple-700"
                        >
                            <Save size={17} />
                            Save Changes
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
};