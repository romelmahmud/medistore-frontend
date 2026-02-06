"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { uploadToCloudinary } from "@/lib/upload-image";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
function ImageUpload({ form }: { form: any }) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUpload = async (file: File) => {
    try {
      setUploading(true);
      const imageUrl = await uploadToCloudinary(file);

      // ✅ set TanStack form value
      form.setFieldValue("imageUrl", imageUrl);
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    form.setFieldValue("imageUrl", "");
    // clear file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <form.Field name="imageUrl">
      {(field: any) => (
        <div className="space-y-2">
          <Label>Product Image</Label>

          {/* Upload / Replace */}
          <Input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            disabled={uploading}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleUpload(file);
            }}
          />

          {uploading && (
            <p className="text-sm text-muted-foreground">Uploading image...</p>
          )}

          {/* Preview */}
          {field.state.value && (
            <div className="relative w-32">
              <Image
                src={field.state.value}
                alt="Preview"
                height={128}
                width={128}
                className="h-32 w-32 rounded-md object-cover border"
              />

              {/* Remove button */}
              <Button
                type="button"
                size="sm"
                className="mt-2 w-full bg-red-100 text-red-600 hover:bg-red-400 hover:text-white cursor-pointer"
                onClick={handleRemove}
              >
                <Trash2 /> Remove
              </Button>
            </div>
          )}
        </div>
      )}
    </form.Field>
  );
}

export default ImageUpload;
