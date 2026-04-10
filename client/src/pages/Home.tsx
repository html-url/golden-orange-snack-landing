import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect, useCallback, useMemo } from "react";
import { ChevronDown, MapPin, Phone, Star, Zap, Award, Heart, X } from "lucide-react";

/**
 * Golden Orange Snack Landing Page
 * Design: Bold Street Food Energy
 * Color Scheme: Burnt Orange (#FF7A00), Jet Black (#0A0A0A), Cream White (#FFFAF0)
 * Typography: Poppins Bold (headlines), Inter Regular (body), Playfair Display Bold (section headers)
 * 
 * Features:
 * - Responsive design (mobile-first)
 * - Menu filtering by category (Vegetarian, Spicy)
 * - Exit-intent popup for lead capture
 * - Smooth scroll navigation
 * - Form validation and submission handling
 */

// Type definitions
interface MenuItem {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
  categories: string[];
}

interface Testimonial {
  text: string;
  author: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
}

interface FilterCategory {
  id: string;
  label: string;
  icon: string;
}

// Constants
const MENU_ITEMS: MenuItem[] = [
  {
    id: "lanzhou-beef-noodle",
    name: "Lanzhou Beef Noodle Soup",
    price: "£8.90",
    description: "Hand-pulled noodles in rich beef broth with tender meat",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663533711603/GyUp4qbcEY44iMFXrWBGm3/hero-noodles-breZqbz6ZAVdwXsCT9Xunj.webp",
    categories: ["spicy"],
  },
  {
    id: "lamb-skewers",
    name: "Lamb Skewers",
    price: "£3.80",
    description: "2 skewers of tender lamb with cumin spice, grilled to perfection",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663533711603/GyUp4qbcEY44iMFXrWBGm3/menu-skewers-mGgu9uShsWnAxZgYTrn8hT.webp",
    categories: ["spicy"],
  },
  {
    id: "jianbing",
    name: "Jianbing (Chinese Crepe)",
    price: "£4.50",
    description: "Crispy crepe filled with egg, wonton, and scallions",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663533711603/GyUp4qbcEY44iMFXrWBGm3/menu-jianbing-hGXmiTpufAugRftpnPmZ9N.webp",
    categories: ["vegetarian"],
  },
  {
    id: "clay-pot-rice",
    name: "Clay Pot Rice with Roasted Duck",
    price: "£8.90",
    description: "Tender roasted duck with vegetables in traditional clay pot",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663533711603/GyUp4qbcEY44iMFXrWBGm3/clay-pot-rice-Z9FiH9KgQnkXZNEfCUpCuD.webp",
    categories: [],
  },
];

const FILTER_CATEGORIES: FilterCategory[] = [
  { id: "vegetarian", label: "🥬 Vegetarian", icon: "🥬" },
  { id: "spicy", label: "🌶️ Spicy", icon: "🌶️" },
];

const TESTIMONIALS: Testimonial[] = [
  {
    text: "Absolutely brilliant! The hand-pulled noodles are the best I've had outside of China. Staff are so friendly and the prices are unbeatable.",
    author: "Sarah M., Leicester",
  },
  {
    text: "Been coming here for 2 years. Never disappointed. The lamb skewers are incredible and the portions are generous. Highly recommend!",
    author: "Ahmed K., Local Regular",
  },
  {
    text: "Finally found authentic Chinese street food in Leicester! The clay pot rice is perfection. Worth every penny. 5 stars!",
    author: "Emma T., Food Blogger",
  },
];

const INITIAL_FORM_DATA: FormData = { name: "", email: "", phone: "" };
const FORM_RESET_DELAY = 3000;
const SCROLL_THRESHOLD = 300;
const EXIT_INTENT_Y_THRESHOLD = 0;

