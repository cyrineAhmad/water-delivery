import React from "react";
import './TermsAndConditions.css'; 

const TermsAndConditions = () => {
  return (
    <div className="terms-container">
      <h1>Terms and Conditions</h1>
      <p>Thank you for visiting <strong>Click&Drink</strong>. By using this website and placing an order, you agree to comply with these Terms and Conditions.
       Please read them carefully before using our services.</p>
      
      <h2>1. User Agreement</h2>
      <p>By using <strong>Click&Drink</strong> and placing an order, you confirm:</p>
      <ul>
        <li>You are capable of entering into legally binding agreements.</li>
        <li>You understand that the products and services provided are subject to availability.</li>
      </ul>
      <p>An order placed on the website constitutes an offer and is not binding until we confirm it via email.</p>

      <h2>2. Intellectual Property</h2>
      <p>All content on the website, including images, text, logos, graphics, and design elements, is the property of <strong>Click&Drink</strong>
       and protected by applicable intellectual property laws.
       You may not reproduce, distribute, or modify any Content for commercial or non-commercial purposes without written permission from <strong>Click&Drink</strong>.</p>

      <h2>3. Pricing and Payment</h2>
      <ul>
        <li>Prices for products are listed in the local currency.</li>
        <li>Payment can be made via credit cards or cash on delivery.</li>
        <li>All credit card information is securely processed through trusted payment gateways. We do not store any payment details.</li>
      </ul>

      <h2>4. Delivery and Shipping</h2>
      <p>We provide delivery services to the registered address during checkout. Delivery times may vary depending on product availability and the delivery area.</p>
      <p>It is your responsibility to ensure someone is available to receive the product at the delivery address.</p>

      <h2>5. Product Ownership and Risk</h2>
      <p>Ownership of the products remains with <strong>MayHemmak</strong> until full payment is received. Once the products are successfully delivered, the risk of loss or damage passes to you.</p>

      <h2>6. Returns, Exchanges, and Refunds</h2>
      <p>If you receive a damaged or defective product, please contact us within 24 hours of delivery. We will arrange for a replacement or refund, depending on the nature of the issue.</p>
      <p>All returned products should be in their original packaging, and products that have been used or opened cannot be returned unless defective.</p>

      <h2>7. Modifying or Cancelling Orders</h2>
      <p>Once an order is placed, it is processed promptly to ensure fast delivery. However, if you need to modify or cancel your order, please contact us as soon as possible.
         We cannot guarantee changes to the order once it has been processed.</p>

      <h2>8. Warranty</h2>
      <p>Products such as coolers or dispensers may come with a warranty against manufacturing defects. Please refer to the product description for specific warranty details.</p>

      <h2>9. Data Privacy</h2>
      <p>Your personal data is collected and stored securely to process your orders. For more details, please refer to our <strong>Privacy Policy</strong>.</p>

      <h2>10. Promotions and Special Offers</h2>
      <p>From time to time, we may offer promotions or discounts. These offers are subject to change without prior notice. Promotional offers are valid as long as they are listed on our website, and terms for each offer will be specified.</p>

      <h2>11. Loyalty Program</h2>
      <p>We offer a loyalty program where customers can earn points for purchases. These points can be redeemed for discounts or other rewards, as outlined on the website.</p>

      <h2>12. General Terms</h2>
      <p>These Terms and Conditions are governed by the laws of Lebanon. Any disputes arising from the use of this website will be handled under the jurisdiction of the local courts.</p>

      <h2>13. Contact Information</h2>
      <p>If you have any questions or concerns about these Terms and Conditions, please contact us at:</p>
      <p>Email: <strong>info@clickndrink.com</strong></p>
      
      <footer className="termsFooter">
        <p>Copyright © 2024 Click&Drink</p>
      </footer>
    </div>
  );
};

export default TermsAndConditions;
