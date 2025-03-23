import Accordion from "./accordtion";
import { clsx } from "clsx";
import Image from "next/image";
import Wrapper from "./wrapper";

const faqData = [
  {
    title: "How do I list my property on Spotly?",
    content:
      "Join a growing community of satisfied users who rely on Spotly for a seamless booking and property management experience.",
  },
  {
    title: "What's the process for booking a venue through Spotly?",
    content:
      "The process is simple! Sign up, browse listings, select your preferred venue, and confirm your booking with ease.",
  },
  {
    title: "How does Spotly verify listings?",
    content:
      "Spotly verifies listings through a combination of AI and manual review to ensure accuracy and authenticity.",
  },
  {
    title: "Are there fees for booking a venue?",
    content:
      "Spotly offers competitive rates. Venue owners are charged a small percentage upon a successful booking.",
  },
  {
    title: "How can I schedule a visit to a venue?",
    content:
      "Use the scheduling feature on each venue listing page to book a visit at your convenience.",
  },
];

const FAQ = () => {
  return (
    <Wrapper className="flex gap-8 justify-between ">
      <div className="w-1/2 py-12">
        <h2 className="text-5xl font-bold mt-0 mb-12">
          Frequently Asked <br />
          Questions
        </h2>
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div key={index} className="border rounded-xl px-4">
              <Accordion title={item.title} content={item.content} />
            </div>
          ))}
        </div>
      </div>
      <div className="w-1/2 py-12">
        <h2 className="text-xl font-normal mb-6 text-gray-600">
          At <span className="text-orange-500 font-medium">Spotly</span>, we go
          beyond just bookings. We’re here to provide a seamless, transparent,
          and trusted experience for finding and managing spaces. With advanced
          technology, industry expertise, and a customer-first approach, we make
          booking or selling flats, marriage gardens, and restaurants for
          parties simple and successful.
        </h2>
        <Image
          width={3000}
          src={"/assets/house.png"}
          height={2000}
          alt="hlo"
          className="rounded-xl w-full aspect-square h-[500px] "
        />
      </div>
    </Wrapper>
  );
};

export default FAQ;
