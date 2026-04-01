import Hero from "@/components/home/Hero";
import InfoTicker from "@/components/home/InfoTicker";
import CategorySlider from "@/components/home/CategorySlider";
import BestSellers from "@/components/home/BestSellers";
import GoldPromise from "@/components/home/GoldPromise";
import CollectionGrid from "@/components/home/CollectionGrid";
import CategorySection from "@/components/home/CategorySection";
import Newsletter from "@/components/home/Newsletter";

const necklaces = [
  { _id: 'n1', name: 'Kundan Choker Set', slug: 'kundan-choker-set', price: 4500, discountPrice: 3800, images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800'], category: 'Necklaces' },
  { _id: 'n2', name: 'Emerald Heritage Mala', slug: 'emerald-heritage-mala', price: 6200, discountPrice: 5400, images: ['https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=800'], category: 'Necklaces' },
  { _id: 'n3', name: 'Temple Jewellery Haar', slug: 'temple-jewellery-haar', price: 8500, discountPrice: 7200, images: ['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800'], category: 'Necklaces' },
  { _id: 'n4', name: 'Pearl Layered Necklace', slug: 'pearl-layered-necklace', price: 3200, discountPrice: 2800, images: ['https://images.unsplash.com/photo-1590548784585-643d2b9f2922?q=80&w=800'], category: 'Necklaces' },
  { _id: 'n5', name: 'Ruby Pendant Duo', slug: 'ruby-pendant-duo', price: 2900, discountPrice: 2400, images: ['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800'], category: 'Necklaces' },
  { _id: 'n6', name: 'Antique Gold Choker', slug: 'antique-gold-choker', price: 5800, discountPrice: 4900, images: ['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800'], category: 'Necklaces' },
  { _id: 'n7', name: 'Bridal Polki Necklace', slug: 'bridal-polki-necklace', price: 15500, discountPrice: 12800, images: ['https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=800'], category: 'Necklaces' },
  { _id: 'n8', name: 'Zirconia Floral Set', slug: 'zirconia-floral-set', price: 4200, discountPrice: 3500, images: ['https://images.unsplash.com/photo-1603561591411-071c4f723935?q=80&w=800'], category: 'Necklaces' },
];

const earrings = [
  { _id: 'e1', name: 'Royal Gold Jhumkas', slug: 'royal-gold-jhumkas', price: 1800, discountPrice: 1400, images: ['https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=800'], category: 'Earrings' },
  { _id: 'e2', name: 'Kundan Chandbalis', slug: 'kundan-chandbalis', price: 2200, discountPrice: 1800, images: ['https://images.unsplash.com/photo-1629224316810-9d8805b95e76?q=80&w=800'], category: 'Earrings' },
  { _id: 'e3', name: 'Diamond Studs (Elite)', slug: 'diamond-studs-elite', price: 1500, discountPrice: 1200, images: ['https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?q=80&w=800'], category: 'Earrings' },
  { _id: 'e4', name: 'Pearl Drop Heritage', slug: 'pearl-drop-heritage', price: 1200, discountPrice: 950, images: ['https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?q=80&w=800'], category: 'Earrings' },
  { _id: 'e5', name: 'Oxidized Silver Jhumkas', slug: 'oxidized-silver-jhumkas', price: 900, discountPrice: 750, images: ['https://images.unsplash.com/photo-1616606103915-cbc747b628aa?q=80&w=800'], category: 'Earrings' },
  { _id: 'e6', name: 'Meenakari Danglers', slug: 'meenakari-danglers', price: 2500, discountPrice: 2100, images: ['https://images.unsplash.com/photo-1544605027-463200a7b4f5?q=80&w=800'], category: 'Earrings' },
  { _id: 'e7', name: 'Floral Zircon Studs', slug: 'floral-zircon-studs', price: 800, discountPrice: 650, images: ['https://images.unsplash.com/photo-1630019019621-01f0440bfb75?q=80&w=800'], category: 'Earrings' },
  { _id: 'e8', name: 'Ear Chains (Sahara)', slug: 'ear-chains-sahara', price: 3200, discountPrice: 2700, images: ['https://images.unsplash.com/photo-1598560917505-59a3ad559071?q=80&w=800'], category: 'Earrings' },
];

const rings = [
  { _id: 'r1', name: 'Floral Diamond Band', slug: 'floral-diamond-band', price: 2800, discountPrice: 2100, images: ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800'], category: 'Rings' },
  { _id: 'r2', name: 'Kundan Statement Ring', slug: 'kundan-statement-ring', price: 1800, discountPrice: 1400, images: ['https://images.unsplash.com/photo-1605100804130-f2befd45903b?q=80&w=800'], category: 'Rings' },
  { _id: 'r3', name: 'Royal Solitaire Ring', slug: 'royal-solitaire-ring', price: 3500, discountPrice: 2900, images: ['https://images.unsplash.com/photo-1603961309033-047990172dfc?q=80&w=800'], category: 'Rings' },
  { _id: 'r4', name: 'Temple Motif Band', slug: 'temple-motif-band', price: 1200, discountPrice: 950, images: ['https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?q=80&w=800'], category: 'Rings' },
  { _id: 'r5', name: 'Pearl Eternity Wing', slug: 'pearl-eternity-wing', price: 2200, discountPrice: 1800, images: ['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=800'], category: 'Rings' },
  { _id: 'r6', name: 'Ruby Cocktail Ring', slug: 'ruby-cocktail-ring', price: 4200, discountPrice: 3500, images: ['https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?q=80&w=800'], category: 'Rings' },
  { _id: 'r7', name: 'Leaf Motif Gold Ring', slug: 'leaf-motif-gold-ring', price: 1500, discountPrice: 1200, images: ['https://images.unsplash.com/photo-1498603681439-650a30704c7c?q=80&w=800'], category: 'Rings' },
  { _id: 'r8', name: 'Antique Heritage Band', slug: 'antique-heritage-band', price: 2900, discountPrice: 2400, images: ['https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=800'], category: 'Rings' },
];

export default function Home() {
  return (
    <>
      <Hero />
      <InfoTicker />
      <CategorySlider />
      <BestSellers />
      <CategorySection title="Necklaces" products={necklaces} viewAllLink="/categories/necklaces" />
      <GoldPromise />
      <CategorySection title="Earrings" products={earrings} viewAllLink="/categories/earrings" />
      <CollectionGrid />
      <CategorySection title="Rings" products={rings} viewAllLink="/categories/rings" />
      {/* Craftsmanship Section */}
      <section className="section-padding" style={{ textAlign: 'center', backgroundColor: '#f9f9f9', borderTop: '1px solid #eee', borderBottom: '1px solid #eee' }}>
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