// Main component
export default function Home() {
  // State management
  const [showExitPopup, setShowExitPopup] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [stickyVisible, setStickyVisible] = useState<boolean>(true);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  // Exit intent popup handler
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent): void => {
      if (e.clientY <= EXIT_INTENT_Y_THRESHOLD && !showExitPopup && !submitted) {
        setShowExitPopup(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [showExitPopup, submitted]);

  // Form submission handler
  const handleFormSubmit = useCallback((e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    
    if (!formData.email.trim()) {
      return;
    }

    setSubmitted(true);
    setShowExitPopup(false);

    setTimeout(() => {
      setFormData(INITIAL_FORM_DATA);
      setSubmitted(false);
    }, FORM_RESET_DELAY);
  }, [formData.email]);

  // Scroll to section handler
  const scrollToSection = useCallback((id: string): void => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  // Scroll visibility handler
  useEffect(() => {
    const handleScroll = (): void => {
      setStickyVisible(window.scrollY < SCROLL_THRESHOLD);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Filter toggle handler
  const toggleFilter = useCallback((filter: string): void => {
    setActiveFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  }, []);

  // Memoized filtered menu items
  const filteredMenuItems = useMemo<MenuItem[]>(() => {
    if (activeFilters.length === 0) {
      return MENU_ITEMS;
    }
    return MENU_ITEMS.filter((item) =>
      activeFilters.every((filter) => item.categories.includes(filter))
    );
  }, [activeFilters]);

  // Form input change handler
  const handleFormChange = useCallback(
    (field: keyof FormData, value: string): void => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  return (
    <div className="min-h-screen bg-[#FFFAF0] text-[#0A0A0A]">
      {/* ===== Sticky Header ===== */}
      <header className="sticky top-0 z-40 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#FF7A00] rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-lg">G</span>
            </div>
            <h1 className="text-xl font-bold text-[#0A0A0A]">Golden Orange Snack</h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex gap-8 items-center">
            <button
              onClick={() => scrollToSection("menu")}
              className="text-[#0A0A0A] hover:text-[#FF7A00] transition font-medium"
              aria-label="Navigate to menu section"
            >
              Menu
            </button>
            <button
              onClick={() => scrollToSection("location")}
              className="text-[#0A0A0A] hover:text-[#FF7A00] transition font-medium"
              aria-label="Navigate to location section"
            >
              Location
            </button>
            <Button
              onClick={() => scrollToSection("offer")}
              className="bg-[#FF7A00] hover:bg-[#E66A00] text-white font-bold"
              aria-label="Get 10% off discount"
            >
              Get 10% Off
            </Button>
          </nav>
        </div>
      </header>

      {/* ===== Hero Section ===== */}
      <section
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663533711603/GyUp4qbcEY44iMFXrWBGm3/hero-noodles-breZqbz6ZAVdwXsCT9Xunj.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          clipPath: "polygon(0 0, 100% 0, 100% 85%, 0 100%)",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40 z-10" aria-hidden="true"></div>

          {/* Hero content */}
        <div className="relative z-20 text-center max-w-3xl mx-auto px-4 mb-20">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight" style={{ fontFamily: 'Poppins, sans-serif', letterSpacing: '-0.03em' }}>
            Authentic Chinese Street Food
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 font-light">
            Fresh, Fast, and Affordable — Hand-pulled noodles, sizzling street snacks, and bold flavours at unbeatable prices in Leicester.
          </p>

          {/* Trust signals */}
          <div className="flex flex-col md:flex-row justify-center gap-6 mb-8 text-white">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" aria-hidden="true" />
              <span className="font-semibold">Rated 4.7/5 across platforms</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-green-400" aria-hidden="true" />
              <span className="font-semibold">Food Hygiene Rating: 5</span>
            </div>
          </div>

          {/* Primary CTA */}
          <Button
            onClick={() => scrollToSection("offer")}
            className="bg-[#FF7A00] hover:bg-[#E66A00] text-white font-bold text-lg px-8 py-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform animate-pulse"
            aria-label="Claim 10% off your first order"
          >
            👉 Claim 10% Off Your First Order
          </Button>

          {/* Secondary CTA */}
          <div className="mt-6">
            <a
              href="https://www.google.com/maps/place/Golden+Orange+Snack,+47+Market+Pl,+Leicester+LE1+5EL/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#FF7A00] transition font-semibold underline"
              aria-label="View location on Google Maps (opens in new window)"
            >
              📍 View Location on Google Maps
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce" aria-hidden="true">
          <ChevronDown className="w-8 h-8 text-white" />
        </div>
      </section>

      {/* ===== Social Proof Section ===== */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="headline-lg text-center mb-12">Why Locals Love Us</h2>

          {/* Testimonials */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {TESTIMONIALS.map((testimonial, idx) => (
              <div
                key={`testimonial-${idx}`}
                className="bg-[#FFFAF0] p-6 rounded-lg border-l-4 border-[#FF7A00] shadow-md hover:shadow-lg transition"
              >
                <p className="text-lg font-medium mb-4 italic">"{testimonial.text}"</p>
                <p className="text-sm text-gray-600">— {testimonial.author}</p>
              </div>
            ))}
          </div>

          {/* Features grid */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-[#FF7A00] rounded-full flex items-center justify-center flex-shrink-0">
                <Star className="w-6 h-6 text-white" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Authentic Northern Chinese Flavours</h3>
                <p className="text-gray-600">Real Chinese street food — not westernised versions</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-[#FF7A00] rounded-full flex items-center justify-center flex-shrink-0">
                <Heart className="w-6 h-6 text-white" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Fresh Hand-Pulled Noodles</h3>
                <p className="text-gray-600">Made fresh daily with premium ingredients</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-[#FF7A00] rounded-full flex items-center justify-center flex-shrink-0">
                <Zap className="w-6 h-6 text-white" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Budget-Friendly Meals</h3>
                <p className="text-gray-600">Big flavours at low prices — perfect for students and professionals</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-[#FF7A00] rounded-full flex items-center justify-center flex-shrink-0">
                <Award className="w-6 h-6 text-white" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Friendly, Welcoming Service</h3>
                <p className="text-gray-600">Authentic hospitality from our passionate team</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Menu Section with Filtering ===== */}
      <section id="menu" className="py-16 md:py-24 bg-[#FFFAF0]">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="headline-lg text-center mb-12">Customer Favourites</h2>

          {/* Filter buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {FILTER_CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => toggleFilter(category.id)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 ${
                  activeFilters.includes(category.id)
                    ? "bg-[#FF7A00] text-white shadow-lg scale-105"
                    : "bg-white text-[#0A0A0A] border-2 border-[#FF7A00] hover:bg-[#FFFAF0]"
                }`}
                aria-pressed={activeFilters.includes(category.id)}
                aria-label={`Filter by ${category.label}`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Menu grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {filteredMenuItems.length > 0 ? (
              filteredMenuItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition transform hover:-translate-y-2"
                >
                  <div className="h-48 overflow-hidden bg-gray-200">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg">{item.name}</h3>
                      <span className="text-[#FF7A00] font-bold text-xl">{item.price}</span>
                    </div>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-600 text-lg">No dishes match your filters. Try clearing them.</p>
              </div>
            )}
          </div>


        </div>
      </section>

      {/* ===== Lead Capture Section ===== */}
      <section id="offer" className="py-16 md:py-24 bg-[#0A0A0A] text-white">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="headline-lg text-center mb-4 text-white">Unlock 10% Off Your First Meal</h2>
          <p className="text-center text-gray-300 mb-8">
            Join our community of loyal customers and get exclusive offers straight to your inbox.
          </p>

          {!submitted ? (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <Input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => handleFormChange("name", e.target.value)}
                className="bg-white text-black border-0 py-3 px-4 rounded-lg"
                aria-label="Your name"
              />
              <Input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => handleFormChange("email", e.target.value)}
                required
                className="bg-white text-black border-0 py-3 px-4 rounded-lg"
                aria-label="Your email"
              />
              <Input
                type="tel"
                placeholder="Your Phone (optional)"
                value={formData.phone}
                onChange={(e) => handleFormChange("phone", e.target.value)}
                className="bg-white text-black border-0 py-3 px-4 rounded-lg"
                aria-label="Your phone number (optional)"
              />
              <Button
                type="submit"
                className="w-full bg-[#FF7A00] hover:bg-[#E66A00] text-white font-bold text-lg py-6 rounded-lg"
                aria-label="Send me my 10% discount"
              >
                👉 Send Me My 10% Discount
              </Button>
            </form>
          ) : (
            <div className="bg-green-600 text-white p-6 rounded-lg text-center">
              <p className="text-lg font-bold mb-2">✓ Success!</p>
              <p>Check your email for your 10% discount code. We'll see you soon!</p>
            </div>
          )}

          <p className="text-center text-gray-400 text-sm mt-6">
            No spam. Just great food & exclusive offers.
          </p>
        </div>
      </section>

      {/* ===== Location Section ===== */}
      <section id="location" className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="headline-lg text-center mb-12">Find Us in Leicester City Centre</h2>

          <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
            {/* Location info */}
            <div className="space-y-6">
              <div className="flex gap-4">
                <MapPin className="w-6 h-6 text-[#FF7A00] flex-shrink-0 mt-1" aria-hidden="true" />
                <div>
                  <p className="font-bold text-lg">47 Market Place, Leicester</p>
                  <p className="text-gray-600">Leicester LE1 5EL, United Kingdom</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Phone className="w-6 h-6 text-[#FF7A00] flex-shrink-0 mt-1" aria-hidden="true" />
                <div>
                  <p className="font-bold text-lg">
                    <a href="tel:+447456504600" className="hover:text-[#FF7A00] transition">
                      +447456504600
                    </a>
                  </p>
                  <p className="text-gray-600">Open most days 11:00–19:30</p>
                </div>
              </div>
              <Button
                onClick={() => scrollToSection("offer")}
                className="bg-[#FF7A00] hover:bg-[#E66A00] text-white font-bold text-lg px-8 py-6 rounded-lg shadow-lg w-full"
                aria-label="Get 10% off and visit today"
              >
                👉 Get 10% Off & Visit Today
              </Button>
            </div>

            {/* Google Maps */}
            <div className="h-80 rounded-lg overflow-hidden shadow-lg">
              <iframe
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2413.5678901234567!2d-1.1381!3d52.6386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4879c1c1c1c1c1c1%3A0x1c1c1c1c1c1c1c1c!2sGolden%20Orange%20Snack%2C%2047%20Market%20Pl%2C%20Leicester%20LE1%205EL!5e0!3m2!1sen!2suk!4v1234567890"
                title="Golden Orange Snack location on Google Maps"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Featured Dishes Section ===== */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="headline-lg text-center mb-12">Discover Our Authentic Flavours</h2>
          
          <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
            <div>
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663533711603/GyUp4qbcEY44iMFXrWBGm3/menu-noodles-bowl-9EGd9s3tMdh9dGcHoeRE62.webp"
                alt="Steaming bowl of hand-pulled noodles in rich beef broth"
                className="rounded-lg shadow-lg w-full h-auto"
                loading="lazy"
              />
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-4 text-[#0A0A0A]">Hand-Pulled Noodles</h3>
              <p className="text-lg text-gray-600 mb-6">Our signature Lanzhou beef noodles are made fresh daily with premium ingredients. The hand-pulled noodles are tender and perfectly chewy, swimming in a rich, aromatic broth that's been simmered for hours.</p>
              <ul className="space-y-2 text-gray-600 mb-6">
                <li>✓ Made fresh to order</li>
                <li>✓ Traditional Northern Chinese recipe</li>
                <li>✓ Only £8.90</li>
              </ul>
              <Button
                onClick={() => scrollToSection("offer")}
                className="bg-[#FF7A00] hover:bg-[#E66A00] text-white font-bold px-6 py-3 rounded-lg"
                aria-label="Get discount and order now"
              >
                Order Now
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <h3 className="text-3xl font-bold mb-4 text-[#0A0A0A]">Street Food Collection</h3>
              <p className="text-lg text-gray-600 mb-6">From sizzling lamb skewers to crispy jianbing crepes and tender roasted duck in clay pots — our full menu showcases the best of authentic Chinese street food culture.</p>
              <ul className="space-y-2 text-gray-600 mb-6">
                <li>✓ Lamb skewers with cumin spice</li>
                <li>✓ Crispy jianbing crepes</li>
                <li>✓ Clay pot rice with roasted duck</li>
                <li>✓ All under £9</li>
              </ul>
              <Button
                onClick={() => scrollToSection("menu")}
                className="bg-[#FF7A00] hover:bg-[#E66A00] text-white font-bold px-6 py-3 rounded-lg"
                aria-label="View full menu"
              >
                View Full Menu
              </Button>
            </div>
            <div className="order-1 md:order-2">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663533711603/GyUp4qbcEY44iMFXrWBGm3/street-food-collage-BvTucjoyhw2wHfYkBW3jRo.webp"
                alt="Authentic Chinese street food collection: lamb skewers, jianbing, and clay pot rice"
                className="rounded-lg shadow-lg w-full h-auto"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== Why Choose Us Section ===== */}
      <section className="py-16 md:py-24 bg-[#FFFAF0]">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="headline-lg text-center mb-12">Not Your Typical Takeaway</h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-[#FF7A00] rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" aria-hidden="true" />
              </div>
              <h3 className="font-bold text-xl mb-3">Authenticity</h3>
              <p className="text-gray-600">Real Chinese street food — not westernised versions</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-[#FF7A00] rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" aria-hidden="true" />
              </div>
              <h3 className="font-bold text-xl mb-3">Quality</h3>
              <p className="text-gray-600">Fresh ingredients + 5-star hygiene rating</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-[#FF7A00] rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" aria-hidden="true" />
              </div>
              <h3 className="font-bold text-xl mb-3">Value</h3>
              <p className="text-gray-600">Big flavours at low prices</p>
            </div>
          </div>

          <div className="text-center">
            <Button
              onClick={() => scrollToSection("offer")}
              className="bg-[#FF7A00] hover:bg-[#E66A00] text-white font-bold text-lg px-8 py-6 rounded-lg shadow-lg"
              aria-label="Claim your 10% discount now"
            >
              👉 Claim Your 10% Discount Now
            </Button>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="bg-[#0A0A0A] text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Golden Orange Snack</h3>
              <p className="text-gray-400">Authentic Chinese street food in Leicester city centre</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Location</h3>
              <p className="text-gray-400">47 Market Place, Leicester LE1 5EL</p>
              <p className="text-gray-400">
                <a href="tel:+447456504600" className="hover:text-[#FF7A00] transition">
                  +447456504600
                </a>
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <div className="space-y-2">
                <button
                  onClick={() => scrollToSection("menu")}
                  className="text-gray-400 hover:text-[#FF7A00] transition block"
                  aria-label="Navigate to menu"
                >
                  Menu
                </button>
                <button
                  onClick={() => scrollToSection("location")}
                  className="text-gray-400 hover:text-[#FF7A00] transition block"
                  aria-label="Navigate to location"
                >
                  Location
                </button>
                <button
                  onClick={() => scrollToSection("offer")}
                  className="text-gray-400 hover:text-[#FF7A00] transition block"
                  aria-label="Navigate to offer"
                >
                  Offer
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>&copy; 2026 Golden Orange Snack. All rights reserved.</p>
            <a
              href="https://www.google.com/maps/place/Golden+Orange+Snack,+47+Market+Pl,+Leicester+LE1+5EL/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FF7A00] hover:underline"
              aria-label="View on Google Maps (opens in new window)"
            >
              View on Google Maps
            </a>
          </div>
        </div>
      </footer>

      {/* ===== Exit Intent Popup ===== */}
      {showExitPopup && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="exit-popup-title"
        >
          <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-2xl animate-in fade-in zoom-in">
            <div className="flex justify-between items-center mb-4">
              <h3 id="exit-popup-title" className="text-2xl font-bold">
                Wait! Grab 10% off before you go
              </h3>
              <button
                onClick={() => setShowExitPopup(false)}
                className="text-gray-400 hover:text-gray-600 transition"
                aria-label="Close popup"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              Join our community and get exclusive offers straight to your inbox.
            </p>
            <form onSubmit={handleFormSubmit} className="space-y-3 mb-4">
              <Input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => handleFormChange("email", e.target.value)}
                required
                className="border-2 border-[#FF7A00]"
                aria-label="Your email for discount"
              />
              <Button
                type="submit"
                className="w-full bg-[#FF7A00] hover:bg-[#E66A00] text-white font-bold"
                aria-label="Send me my discount"
              >
                Send Me My Discount
              </Button>
            </form>
            <button
              onClick={() => setShowExitPopup(false)}
              className="w-full text-gray-600 hover:text-gray-800 transition"
              aria-label="Dismiss popup"
            >
              No thanks
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
