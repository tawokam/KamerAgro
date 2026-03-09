import { ArrowLeft, Award, ShieldCheck, Package, Phone, ShoppingCart, Factory } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { motion } from "motion/react";
import { industrialProducts } from "../data/mockData";

export default function IndustrialProductDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const product = industrialProducts.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen bg-[#001F1A] flex items-center justify-center">
        <div className="text-white">Produit non trouvé</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#001F1A] relative overflow-hidden">
      {/* African Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M50 0 L100 50 L50 100 L0 50 Z" fill="none" stroke="#C6A664" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pattern)" />
        </svg>
      </div>

      <div className="relative z-10">
        {/* Header with Image */}
        <div className="relative h-[50vh]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#001F1A]/50 to-[#001F1A]" />
          
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="absolute top-6 left-6 w-12 h-12 backdrop-blur-xl bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>

          {/* Certifications */}
          <div className="absolute top-6 right-6 flex flex-col gap-2">
            {product.certifications.map((cert, idx) => (
              <div
                key={idx}
                className="backdrop-blur-xl bg-[#C6A664]/90 px-4 py-2 rounded-full flex items-center gap-2 shadow-lg"
              >
                <Award className="w-4 h-4 text-[#001F1A]" />
                <span className="text-[#001F1A] text-sm font-bold">{cert}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="px-6 -mt-10 relative z-10 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="backdrop-blur-xl bg-gradient-to-br from-white/15 to-white/5 rounded-3xl border border-white/20 p-6 shadow-2xl"
          >
            {/* Title & Category */}
            <div className="mb-6">
              <div className="inline-block px-3 py-1 rounded-full backdrop-blur-xl bg-[#C6A664]/20 border border-[#C6A664]/30 mb-3">
                <span className="text-[#C6A664] text-sm font-medium">{product.category}</span>
              </div>
              <h1 className="text-3xl font-extrabold text-white mb-2">{product.name}</h1>
              <p className="text-white/70 leading-relaxed">{product.description}</p>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Factory className="w-4 h-4 text-[#C6A664]" />
                  <span className="text-white/60 text-sm">Fabricant</span>
                </div>
                <div className="text-white font-semibold">{product.manufacturer}</div>
                {product.verified && (
                  <div className="text-[#C6A664] text-xs flex items-center gap-1 mt-1">
                    <ShieldCheck className="w-3 h-3" />
                    Certifié ATC
                  </div>
                )}
              </div>

              <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Package className="w-4 h-4 text-[#C6A664]" />
                  <span className="text-white/60 text-sm">Stock</span>
                </div>
                <div className="text-white font-semibold text-2xl">{product.stock}</div>
                <div className="text-green-400 text-xs">Disponible</div>
              </div>
            </div>

            {/* Origin Banner */}
            <div className="backdrop-blur-xl bg-gradient-to-r from-[#C6A664]/20 to-transparent rounded-2xl border border-[#C6A664]/30 p-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#C6A664] rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-[#001F1A]" />
                </div>
                <div>
                  <div className="text-white/70 text-xs">Origine certifiée</div>
                  <div className="text-white font-bold text-lg">{product.origin}</div>
                </div>
              </div>
            </div>

            {/* Certifications List */}
            <div className="mb-6">
              <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#C6A664]" />
                Certifications & Qualité
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {product.certifications.map((cert, idx) => (
                  <div
                    key={idx}
                    className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 p-3 flex items-center gap-2"
                  >
                    <div className="w-2 h-2 bg-[#C6A664] rounded-full"></div>
                    <span className="text-white text-sm">{cert}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="backdrop-blur-xl bg-gradient-to-br from-[#C6A664]/30 to-[#C6A664]/10 rounded-3xl border border-[#C6A664]/30 p-6 mb-4">
              <div className="text-white/70 text-sm mb-1">Prix professionnel B2B</div>
              <div className="flex items-end gap-2">
                <div className="text-[#C6A664] font-extrabold text-5xl">
                  {product.price.toLocaleString()}
                </div>
                <div className="text-[#C6A664] text-xl mb-2">FCFA</div>
              </div>
              <div className="text-white/60 text-sm mt-1">par {product.unit}</div>
              <div className="mt-3 pt-3 border-t border-white/10">
                <div className="text-white/70 text-xs">Commande minimum: 100 unités</div>
              </div>
            </div>

            {/* Contact Hub Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full backdrop-blur-xl bg-white/10 border-2 border-white/20 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 mb-3 hover:bg-white/15 transition-all"
            >
              <Phone className="w-5 h-5" />
              Contacter le fabricant
            </motion.button>
          </motion.div>
        </div>

        {/* Bottom Actions - Fixed */}
        <div className="fixed bottom-0 left-0 right-0 px-6 py-6 backdrop-blur-xl bg-[#001F1A]/90 border-t border-white/10">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/paiement", { state: { product } })}
            className="w-full bg-[#C6A664] hover:bg-[#B89654] text-[#001F1A] py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-lg shadow-[#C6A664]/30 transition-all"
          >
            <ShoppingCart className="w-6 h-6" />
            Commander en gros
          </motion.button>
          
          <div className="text-center mt-3">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
              <ShieldCheck className="w-4 h-4 text-[#C6A664]" />
              <span className="text-white/70 text-xs">
                Transaction sécurisée ATC
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
