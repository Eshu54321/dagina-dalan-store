import Hero from "@/components/home/Hero";
import InfoTicker from "@/components/home/InfoTicker";
import CategorySlider from "@/components/home/CategorySlider";
import BestSellers from "@/components/home/BestSellers";
import GoldPromise from "@/components/home/GoldPromise";
import CollectionGrid from "@/components/home/CollectionGrid";
import Newsletter from "@/components/home/Newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <InfoTicker />
      <CategorySlider />
      <BestSellers />
      <GoldPromise />
      <CollectionGrid />
      <section style={{ padding: '80px 0', textAlign: 'center', backgroundColor: '#f9f9f9' }}>
        <div className="container">
          <div className="section-title">
            <h2>Our Craftsmanship</h2>
            <div className="underline"></div>
          </div>
          <p style={{ maxWidth: '700px', margin: '0 auto', opacity: 0.7 }}>
            Experience the allure of fine craftsmanship. Each piece is meticulously designed to bring a touch of luxury to your everyday style.
          </p>
        </div>
      </section>
      <Newsletter />
    </>
  );
}
