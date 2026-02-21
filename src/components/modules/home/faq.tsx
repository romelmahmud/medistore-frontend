import {
  BadgeDollarSign,
  Route,
  ShieldCheck,
  Truck,
  Undo2,
  UserRoundCheck,
} from "lucide-react";

const faq = [
  {
    icon: Undo2,
    question: "What is your return policy?",
    answer:
      "You can return unused items in their original packaging within 30 days for a refund or exchange. Contact support for assistance.",
  },
  {
    icon: Route,
    question: "How do I track my order?",
    answer:
      "Track your order using the link provided in your confirmation email, or log into your account to view tracking details.",
  },
  {
    icon: Truck,
    question: "Do you ship internationally?",
    answer:
      "No, currently we only ship within Bangladesh. We’re working on expanding our shipping options in the future.",
  },
  {
    icon: BadgeDollarSign,
    question: "What payment methods do you accept?",
    answer:
      "Currently, we accept cash on delivery only. We’re working on adding more payment options soon.",
  },
  {
    icon: ShieldCheck,
    question: "What if I receive a damaged item?",
    answer:
      "Please contact our support team within 48 hours of delivery with photos of the damaged item. We’ll arrange a replacement or refund.",
  },
  {
    icon: UserRoundCheck,
    question: "How can I contact customer support?",
    answer:
      "Reach out to our support team via email or live chat for assistance with any inquiries.",
  },
];

const FAQ = () => {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-12 mt-12">
      <div className="max-w-(--breakpoint-lg)">
        <h2 className="text-center font-semibold text-4xl leading-[1.15]! tracking-[-0.035em] md:text-5xl">
          Frequently Asked Questions
        </h2>
        <p className="mt-3 text-center text-muted-foreground text-xl">
          Quick answers to common questions about our products and services.
        </p>

        <div className="mt-12 grid gap-4 rounded-xl md:grid-cols-2 lg:grid-cols-3">
          {faq.map(({ question, answer, icon: Icon }) => (
            <div className="rounded-xl border p-6" key={question}>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent">
                <Icon />
              </div>
              <div className="mt-5 mb-2 flex items-start gap-2 font-semibold text-[1.35rem] tracking-[-0.02em]">
                <span>{question}</span>
              </div>
              <p className="text-foreground/70">{answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
