import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { ChevronDown, MapPin, Phone, Star, Zap, Award, Heart } from "lucide-react";

/**
 * Golden Orange Snack Landing Page
 * Design: Bold Street Food Energy
 * Color Scheme: Burnt Orange (#FF7A00), Jet Black (#0A0A0A), Cream White (#FFFAF0)
 * Typography: Poppins Bold (headlines), Inter Regular (body), Playfair Display Bold (section headers)
 */

export default function Home() {
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);
  const [stickyVisible, setStickyVisible] = useState(true);

  // Exit intent popup
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !showExitPopup && !submitted) {
        setShowExitPopup(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [showExitPopup, submitted]);

  // Handle form submission
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.email) {
      setSubmitted(true);
      setShowExitPopup(false);
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({ name: "", email: "", phone: "" });
        setSubmitted(false);
      }, 3000);
    }
  };

  // Smooth scroll to section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  // Track scroll for sticky button visibility
  useEffect(() => {
    const handleScroll = () => {
      setStickyVisible(window.scrollY < 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    {
      name: "Lanzhou Beef Noodle Soup",
      price: "£8.90",
      description: "Hand-pulled noodles in rich beef broth with tender meat",
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663533711603/GyUp4qbcEY44iMFXrWBGm3/hero-noodles-breZqbz6ZAVdwXsCT9Xunj.webp",
    },
    {
      name: "Lamb Skewers",
      price: "£3.80",
      description: "2 skewers of tender lamb with cumin spice, grilled to perfection",
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663533711603/GyUp4qbcEY44iMFXrWBGm3/menu-skewers-mGgu9uShsWnAxZgYTrn8hT.webp",
    },
    {
      name: "Jianbing (Chinese Crepe)",
      price: "£4.50",
      description: "Crispy crepe filled with egg, wonton, and scallions",
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663533711603/GyUp4qbcEY44iMFXrWBGm3/menu-jianbing-hGXmiTpufAugRftpnPmZ9N.webp",
    },
    {
      name: "Clay Pot Rice with Roasted Duck",
      price: "£8.90",
      description: "Tender roasted duck with vegetables in traditional clay pot",
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663533711603/GyUp4qbcEY44iMFXrWBGm3/menu-clay-pot-2khksnfWkfQBR2oQDefk.webp",
    },
  ];

  const testimonials = [
    {
      text: "Amazing food for such an incredibly cheap price",
      author: "Local Customer",
    },
    {
      text: "Authentic dishes you won't find elsewhere",
      author: "Food Enthusiast",
    },
    {
      text: "Always delicious and underrated gem",
      author: "Regular Customer",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFFAF0] text-[#0A0A0A]">
      {/* Sticky Header with CTA */}
      <header className="sticky top-0 z-40 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#FF7A00] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">G</span>
            </div>
            <h1 className="text-xl font-bold text-[#0A0A0A]">Golden Orange Snack</h1>
          </div>
          <nav className="hidden md:flex gap-8 items-center">
            <button
              onClick={() => scrollToSection("menu")}
              className="text-[#0A0A0A] hover:text-[#FF7A00] transition font-medium"
            >
              Menu
            </button>
            <button
              onClick={() => scrollToSection("location")}
              className="text-[#0A0A0A] hover:text-[#FF7A00] transition font-medium"
            >
              Location
            </button>
            <Button
              onClick={() => scrollToSection("offer")}
              className="bg-[#FF7A00] hover:bg-[#E66A00] text-white font-bold"
            >
              Get 10% Off
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section with Diagonal Cut */}
      <section
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663533711603/GyUp4qbcEY44iMFXrWBGm3/hero-noodles-breZqbz6ZAVdwXsCT9Xunj.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          clipPath: "polygon(0 0, 100% 0, 100% 85%, 0 100%)",
        }}
      >
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40 z-10"></div>

        {/* Hero Content */}
        <div className="relative z-20 text-center max-w-3xl mx-auto px-4 mb-20">
          <h1 className="headline-display text-white mb-6">
            Authentic Chinese Street Food
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 font-light">
            Fresh, Fast, and Affordable — Hand-pulled noodles, sizzling street snacks, and bold flavours at unbeatable prices in Leicester.
          </p>

          {/* Trust Signals */}
          <div className="flex flex-col md:flex-row justify-center gap-6 mb-8 text-white">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">Rated 4.7/5 across platforms</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-green-400" />
              <span className="font-semibold">Food Hygiene Rating: 5</span>
            </div>
          </div>

          {/* Primary CTA */}
          <Button
            onClick={() => scrollToSection("offer")}
            className="bg-[#FF7A00] hover:bg-[#E66A00] text-white font-bold text-lg px-8 py-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform animate-pulse"
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
            >
              📍 View Location on Google Maps
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white" />
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="headline-lg text-center mb-12">Why Locals Love Us</h2>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-[#FFFAF0] p-6 rounded-lg border-l-4 border-[#FF7A00] shadow-md hover:shadow-lg transition"
              >
                <p className="text-lg font-medium mb-4 italic">"{testimonial.text}"</p>
                <p className="text-sm text-gray-600">— {testimonial.author}</p>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-[#FF7A00] rounded-full flex items-center justify-center flex-shrink-0">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Authentic Northern Chinese Flavours</h3>
                <p className="text-gray-600">Real Chinese street food — not westernised versions</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-[#FF7A00] rounded-full flex items-center justify-center flex-shrink-0">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Fresh Hand-Pulled Noodles</h3>
                <p className="text-gray-600">Made fresh daily with premium ingredients</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-[#FF7A00] rounded-full flex items-center justify-center flex-shrink-0">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Budget-Friendly Meals</h3>
                <p className="text-gray-600">Big flavours at low prices — perfect for students and professionals</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-[#FF7A00] rounded-full flex items-center justify-center flex-shrink-0">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Friendly, Welcoming Service</h3>
                <p className="text-gray-600">Authentic hospitality from our passionate team</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-16 md:py-24 bg-[#FFFAF0]">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="headline-lg text-center mb-12">Customer Favourites</h2>

          {/* Menu Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {menuItems.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition transform hover:-translate-y-2"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
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
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <Button
              onClick={() => scrollToSection("offer")}
              className="bg-[#FF7A00] hover:bg-[#E66A00] text-white font-bold text-lg px-8 py-6 rounded-lg shadow-lg"
            >
              👉 Get 10% OFF Your First Order
            </Button>
          </div>
        </div>
      </section>

      {/* Lead Capture Section */}
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
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-white text-black border-0 py-3 px-4 rounded-lg"
              />
              <Input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="bg-white text-black border-0 py-3 px-4 rounded-lg"
              />
              <Input
                type="tel"
                placeholder="Your Phone (optional)"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="bg-white text-black border-0 py-3 px-4 rounded-lg"
              />
              <Button
                type="submit"
                className="w-full bg-[#FF7A00] hover:bg-[#E66A00] text-white font-bold text-lg py-6 rounded-lg"
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

      {/* Location Section */}
      <section id="location" className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="headline-lg text-center mb-12">Find Us in Leicester City Centre</h2>

          <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
            {/* Location Info */}
            <div className="space-y-6">
              <div className="flex gap-4">
                <MapPin className="w-6 h-6 text-[#FF7A00] flex-shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-lg">47 Market Place, Leicester</p>
                  <p className="text-gray-600">Leicester LE1 5EL, United Kingdom</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Phone className="w-6 h-6 text-[#FF7A00] flex-shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-lg">+447456504600</p>
                  <p className="text-gray-600">Open most days 11:00–19:30</p>
                </div>
              </div>
              <Button
                onClick={() => scrollToSection("offer")}
                className="bg-[#FF7A00] hover:bg-[#E66A00] text-white font-bold text-lg px-8 py-6 rounded-lg shadow-lg w-full"
              >
                👉 Get 10% Off & Visit Today
              </Button>
            </div>

            {/* Google Maps Embed */}
            <div className="h-80 rounded-lg overflow-hidden shadow-lg">
              <iframe
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2413.5678901234567!2d-1.1381!3d52.6386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4879c1c1c1c1c1c1%3A0x1c1c1c1c1c1c1c1c!2sGolden%20Orange%20Snack%2C%2047%20Market%20Pl%2C%20Leicester%20LE1%205EL!5e0!3m2!1sen!2suk!4v1234567890"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-24 bg-[#FFFAF0]">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="headline-lg text-center mb-12">Not Your Typical Takeaway</h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-[#FF7A00] rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-xl mb-3">Authenticity</h3>
              <p className="text-gray-600">Real Chinese street food — not westernised versions</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-[#FF7A00] rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-xl mb-3">Quality</h3>
              <p className="text-gray-600">Fresh ingredients + 5-star hygiene rating</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-[#FF7A00] rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-xl mb-3">Value</h3>
              <p className="text-gray-600">Big flavours at low prices</p>
            </div>
          </div>

          <div className="text-center">
            <Button
              onClick={() => scrollToSection("offer")}
              className="bg-[#FF7A00] hover:bg-[#E66A00] text-white font-bold text-lg px-8 py-6 rounded-lg shadow-lg"
            >
              👉 Claim Your 10% Discount Now
            </Button>
          </div>
        </div>
      </section>

      {/* Urgency Section */}
      <section className="py-16 md:py-24 bg-[#FF7A00] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="headline-lg text-white mb-6">Limited-Time Offer</h2>
          <p className="text-xl mb-8 font-light">
            Get 10% OFF your first order — available this week only.
          </p>
          <Button
            onClick={() => scrollToSection("offer")}
            className="bg-white hover:bg-gray-100 text-[#FF7A00] font-bold text-lg px-8 py-6 rounded-lg shadow-lg"
          >
            👉 Claim 10% Off
          </Button>
        </div>
      </section>

      {/* Footer */}
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
              <p className="text-gray-400">+447456504600</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <div className="space-y-2">
                <button
                  onClick={() => scrollToSection("menu")}
                  className="text-gray-400 hover:text-[#FF7A00] transition block"
                >
                  Menu
                </button>
                <button
                  onClick={() => scrollToSection("location")}
                  className="text-gray-400 hover:text-[#FF7A00] transition block"
                >
                  Location
                </button>
                <button
                  onClick={() => scrollToSection("offer")}
                  className="text-gray-400 hover:text-[#FF7A00] transition block"
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
            >
              View on Google Maps
            </a>
          </div>
        </div>
      </footer>

      {/* Exit Intent Popup */}
      {showExitPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-2xl animate-in fade-in zoom-in">
            <h3 className="text-2xl font-bold mb-4">Wait! Grab 10% off before you go</h3>
            <p className="text-gray-600 mb-6">
              Join our community and get exclusive offers straight to your inbox.
            </p>
            <form onSubmit={handleFormSubmit} className="space-y-3 mb-4">
              <Input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="border-2 border-[#FF7A00]"
              />
              <Button
                type="submit"
                className="w-full bg-[#FF7A00] hover:bg-[#E66A00] text-white font-bold"
              >
                Send Me My Discount
              </Button>
            </form>
            <button
              onClick={() => setShowExitPopup(false)}
              className="w-full text-gray-600 hover:text-gray-800 transition"
            >
              No thanks
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
