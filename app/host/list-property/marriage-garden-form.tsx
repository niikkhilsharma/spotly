"use client";

import { useState } from "react";
import FileUploadField from "@/components/ui/FileUploadField";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

export default function MarriageGardenForm() {
  const allFacilities = ["Music system", "DJ", "Sound box", "LED TV"];

  const [formData, setFormData] = useState({
    propertyType: "",
    address: "",
    propertyDocuments: null as File | null,
    hostingFacilities: [] as string[],
    contact: "",
    noc: null as File | null,
    fireCert: null as File | null,
    fssaiCert: null as File | null,
    marriageNoc: null as File | null,
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append("propertyType", formData.propertyType);
    data.append("address", formData.address);
    data.append("contact", formData.contact);
    data.append("propertyDocuments", formData.propertyDocuments || "");
    data.append("noc", formData.noc || "");
    data.append("fireCert", formData.fireCert || "");
    data.append("fssaiCert", formData.fssaiCert || "");
    data.append("marriageNoc", formData.marriageNoc || "");
    formData.hostingFacilities.forEach((facility) => {
      data.append("hostingFacilities[]", facility);
    });

    console.log("Submitted Marriage Garden Form:", formData);
    // send `data` using fetch to your API here
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Marriage Garden Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Property Type */}
        <div>
          <label className="block font-medium">Garden Property Type</label>
          <select
            name="propertyType"
            onChange={handleInputChange}
            className="w-full border p-2 rounded bg-transparent focus:ring-2 focus:ring-gray-100 focus:outline-none"
          >
            <option value="" className="bg-transparent">
              Select Type
            </option>
            <option value="Type A" className="bg-gray-100">
              Type A (2k people, 100 rooms with AC)
            </option>
            <option value="Type B" className="bg-gray-100">
              Type B
            </option>
            <option value="Type C" className="bg-gray-100">
              Type C
            </option>
            <option value="Type D" className="bg-gray-100">
              Type D
            </option>
          </select>
        </div>

        {/* Address */}
        <div>
          <label className="block font-medium">Location Address</label>
          <textarea
            name="address"
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Property Documents */}
        <FileUploadField
          label="Property Documents"
          name="propertyDocuments"
          file={formData.propertyDocuments}
          onChange={handleFileChange}
        />

        {/* Hosting Facilities */}
        <div className="w-full">
          <label className="block font-medium mb-1">Hosting Facilities</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                {formData.hostingFacilities.length > 0
                  ? `${formData.hostingFacilities.length} selected`
                  : "Select Facilities"}
              </Button>
            </PopoverTrigger>

            <PopoverContent
              className="p-2 space-y-1 w-[var(--radix-popover-trigger-width)] max-w-full"
              align="start"
              sideOffset={4}
            >
              {allFacilities.map((facility) => (
                <div
                  key={facility}
                  className="flex items-center justify-between p-2 rounded hover:bg-gray-100 cursor-pointer w-full"
                  onClick={() => {
                    setFormData((prev) => {
                      const alreadySelected =
                        prev.hostingFacilities.includes(facility);
                      const updatedFacilities = alreadySelected
                        ? prev.hostingFacilities.filter((f) => f !== facility)
                        : [...prev.hostingFacilities, facility];

                      return {
                        ...prev,
                        hostingFacilities: updatedFacilities,
                      };
                    });
                  }}
                >
                  <span>{facility}</span>
                  {formData.hostingFacilities.includes(facility) && (
                    <Check className="w-4 h-4 text-green-600" />
                  )}
                </div>
              ))}
            </PopoverContent>
          </Popover>
        </div>

        {/* Contact */}
        <div>
          <label className="block font-medium">Management Contact</label>
          <input
            type="text"
            name="contact"
            onChange={handleInputChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div className="flex flex-wrap gap-4">
          {/* File Uploads */}
          <div className="flex-1 min-w-[200px]">
            <FileUploadField
              label="NOC"
              name="noc"
              file={formData.noc}
              onChange={handleFileChange}
            />
          </div>

          <div className="flex-1 min-w-[200px]">
            <FileUploadField
              label="Fire Certificate"
              name="fireCert"
              file={formData.fireCert}
              onChange={handleFileChange}
            />
          </div>

          <div className="flex-1 min-w-[200px]">
            <FileUploadField
              label="FSSAI Certificate"
              name="fssaiCert"
              file={formData.fssaiCert}
              onChange={handleFileChange}
            />
          </div>

          <div className="flex-1 min-w-[200px]">
            <FileUploadField
              label="Marriage NOC (Local Body)"
              name="marriageNoc"
              file={formData.marriageNoc}
              onChange={handleFileChange}
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
