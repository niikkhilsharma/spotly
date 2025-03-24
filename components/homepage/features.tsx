import React from "react";
import Image from "next/image";
import Wrapper from "./wrapper";
export default function Features() {
  return (
    <Wrapper>
      <div className="">
        <div className=" flex flex-col  space-y-3 text-center  font-medium  text-3xl">
          <p>
            Why <span className="text-orange-500 font-medium">Spotly</span>{" "}
            Stands Out
          </p>
          <p className="font-noraml text-gray-400 text-lg ">
            Discover the features that make us a trusted choice for venue
            <br />
            bookings, property rentals, and event hosting.
          </p>
        </div>
      </div>
      <div className="flex gap-4 flex-wrap mx-auto  text-white py-16">
        <div className="flex-1 group max-h-72 min-w-72 aspect-square relative border border-light-gray2/50 rounded-2xl overflow-hidden group:">
          <Image
            src={"/assets/client.png"}
            width={1080}
            height={1080}
            alt="image"
            className="aspect-square  w-full h-full "
            unoptimized
          />
          <div className="absolute bottom-0  w-full h-56 bg-gradient-to-t from-black to-transparent blur-sm"></div>
          <div className="absolute bottom-0 p-8">
            <h2 className="text-2xl text-orange-500 font-bold">
              Wide Range of Options
            </h2>
            <p className="text-xl mt-2 text-light-gray">
              We offer a variety of venues and properties — from party halls to
              rental homes — all at competitive prices.
            </p>
          </div>
        </div>
        <div className="flex-1 group max-h-72 min-w-72 aspect-square relative border border-light-gray2/50 rounded-2xl overflow-hidden group">
          <Image
            src={"/assets/client2.png"}
            width={1080}
            height={1080}
            alt="image"
            className="aspect-square w-full h-full"
            unoptimized
          />

          <div className="absolute bottom-0  w-full h-56 bg-gradient-to-t from-black to-transparent blur-sm"></div>
          <div className="absolute bottom-0 p-4 md:p-8">
            <h2 className="text-2xl text-orange-500 font-semibold">
              {" "}
              Expert Recommendations
            </h2>
            <p className="text-xl mt-2 text-light-gray">
              Our team understands the local market well and helps you find the
              perfect venue based on your preferences.
            </p>
          </div>
        </div>
        <div className="flex-1 group max-h-72 min-w-72 aspect-square relative border border-light-gray2/50 rounded-2xl overflow-hidden group">
          <Image
            src={"/assets/client.png"}
            width={1080}
            height={1080}
            alt="image"
            className="aspect-square w-full h-full "
            unoptimized
          />
          <div className="absolute bottom-0  w-full h-56 bg-gradient-to-t from-black to-transparent blur-sm"></div>
          <div className="absolute bottom-0 p-8">
            <h2 className="text-2xl text-orange-500 font-bold">24/7 Support</h2>
            <p className="text-xl mt-2 text-light-gray">
              Our dedicated support team is available around the clock to assist
              you with your booking or rental needs.
            </p>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
