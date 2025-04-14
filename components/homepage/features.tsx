import React from "react";
import Image from "next/image";
import Wrapper from "./MaxWidthWrapper";
export default function Features() {
  const standOuts = [
    {
      heading: "Wide Range of Options",
      content:
        "We offer a variety of venues and properties — from party halls to rental homes — all at competitive prices.",
      image: "/homepage/connect0.avif",
    },
    {
      heading: "Expert Recommendations",
      content:
        "Our team understands the local market well and helps you find the perfect venue based on your preferences.",
      image: "/homepage/connect.avif",
    },
    {
      heading: "24/7 Support",
      content:
        "Our dedicated support team is available around the clock to assist you with your booking or rental needs.",
      image: "/homepage/connect2.avif",
    },
    {
      heading: "Seamless Booking Process",
      content:
        "Our intuitive booking system ensures a hassle-free experience, allowing you to secure your venue in just a few clicks.",
      image: "/homepage/connect3.avif",
    },
    {
      heading: "Seamless Booking Process",
      content:
        "Our intuitive booking system ensures a hassle-free experience, allowing you to secure your venue in just a few clicks.",
      image: "/homepage/connect4.avif",
    },
    {
      heading: "Seamless Booking Process",
      content:
        "Our intuitive booking system ensures a hassle-free experience, allowing you to secure your venue in just a few clicks.",
      image: "/homepage/connect5.avif",
    },
  ];

  return (
    <div className="rounded-2xl overflow-hidden">
      <div className="">
        <div className="flex flex-col space-y-3 text-center font-medium  text-3xl">
          <p className="text-5xl">
            Why <span className="text-orange-500 font-medium">Spotly</span>{" "}
            Stands Out
          </p>
          <p className="font-noraml text-black/50 text-sm mt-4">
            Discover the features that make us a trusted choice for venue
            <br />
            bookings, property rentals, and event hosting.
          </p>
        </div>
      </div>
      <div className="scrollbar-custom flex gap-4 mx-auto text-white py-10 rounded-2xl overflow-x-scroll">
        {/* <div className="flex gap-4 mx-auto text-white py-10 rounded-2xl overflow-x-scroll"> */}
        {standOuts.map((item, index) => (
          <div
            className="w-80 min-w-80 h-72 aspect-square relative rounded-2xl overflow-hidden"
            key={index}
          >
            <Image
              src={item.image}
              width={1080}
              height={1080}
              alt="image"
              className="aspect-square bg-cover w-full h-full"
              unoptimized
            />
            <div className="absolute bottom-0 w-full h-56 bg-gradient-to-t from-black to-transparent blur-sm"></div>
            <div className="absolute bottom-0 p-8">
              <h2 className="text-xl text-white font-medium">{item.heading}</h2>
              <p className="text-xs mt-2 text-white/70">{item.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
