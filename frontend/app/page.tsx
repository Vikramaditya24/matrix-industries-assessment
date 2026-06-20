
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Services from "./components/Services";
import ValueFramework from "./components/ValueFramework";
import Testimonials from "./components/Testimonials";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
export default function Home() {
  return (
      <main >
        <Navbar />
        <Hero />
      
      <Services />
      <ValueFramework />
      <Testimonials />
      <ContactForm />
      <Footer />
      </main>
    
  );
}
