
"use client";

import { useRef, useState } from "react";
import {
    Edit,
    Upload,
    X,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";

import Image from "next/image";
import { ITuition } from "@/types/tuitions/tuitions";
import { updateTuition } from "@/lib/api/tuitions/tuitions-api";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";

interface EditTuitionProps {
    item: ITuition;
}

const EditTuition = ({ item }: EditTuitionProps) => {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState(item.bannerImage);
    const [uploading, setUploading] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        title: item.title,
        subject: item.subject,
        classLevel: item.classLevel,
        mode: item.mode,
        location: item.location,
        monthlyFee: item.monthlyFee,
        daysPerWeek: item.daysPerWeek,
        description: item.description,
        bannerImage: item.bannerImage,
    });

    // Handle input changes
    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]:
                name === "monthlyFee" || name === "daysPerWeek"
                    ? Number(value)
                    : value,
        }));
    };

    // Handle image selection
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Please select a valid image.");
            return;
        }

        // Optional: 5 MB image limit
        if (file.size > 5 * 1024 * 1024) {
            alert("Image size must be less than 5 MB.");
            e.target.value = "";
            return;
        }

        setImageFile(file);

        // Preview selected image
        const imageUrl = URL.createObjectURL(file);
        setPreviewImage(imageUrl);
    };

    // Upload image to ImgBB
    const uploadImageToImgBB = async (file: File) => {
        const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

        if (!apiKey) {
            throw new Error("ImgBB API key is missing.");
        }

        const uploadData = new FormData();
        uploadData.append("image", file);

        const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
            method: "POST",
            body: uploadData,
        });

        const result = await res.json();

        if (!res.ok || !result.success) {
            throw new Error(
                result.error?.message || "Image upload failed."
            );
        }

        return result.data.display_url as string;
    };

    // Reset form when modal opens
    const handleOpen = () => {
        setFormData({
            title: item.title,
            subject: item.subject,
            classLevel: item.classLevel,
            mode: item.mode,
            location: item.location,
            monthlyFee: item.monthlyFee,
            daysPerWeek: item.daysPerWeek,
            description: item.description,
            bannerImage: item.bannerImage,
        });

        setImageFile(null);
        setPreviewImage(item.bannerImage);

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }

        setOpen(true);
    };

    // Remove selected image
    const handleRemoveImage = () => {
        setImageFile(null);
        setPreviewImage("");

        setFormData((prev) => ({
            ...prev,
            bannerImage: "",
        }));

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    // Update tuition
    const handleUpdate = async () => {
        try {
            setUploading(true);

            let imageUrl = formData.bannerImage;

            // Upload only if a new image is selected
            if (imageFile) {
                imageUrl = await uploadImageToImgBB(imageFile);
            }

            const updatedData = {
                ...formData,
                bannerImage: imageUrl,
            };

            // Update tuition API
            const result = await updateTuition(item._id, updatedData);

            console.log("Update API response:", result);

            if (!result.success) {
                throw new Error(result.message || "Failed to update tuition");
            }

            router.refresh();

            toast.add({
                title: "success",
                description: "Tuition updated successfully!"
            });

            setOpen(false);

        } catch (error) {
            console.error("Update tuition error:", error);

            toast.add({
                title: "error",
                description: "Tuition updated Failed!"
            });
            
        } finally {
            setUploading(false);
        }
    };

    return (
        <>
            {/* Edit Button */}
            <Button
                variant="outline"
                size="sm"
                onClick={handleOpen}
            >
                <Edit className="size-3.5" />
                Edit
            </Button>

            {/* Edit Modal */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="w-[95vw] sm:max-w-3xl lg:max-w-4xl max-h-[90vh] overflow-y-auto p-0">

                    {/* Header */}
                    <DialogHeader className="sticky top-0 z-10 bg-background border-b px-6 py-5">
                        <DialogTitle className="text-xl font-bold">
                            Edit Tuition
                        </DialogTitle>

                        <DialogDescription>
                            Update your tuition information below.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-5 px-6 py-5">

                        {/* Title */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">
                                Tuition Title
                            </label>

                            <input
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Enter tuition title"
                                className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>

                        {/* Subject and Class */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Subject
                                </label>

                                <input
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="Subject"
                                    className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Class Level
                                </label>

                                <select
                                    name="classLevel"
                                    value={formData.classLevel}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary"
                                >
                                    <option value="SSC">SSC</option>
                                    <option value="HSC">HSC</option>
                                    <option value="Class 6">Class 6</option>
                                    <option value="Class 7">Class 7</option>
                                    <option value="Class 8">Class 8</option>
                                    <option value="Class 9">Class 9</option>
                                    <option value="Class 10">Class 10</option>
                                </select>
                            </div>

                        </div>

                        {/* Mode and Location */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Teaching Mode
                                </label>

                                <select
                                    name="mode"
                                    value={formData.mode}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary"
                                >
                                    <option value="online">Online</option>
                                    <option value="offline">Offline</option>
                                    <option value="both">Both</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Location
                                </label>

                                <input
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder="Enter location"
                                    className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>

                        </div>

                        {/* Fee and Days */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Monthly Fee
                                </label>

                                <input
                                    type="number"
                                    name="monthlyFee"
                                    value={formData.monthlyFee}
                                    onChange={handleChange}
                                    min="0"
                                    className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Days Per Week
                                </label>

                                <input
                                    type="number"
                                    name="daysPerWeek"
                                    value={formData.daysPerWeek}
                                    onChange={handleChange}
                                    min="1"
                                    max="7"
                                    className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>

                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">
                                Description
                            </label>

                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={4}
                                placeholder="Enter tuition description"
                                className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none resize-none focus:ring-2 focus:ring-primary"
                            />
                        </div>

                        {/* Banner Image Upload */}
                        <div className="space-y-3">
                            <label className="text-sm font-medium">
                                Banner Image
                            </label>

                            {/* Image Preview */}
                            {previewImage && (
                                <div className="relative w-full h-48 rounded-xl overflow-hidden border">
                                    <Image
                                        src={previewImage}
                                        alt="Banner preview"
                                        fill
                                        unoptimized
                                        className="object-cover"
                                    />

                                    <button
                                        type="button"
                                        onClick={handleRemoveImage}
                                        className="absolute top-2 right-2 rounded-full bg-black/70 p-2 text-white hover:bg-black"
                                    >
                                        <X className="size-4" />
                                    </button>
                                </div>
                            )}

                            {/* File Upload */}
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-8 text-center hover:border-primary transition"
                            >
                                <Upload className="size-7 text-muted-foreground" />

                                <p className="text-sm font-medium">
                                    Click to upload banner image
                                </p>

                                <p className="text-xs text-muted-foreground">
                                    PNG, JPG or WEBP (Max 5 MB)
                                </p>

                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/png,image/jpeg,image/webp"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </div>
                        </div>

                        {/* Tutor Information - Read Only */}
                        <div className="rounded-xl border bg-muted/40 p-4 space-y-3">
                            <h3 className="text-sm font-semibold">
                                Tutor Information
                            </h3>

                            <div className="flex items-center gap-3">
                                <Image
                                    src={item.tutoreImage}
                                    alt={item.tutorName || "Tutor"}
                                    width={44}
                                    height={44}
                                    className="size-11 rounded-full object-cover"
                                />

                                <div>
                                    <p className="text-sm font-semibold">
                                        {item.tutorName}
                                    </p>

                                    <p className="text-xs text-muted-foreground">
                                        {item.tutorEmail}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Footer Buttons */}
                        <div className="flex justify-end gap-3 border-t pt-5">

                            <Button
                                variant="outline"
                                onClick={() => setOpen(false)}
                                disabled={uploading}
                            >
                                Cancel
                            </Button>

                            <Button
                                onClick={handleUpdate}
                                disabled={uploading}
                            >
                                {uploading
                                    ? "Uploading..."
                                    : "Update Tuition"}
                            </Button>

                        </div>

                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default EditTuition;