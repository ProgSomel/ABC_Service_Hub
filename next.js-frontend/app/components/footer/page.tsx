import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-800 text-white flex justify-center py-8 px-4">
        <div className="max-w-screen-lg mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Footer Section 1 */}
            <div>
              <h4 className="text-lg font-semibold mb-4">About Us</h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                fermentum ante ac lorem eleifend, sed fringilla libero faucibus.
              </p>
            </div>

            {/* Footer Section 2 */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <p>123 Main Street, City, Country</p>
              <p>Email: info@example.com</p>
              <p>Phone: +123 456 7890</p>
            </div>

            {/* Footer Section 3 */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-white hover:text-gray-400">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="text-white hover:text-gray-400">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-white hover:text-gray-400">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
