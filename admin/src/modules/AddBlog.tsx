import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { toast } from "sonner";
import { Fetch } from "@/middlewares/Fetch";
import useSWR from "swr";
import { fetcher } from "@/middlewares/Fetcher";
import type { BlogTypes } from "@/types/RootTypes";
import { Textarea } from "@/components/ui/textarea";

export function AddBlog() {
  const [images, setImages] = useState<FileList | null>(null);
  const [video, setVideo] = useState<FileList | null>(null);
  const [formData, setFormData] = useState<Partial<BlogTypes>>({
    title: "",
    text: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { mutate } = useSWR("/blog", fetcher);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title) newErrors.title = "Title is required.";
    if (!formData.text) newErrors.text = "Text is required.";
    if ((!images || images.length === 0) && (!video || video.length === 0)) {
      newErrors.media = "You must select an image or a video.";
    }
    if (images && video) {
      newErrors.media = "Please select only one type: image OR video.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImages(e.target.files);
    setVideo(null);
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setIsLoading(true);

    try {
      const body = new FormData();
      body.append("title", formData.title || "");
      body.append("text", formData.text || "");

        if (images && images.length > 0) {
        for (let i = 0; i < images.length; i++) {
          body.append("images", images[i]);
        }
      }


      if (video && video.length > 0) {
        body.append("video", video[0]);
      }

      await Fetch.post("/blog", body, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      mutate();
      toast.success("Blog added successfully!");
      setIsSheetOpen(false);
      setFormData({ title: "", text: "" });
      setImages(null);
      setVideo(null);
    } catch (error) {
      toast.error("Error adding Blog.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        <Button className="bg-[#003939] hover:bg-[#005555] cursor-pointer">
          Add Blog
        </Button>
      </SheetTrigger>
      <SheetContent className="h-full w-full sm:max-w-md sm:h-auto bg-[#202020] text-white border-none">
        <SheetHeader>
          <SheetTitle className="text-white text-2xl">New Blog</SheetTitle>
          <SheetDescription>
            Fill in blog info and choose <b>image OR video</b>
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-4 px-4 mt-2">
          <div className="space-y-1">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleInputChange}
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && (
              <span className="text-red-500 text-sm">{errors.title}</span>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="text">Text *</Label>
            <Textarea
              id="text"
              name="text"
              value={formData.text}
              onChange={handleInputChange}
              className={`w-full ${errors.text ? "border-red-500" : ""}`}
              rows={4}
            />
            {errors.text && (
              <span className="text-red-500 text-sm">{errors.text}</span>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="images">Choose Image</Label>
            <Input id="images" type="file" multiple onChange={handleImageChange} />
            {images && (
              <div className="mt-2 flex flex-wrap gap-2">
                {Array.from(images).map((file, i) => (
                  <img
                    key={i}
                    src={URL.createObjectURL(file)}
                    alt="preview"
                    className="w-20 h-20 object-cover rounded"
                  />
                ))}
              </div>
            )}
          </div>
          {errors.media && (
            <span className="text-red-500 text-sm">{errors.media}</span>
          )}

          <Button
            type="button"
            variant="secondary"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Uploading..." : "Upload"}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
