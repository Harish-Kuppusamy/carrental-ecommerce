import { assets } from "../assets/assets";

/**
 * Footer component with social links, quick navigation, and contact details
 */
const Footer = () => {
  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-60 text-sm text-gray-500">
      {/* Main Footer Grid */}
      <div className="flex flex-wrap justify-between items-start gap-18 pb-6 border-bordercolor border-b-2 md:gap-6">
        {/* Logo & Description Section */}
        <div>
          <img src={assets.logo} alt="CarRental Logo" className="h-8 md:h-9" />
          <p className="max-w-80 mt-3">
            Rent your dream car at the best price. Hassle-free booking with
            top-rated service.
          </p>

          {/* Social Media Icons */}
          <div className="flex items-center gap-3 mt-6">
            <a href="#">
              <img
                src={assets.instagram_logo}
                alt="Instagram"
                className="w-5 h-5"
              />
            </a>
            <a href="#">
              <img
                src={assets.facebook_logo}
                alt="Facebook"
                className="w-5 h-5"
              />
            </a>
            <a href="#">
              <img
                src={assets.twitter_logo}
                alt="Twitter"
                className="w-5 h-5"
              />
            </a>
            <a href="#">
              <img src={assets.gmail_logo} alt="Gmail" className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Quick Navigation Links */}
        <div>
          <h2 className="text-base font-medium text-gray-800 uppercase">
            Quick Links
          </h2>
          <ul className="mt-3 flex flex-col gap-1.5">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Browse Cars</a>
            </li>
            <li>
              <a href="#">List Your Car</a>
            </li>
            <li>
              <a href="#">About Us</a>
            </li>
          </ul>
        </div>

        {/* Resources Links */}
        <div>
          <h2 className="text-base font-medium text-gray-800 uppercase">
            Resources
          </h2>
          <ul className="mt-3 flex flex-col gap-1.5">
            <li>
              <a href="#">Help Center</a>
            </li>
            <li>
              <a href="#">Terms Of Service</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Insurance</a>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <h2 className="text-base font-medium text-gray-800 uppercase">
            Contact
          </h2>
          <ul className="mt-3 flex flex-col gap-1.5">
            <li>
              <a href="#">1234 Luxury Drive</a>
            </li>
            <li>
              <a href="#">San Francisco, CA 94107</a>
            </li>
            <li>
              <a href="#">+1 234 567890</a>
            </li>
            <li>info@example.com</li>
          </ul>
        </div>
      </div>

      {/* Bottom Footer Section */}
      <div className="flex flex-col md:flex-row gap-2 items-center justify-between py-5">
        <p>© {new Date().getFullYear()} Brand. All rights reserved.</p>

        {/* Legal Links */}
        <ul className="flex items-center gap-4">
          <li>
            <a href="#">Privacy</a>
          </li>
          <li>|</li>
          <li>
            <a href="#">Terms</a>
          </li>
          <li>|</li>
          <li>
            <a href="#">Cookies</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
