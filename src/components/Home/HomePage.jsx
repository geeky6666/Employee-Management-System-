import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import NumbersBand from "./NumbersBand";
import Services from "./Services";
import Work from "./Work";
import Product from "./Product";
import Process from "./Process";
import Faq from "./Faq";
import CallToAction from "./CallToAction";
import Footer from "./Footer";

// The PUBLIC homepage for website visitors.
// It deliberately receives NO employee data, so salaries, emails and
// tasks can never appear here. All text comes from brand.js.
const HomePage = ({ onLogin, onSignUp }) => (
  <div className="min-h-screen bg-bg">
    <Navbar onLogin={onLogin} onSignUp={onSignUp} />
    <Hero onSignUp={onSignUp} />
    <NumbersBand />
    <Services />
    <Work />
    <Product onLogin={onLogin} onSignUp={onSignUp} />
    <Process />
    <Faq />
    <CallToAction />
    <Footer />
  </div>
);

export default HomePage;
