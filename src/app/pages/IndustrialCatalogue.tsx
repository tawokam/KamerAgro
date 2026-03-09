import { useState } from "react";
import {
  ArrowLeft,
  Search,
  Filter,
  Award,
  ShieldCheck,
  Package,
} from "lucide-react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { industrialProducts } from "../data/mockData";
import BottomNav from "../components/BottomNav";

export default function IndustrialCatalogue() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] =
    useState<string>("Toutes");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "Toutes",
    "Huiles",
    "Chocolats",
    "Farines",
    "Cafés",
    "Produits Laitiers",
    "Produits Aquatiques",
    "Charcuterie",
  ];

  const filteredProducts = industrialProducts.filter(
    (product) => {
      const matchesCategory =
        selectedCategory === "Toutes" ||
        product.category === selectedCategory;
      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        product.manufacturer
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    },
  );

  return (
    <div className="min-h-screen bg-[#001F1A] relative overflow-hidden pb-24">
      {/* African Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <svg
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="pattern"
              x="0"
              y="0"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M50 0 L100 50 L50 100 L0 50 Z"
                fill="none"
                stroke="#C6A664"
                strokeWidth="0.5"
              />
              <circle
                cx="50"
                cy="50"
                r="15"
                fill="none"
                stroke="#C6A664"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="url(#pattern)"
          />
        </svg>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="px-6 py-6 border-b border-white/10 backdrop-blur-xl bg-[#001F1A]/80 sticky top-0 z-20">
          <div className="mb-4">
            <h1 className="text-2xl font-extrabold text-white">
              Catalogue Industriel
            </h1>
            <p className="text-[#C6A664] text-sm font-light">
              Produits Transformés Premium
            </p>
          </div>

          {/* Search Bar - Glassmorphism */}
          <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-4 flex items-center gap-3">
            <Search className="w-5 h-5 text-white/60" />
            <input
              type="text"
              placeholder="Rechercher un produit transformé..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-white placeholder:text-white/50 outline-none"
            />
            <Filter className="w-5 h-5 text-white/60 cursor-pointer" />
          </div>
        </div>

        {/* Trust Banner */}
        <div className="px-6 py-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="backdrop-blur-xl bg-[#C6A664]/10 rounded-2xl border border-[#C6A664]/30 p-4 flex items-center gap-3"
          >
            <ShieldCheck className="w-8 h-8 text-[#C6A664] flex-shrink-0" />
            <div>
              <div className="text-white font-semibold text-sm">
                Qualité Garantie ATC
              </div>
              <div className="text-white/70 text-xs">
                Tous nos produits sont certifiés et traçables
              </div>
            </div>
          </motion.div>
        </div>

        {/* Category Filter */}
        <div className="px-6 py-3">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? "bg-[#C6A664] text-[#001F1A]"
                    : "backdrop-blur-xl bg-white/5 text-white border border-white/10 hover:bg-white/10"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid - Premium Layout */}
        <div className="px-6 py-4 grid grid-cols-1 gap-6">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.08,
                duration: 0.6,
              }}
              onClick={() =>
                navigate(`/industrial/${product.id}`)
              }
              className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 rounded-3xl border border-white/20 overflow-hidden hover:border-[#C6A664]/50 transition-all cursor-pointer group shadow-2xl"
            >
              {/* Product Image with Overlay */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#001F1A] via-[#001F1A]/50 to-transparent" />

                {/* Certification Badges */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  {product.certifications.map((cert, idx) => (
                    <div
                      key={idx}
                      className="backdrop-blur-xl bg-[#C6A664]/90 px-3 py-1 rounded-full flex items-center gap-1"
                    >
                      <Award className="w-3 h-3 text-[#001F1A]" />
                      <span className="text-[#001F1A] text-xs font-bold">
                        {cert}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Stock Indicator */}
                <div className="absolute bottom-4 right-4 backdrop-blur-xl bg-white/20 px-4 py-2 rounded-full">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-white" />
                    <span className="text-white text-sm font-medium">
                      {product.stock} unités
                    </span>
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="inline-block px-3 py-1 rounded-full backdrop-blur-xl bg-[#C6A664]/20 border border-[#C6A664]/30 mb-3">
                  <span className="text-[#C6A664] text-xs font-medium">
                    {product.category}
                  </span>
                </div>

                <h3 className="text-white font-extrabold text-2xl mb-2">
                  {product.name}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed mb-4">
                  {product.description}
                </p>

                {/* Manufacturer & Origin */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
                  <div>
                    <div className="text-white/60 text-xs mb-1">
                      Fabricant
                    </div>
                    <div className="text-white font-semibold text-sm">
                      {product.manufacturer}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white/60 text-xs mb-1">
                      Origine
                    </div>
                    <div className="text-white font-semibold text-sm">
                      {product.origin}
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="backdrop-blur-xl bg-gradient-to-br from-[#C6A664]/30 to-[#C6A664]/10 rounded-2xl border border-[#C6A664]/30 p-5">
                  <div className="text-white/70 text-sm mb-1">
                    Prix professionnel
                  </div>
                  <div className="flex items-end gap-2">
                    <div className="text-[#C6A664] font-extrabold text-4xl">
                      {product.price.toLocaleString()}
                    </div>
                    <div className="text-[#C6A664] text-lg mb-1">
                      FCFA
                    </div>
                  </div>
                  <div className="text-white/60 text-sm mt-1">
                    par {product.unit}
                  </div>
                </div>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-4 bg-[#C6A664] hover:bg-[#B89654] text-[#001F1A] py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#C6A664]/30 transition-all"
                >
                  <Package className="w-5 h-5" />
                  Commander en gros
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-white/40 text-lg mb-2">
              Aucun produit trouvé
            </div>
            <div className="text-white/30 text-sm">
              Essayez une autre catégorie
            </div>
          </div>
        )}
      </div>

      <BottomNav />

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}