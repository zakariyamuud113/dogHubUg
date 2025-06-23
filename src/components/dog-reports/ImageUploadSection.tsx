
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";

interface ImageUploadSectionProps {
  onImageChange: (file: File | null) => void;
}

export const ImageUploadSection = ({ onImageChange }: ImageUploadSectionProps) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      onImageChange(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    onImageChange(null);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Dog Photo</h3>
      <div className="space-y-3">
        <Label htmlFor="dog_image">Upload a photo of the dog (optional)</Label>
        
        {!imagePreview ? (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <Label htmlFor="dog_image" className="cursor-pointer">
              <span className="text-sm text-gray-600">Click to upload or drag and drop</span>
              <Input
                id="dog_image"
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />
            </Label>
          </div>
        ) : (
          <div className="relative">
            <img
              src={imagePreview}
              alt="Dog preview"
              className="w-full max-w-xs h-48 object-cover rounded-lg"
            />
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={removeImage}
              className="absolute top-2 right-2"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
        
        {selectedImage && (
          <p className="text-sm text-gray-600">
            Selected: {selectedImage.name} ({Math.round(selectedImage.size / 1024)}KB)
          </p>
        )}
      </div>
    </div>
  );
};
