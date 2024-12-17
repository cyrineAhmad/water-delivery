import React from 'react'; 
import './AboutUsPage.css';

export default function AboutUsPage() {
  return (
    <div className="about-us-container">
      <div className="about-us-content">
        <h1>About Us</h1>
        <p>
          Welcome to <strong>Click&Drink</strong>, Your Trusted Water Delivery Solution.
        </p>
        <p>
          At <strong>Click&Drink</strong>, we are dedicated to making water delivery simple, affordable, 
          and reliable. Our mission is to ensure you always have access to clean water in the most convenient way possible.
        </p>
        <p>
          Currently, users can request refilling services by filling out a simple form. In the near future, 
          we plan to introduce a feature that will allow users to refill their containers directly without needing to 
          purchase any gallon first. This enhancement will make hydration even more accessible and hassle-free!
        </p>
        <p>
          We also offer fixed delivery schedules tailored to your needs, ensuring you never run out of water. 
          Whether for your home or business, we are here to provide a seamless and dependable service you can count on.
        </p>
        <p>
          Thank you for making <strong>Click&Drink</strong> a part of your daily life – delivering clean water, consistently and efficiently.
        </p>
      </div>
    </div>
  );
}
