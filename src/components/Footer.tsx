
import { Dog, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Dog className="h-8 w-8 text-orange-500" />
              <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">
                DOGHub
              </h3>
            </div>
            <p className="text-gray-300">
              Your trusted companion for all things dog-related. From products to services, we've got your furry friend covered.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.linkedin.com/in/nahurira-joab-21014a235?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-orange-500 cursor-pointer transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://x.com/joab_n?t=S35I1Dv8fkvRWW6rvQQxyQ&s=09" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-orange-500 cursor-pointer transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <Instagram className="h-5 w-5 text-gray-400 hover:text-orange-500 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-orange-500">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/store" className="text-gray-300 hover:text-orange-500 transition-colors">Store</Link></li>
              <li><Link to="/marketplace" className="text-gray-300 hover:text-orange-500 transition-colors">Marketplace</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-orange-500 transition-colors">Services</Link></li>
              <li><Link to="/blog" className="text-gray-300 hover:text-orange-500 transition-colors">Blog</Link></li>
              <li><Link to="/lost-found" className="text-gray-300 hover:text-orange-500 transition-colors">Lost & Found</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-orange-500">Services</h4>
            <ul className="space-y-2">
              <li className="text-gray-300">Veterinarians</li>
              <li className="text-gray-300">Dog Training</li>
              <li className="text-gray-300">Grooming</li>
              <li className="text-gray-300">Pet Sitting</li>
              <li className="text-gray-300">Dog Walking</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-orange-500">Contact Us</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-orange-500" />
                <span className="text-gray-300">support@doghub.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-orange-500" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-orange-500" />
                <span className="text-gray-300">123 Pet Street, Dog City, DC 12345</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 DOGHub. All rights reserved to Joab Nahurira.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span className="text-gray-400 hover:text-orange-500 cursor-pointer text-sm transition-colors">Privacy Policy</span>
            <span className="text-gray-400 hover:text-orange-500 cursor-pointer text-sm transition-colors">Terms of Service</span>
            <span className="text-gray-400 hover:text-orange-500 cursor-pointer text-sm transition-colors">Cookie Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
