"use client";

import Image from "next/image";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { ChevronDown, Search } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";


export default function Hero() {
  const [active, setActive] = useState<"Rent" | "Buy">("Rent");
  const [propertyType, setPropertyType] = useState<
    "Apartment" | "Individual" | "Restaurant" | "MarriageGarden"
  >("Apartment");

  return (
    
   

      <div className="min-h-screen py-20">
        <div className="flex justify-between gap-4 relative">
          <h1 className="text-6xl max-w-[16ch] leading-15  tracking-tighter">
            Find your perfect property with easy and conidence.
          </h1>
          <div className="max-w-[34ch] w-[34ch] min-w-[34ch] h-full">
            <p className="font-medium opacity-70 mt-4 tracking-tight leading-5">
              Discover your next home or investment with tailored listings,
              expert insights, and seamless experience.
            </p>

            <Link
              href="/listings"
              className="underline font-medium text-sm absolute bottom-0"
            >
              Discover our Spotly
            </Link>
          </div>
        </div>

        <div className="h-full mt-20 relative">
          <Image
            width={1080}
            height={836}
            src={"/assets/hero.png"}
            alt="hero"
            className="w-full h-full rounded-[var(--radius-xl)]"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black to-transparent blur-sm flex justify-center items-center"></div>
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
            <div className="w-full flex justify-center items-center flex-col gap-4">
              <h1 className="text-primary-foreground text-5xl font-medium text-center my-10">
                Discover a place you'll love
              </h1>
              <div className="max-w-[90%]">
                <div className="h-12 px-10 flex gap-4">
                  <div className="rounded-t-3xl bg-blue-500 h-full w-fit px-6">
                    <div className="flex gap-4 items-center justify-center text-white h-full">
                      <div
                        className={cn(
                          "rounded-full px-5 py-1 hover:cursor-pointer",
                          active === "Buy" &&
                            "bg-primary-foreground text-blue-500"
                        )}
                        onClick={() => setActive("Buy")}
                      >
                        Buy
                      </div>
                      <div
                        className={cn(
                          "rounded-full px-5 py-1 hover:cursor-pointere",
                          active === "Rent" &&
                            "bg-primary-foreground text-blue-500"
                        )}
                        onClick={() => setActive("Rent")}
                      >
                        Rent
                      </div>
                    </div>
                  </div>
                  <div className="h-full w-fit px-6">
                    <div className="flex gap-8 font-medium items-center justify-center text-white h-full">
                      <div
                        className={
                          "rounded-full py-1 relative hover:cursor-pointer"
                        }
                        onClick={() => setPropertyType("Apartment")}
                      >
                        Apartment
                        {propertyType === "Apartment" && (
                          <span className="block w-full absolute bottom-0 left-0 h-[1px] bg-primary-foreground"></span>
                        )}
                      </div>
                      <div
                        className={cn(
                          "rounded-full py-1 relative hover:cursor-pointer"
                        )}
                        onClick={() => setPropertyType("Individual")}
                      >
                        Individual
                        {propertyType === "Individual" && (
                          <span className="block w-full absolute bottom-0 left-0 h-[1px] bg-primary-foreground"></span>
                        )}
                      </div>
                      <div
                        className={cn(
                          "rounded-full py-1 relative hover:cursor-pointer"
                        )}
                        onClick={() => setPropertyType("Restaurant")}
                      >
                        Restaurant
                        {propertyType === "Restaurant" && (
                          <span className="block w-full absolute bottom-0 left-0 h-[1px] bg-primary-foreground"></span>
                        )}
                      </div>
                      <div
                        className={cn(
                          "rounded-full py-1 relative hover:cursor-pointer"
                        )}
                        onClick={() => setPropertyType("MarriageGarden")}
                      >
                        Marriage Garden
                        {propertyType === "MarriageGarden" && (
                          <span className="block w-full absolute bottom-0 left-0 h-[1px] bg-primary-foreground"></span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="h-16 rounded-full bg-primary-foreground overflow-hidden p-2">
                  <div className="w-full flex h-full gap-2">
                    <div className="w-32 h-full p-2 font-medium flex gap-2 items-center justify-center">
                      Jaipur
                      <ChevronDown size={20} />
                    </div>
                    <Separator
                      orientation="vertical"
                      className="bg-primary/50"
                    />
                    <div className="relative w-full h-full">
                      <input
                        type="text"
                        className="w-full h-full border-none focus:outline-0 pl-2 absolute left-0 top-0"
                        placeholder="Search Locality"
                      />
                      <Search className="absolute right-4 top-1/4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
  );
}
