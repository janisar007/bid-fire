import React from "react";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { MultiSelect } from "@/components/utills/MultiSelect"; 
import { Badge } from "@/components/ui/badge";
import { apiService } from "../../../api/apiService";
import ImageUpload from "../../../components/utills/ImageUpload"; // Use your existing uploader
import { toast } from "sonner";

const categoryOptions = ["news", "event", "announcement", "update", "other"];

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  location: z.string().optional(),
  category: z.array(z.string()),
  tags: z.array(z.string()),
  post_images: z.array(z.string()).min(1, "At least one image is required"),
  org_id: z.string().min(1, "Organization ID is required"),
  user_id: z.string().min(1, "User ID is required"),
});

type PostFormData = z.infer<typeof schema>;

const NewPost = () => {
  const org_id = localStorage.getItem("orgId") || "";
  const user_id = localStorage.getItem("userId") || "";

  const {
    control,
    handleSubmit,
    register,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      post_images: [],
      location: "",
      category: [],
      tags: [],
      org_id,
      user_id,
    },
  });


  const tags = watch("tags");
  const [tagInput, setTagInput] = React.useState("");

  const onSubmit = async (data: PostFormData) => {
    try {
      const res:any = await apiService.createPost(data);
      if (res.data.code === 200) {
        // showToast("Post created successfully!", "success");
        toast.success("Post created successfully!");
        reset();
      } else {
        // showToast(res.errorMessage, "error");
        toast.error(`${res.errorMessage}`);
      }
    } catch (err: any) {
      console.error(err);
      // showToast(err.message, "error");
      toast.error(`${err.message}`);
    }
  };

  const handleImageUpload = (urls: string[]) => {
    setValue("post_images", urls);
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput)) {
      setValue("tags", [...tags, tagInput]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setValue(
      "tags",
      tags.filter((tag) => tag !== tagToRemove)
    );
  };

  return (
    <Card className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Create New Post</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input id="title" {...register("title")} />
          {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" rows={4} {...register("description")} />
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </div>

        <div>
          <Label>Images</Label>
          <ImageUpload onUploadComplete={handleImageUpload} />
        </div>

        <div>
          <Label>Category</Label>
          <Controller
            control={control}
            name="category"
            render={({ field }) => (
              <MultiSelect
                options={categoryOptions}
                selected={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </div>

        <div>
          <Label>Tags</Label>
          <div className="flex gap-2">
            <Input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
            />
            <Button type="button" onClick={handleAddTag}>
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="cursor-pointer"
                onClick={() => handleRemoveTag(tag)}
              >
                {tag} ✕
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="location">Location</Label>
          <Input id="location" {...register("location")} />
        </div>

        <Button type="submit" className="w-full">
          Create Post
        </Button>
      </form>
    </Card>
  );
};

export default NewPost;
