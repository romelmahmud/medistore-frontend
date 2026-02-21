import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    id: 1,
    name: "Rahim Uddin",
    testimonial:
      "I ordered medicine for my father late at night, and it was delivered the next day in perfect condition. The packaging was secure and the medicines were authentic. Truly reliable service!",
    avatar: "https://randomuser.me/api/portraits/men/11.jpg",
  },
  {
    id: 2,
    name: "Nusrat Jahan",
    testimonial:
      "MediStore made it so easy to find the exact medicine I needed. The checkout process was smooth, and Cash on Delivery was very convenient. Highly recommended!",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
  },
  {
    id: 3,
    name: "Tanvir Hasan",
    testimonial:
      "The delivery was fast and on time. I also appreciate that they clearly show manufacturer details and expiry dates. It gives me confidence when ordering online.",
    avatar: "https://randomuser.me/api/portraits/men/13.jpg",
  },
  {
    id: 4,
    name: "Farhana Akter",
    testimonial:
      "I regularly order vitamins and baby care products from MediStore. The prices are reasonable and customer support is very responsive.",
    avatar: "https://randomuser.me/api/portraits/women/14.jpg",
  },
  {
    id: 5,
    name: "Mahmudul Islam",
    testimonial:
      "As someone who works full-time, visiting pharmacies is difficult. MediStore saves me time by delivering medicines directly to my doorstep in Khulna. Excellent service!",
    avatar: "https://randomuser.me/api/portraits/men/15.jpg",
  },
  {
    id: 6,
    name: "Sadia Rahman",
    testimonial:
      "The website is easy to navigate, and I love how medicines are organized by category. My order arrived safely and exactly as described.",
    avatar: "https://randomuser.me/api/portraits/women/16.jpg",
  },
];

const Testimonials = () => (
  <div className="flex min-h-screen items-center justify-center px-6 py-12">
    <div>
      <h2 className="text-center font-semibold text-5xl tracking-[-0.03em]">
        What Our Customers Say
      </h2>
      <p className="mt-3 text-center text-muted-foreground text-xl">
        Discover what our valued customers think about our medicine delivery
        service.
      </p>
      <div className="mx-auto mt-14 max-w-(--breakpoint-xl) columns-1 gap-8 md:columns-2 lg:columns-3">
        {testimonials.map((testimonial) => (
          <div
            className="relative mb-8 break-inside-avoid rounded-xl bg-accent p-6"
            key={testimonial.id}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="size-10">
                  <AvatarFallback className="bg-primary font-medium text-primary-foreground text-xl">
                    {testimonial.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                </div>
              </div>
            </div>
            <p className="mt-5 text-[17px]">{testimonial.testimonial}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Testimonials;
