"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RestaurantForm() {
  const foodTypes = ["Veg", "Non-Veg"];
  const [formData, setFormData] = useState({
    starRating: "",
    peopleToAccommodate: "",
    foodType: "",
    foodQuality: "",
    areaDocuments: null as File | null,
    foodQualityDocuments: null as File | null,
    mediaImages: [] as File[],
    mediaVideo: null as File | null,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (!files) return;
    if (name === "mediaImages") {
      setFormData((prev) => ({ ...prev, mediaImages: Array.from(files) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append("starRating", formData.starRating);
    data.append("peopleToAccommodate", formData.peopleToAccommodate);
    data.append("foodType", formData.foodType);
    data.append("foodQuality", formData.foodQuality);
    data.append("areaDocuments", formData.areaDocuments || "");
    data.append("foodQualityDocuments", formData.foodQualityDocuments || "");
    formData.mediaImages.forEach((file, i) =>
      data.append(`mediaImages[${i}]`, file)
    );
    data.append("mediaVideo", formData.mediaVideo || "");

    console.log("Submitted Restaurant Form:", formData);
    // Submit to backend here
  };

  return (
    <div className="max-w-screen-xl mx-auto bg-white shadow-sm rounded-2xl p-8 mt-10">
      <h2 className="text-2xl font-semibold mb-4">Restaurant Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Star Rating */}
        <div>
          <Label className="mb-2">Restaurant Rating</Label>
          {/* <p className="text-sm text-gray-500 mb-1">
            Select a star rating from 1 to 5 based on your restaurant's quality.
          </p> */}
          <Select
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, starRating: value }))
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Rating (1 to 5)" />
            </SelectTrigger>
            <SelectContent>
              {["1", "2", "3", "4", "5"].map((rating) => (
                <SelectItem key={rating} value={rating}>
                  {rating} Star
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* People to Accommodate */}
        <div>
          <Label className="mb-2">People to Accommodate</Label>
          <p className="text-xs text-gray-500 mb-1">
            Mention the maximum number of people your restaurant can accommodate
            at a time.
          </p>
          <Input
            type="number"
            name="peopleToAccommodate"
            onChange={handleInputChange}
          />
        </div>

        {/* Food Category */}
        <div>
          <Label className="mb-2">Food Category</Label>
          {/* <p className="text-sm text-gray-500 mb-1">
            Choose the type of food served at your restaurant — Veg or Non-Veg.
          </p> */}
          <Select
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, foodType: value }))
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Veg / Non-Veg" />
            </SelectTrigger>
            <SelectContent>
              {foodTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Food Quality */}
        <div>
          <Label className="mb-2">Food Quality Description</Label>
          <Textarea
            name="foodQuality"
            placeholder="Describe the quality, hygiene, and taste of the food served."
            onChange={handleInputChange}
            className="resize-none text-sm"
          />
        </div>

        {/* Area/Property Document */}
        <div>
          <Label className="mb-2">Area/Property Document</Label>
          <p className="text-xs text-gray-500 mb-1">
            Upload valid ownership or rental proof of the restaurant property.
          </p>
          <Input type="file" name="areaDocuments" onChange={handleFileChange} />
        </div>

        {/* Food Quality Document */}
        <div>
          <Label className="mb-2">Food Quality Certificate</Label>
          <p className="text-xs text-gray-500 mb-1">
            E.g., FSSAI certification. Upload valid documents related to food
            safety and quality standards.
          </p>
          <Input
            type="file"
            name="foodQualityDocuments"
            onChange={handleFileChange}
          />
        </div>

        {/* Media Requirement - Images */}
        <div>
          <Label className="mb-2">Upload Minimum 5 Images</Label>
          <p className="text-xs text-gray-500 mb-1">
            Add high-quality images showing the restaurant's ambiance and food
            presentation.
          </p>
          <Input
            type="file"
            name="mediaImages"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />
        </div>

        {/* Media Requirement - Video */}
        <div>
          <Label className="mb-2">Upload 1 Video</Label>
          <p className="text-xs text-gray-500 mb-1">
            Upload a short video showcasing the overall restaurant vibe and
            kitchen area.
          </p>
          <Input
            type="file"
            name="mediaVideo"
            accept="video/*"
            onChange={handleFileChange}
          />
        </div>

        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </div>
  );
}
