import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Fetch } from "@/middlewares/Fetch";
import { toast } from "sonner";
import useSWR from "swr";
import { fetcher } from "@/middlewares/Fetcher";
import type { AxiosProgressEvent } from "axios";

interface AddVideoProps {
  open: boolean;
  id: string;
  onOpenChange: (open: boolean) => void;
}

export function AddVideo({ open, id, onOpenChange }: AddVideoProps) {
  const [loading, setLoading] = useState(false);
  const [video, setVideo] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [uploadedMB, setUploadedMB] = useState(0);
  const [totalMB, setTotalMB] = useState(0);

  const { mutate } = useSWR("blog", fetcher);

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideo(e.target.files[0]);
    }
  };

  const handleAdd = async () => {
    try {
      if (!video) {
        toast.error("Please select a video file");
        return;
      }

      setLoading(true);
      setProgress(0);
      setUploadedMB(0);
      setTotalMB(0);

      const body = new FormData();
      body.append("video", video);

      await Fetch.put(`/blog/video/${id}`, body, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (event: AxiosProgressEvent) => {
          if (event.total) {
            const percent = Math.round((event.loaded * 100) / event.total);
            setProgress(percent);
            setUploadedMB((event.loaded / (1024 * 1024)));
            setTotalMB((event.total / (1024 * 1024)));
          }
        },
      });

      mutate();
      onOpenChange(false);
      setVideo(null);
      toast.success("Video uploaded successfully");
      window.location.reload();
    } catch (error) {
      console.error(error);
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || "Failed to upload video");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-[#202020] text-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">
        <Button
          variant="ghost"
          onClick={() => onOpenChange(false)}
          className="absolute top-3 right-3"
        >
          ✕
        </Button>

        <h2 className="text-2xl text-center">Add Video</h2>
        <p className="text-sm mb-4 text-center text-muted-foreground">Don't forget size limit: 999 MB</p>
        <div className="flex flex-col gap-4">
          <div>
            <Label>Video File</Label>
            <Input
              type="file"
              accept="video/*"
              className="file:cursor-pointer file:px-2 file:rounded file:border-0 file:bg-white file:text-sm file:text-black hover:file:bg-gray-200"
              onChange={handleVideoChange}
            />
          </div>

          {loading && (
            <div className="flex flex-col gap-2 mt-4">
              <Progress value={progress} className="w-full bg-white" />
              <span className="text-xs text-muted-foreground">
                {progress}% ({uploadedMB.toFixed(2)} MB / {totalMB.toFixed(2)} MB)
              </span>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="destructive" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleAdd} disabled={loading}>
            {loading ? "Uploading..." : "Upload"}
          </Button>
        </div>
      </div>
    </div>
  );
}
