import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t bg-muted/40 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand Section */}
        <div>
          <h3 className="text-xl font-semibold">MediStore 💊</h3>
          <p className="mt-4 text-sm text-muted-foreground">
            Your trusted online pharmacy for genuine over-the-counter medicines
            and healthcare essentials. Safe, secure, and delivered to your
            doorstep.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-lg">Quick Links</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground">
                Home
              </Link>
            </li>
            <li>
              <Link href="/shop" className="hover:text-foreground">
                medicines
              </Link>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="font-semibold text-lg">Popular Categories</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link
                href="/category/pain-relief"
                className="hover:text-foreground"
              >
                Pain Relief
              </Link>
            </li>
            <li>
              <Link href="/category/vitamins" className="hover:text-foreground">
                Vitamins & Supplements
              </Link>
            </li>
            <li>
              <Link
                href="/category/diabetes-care"
                className="hover:text-foreground"
              >
                Diabetes Care
              </Link>
            </li>
            <li>
              <Link
                href="/category/baby-care"
                className="hover:text-foreground"
              >
                Baby Care
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-semibold text-lg">Contact Us</h4>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <MapPin size={16} />
              Khulna, Bangladesh
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} />
              +880 1234-567890
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} />
              support@medistore.com
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} MediStore. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
