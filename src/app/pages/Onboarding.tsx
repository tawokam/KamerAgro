import { useNavigate } from "react-router";
import { Sprout, ShoppingCart, TrendingUp, Package, BadgeCheck, MapPin, Download } from "lucide-react";
import { motion } from "motion/react";
import { products } from "../data/mockData";

import logo from "../../assets/logo1.jpeg";

export default function Onboarding() {
  const navigate = useNavigate();


  const isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);

  // Produits les plus vendus (top 4)
  const topProducts = products.slice(0, 4);

  return (
    <div className="min-h-screen bg-[#001F1A] relative overflow-hidden">
      {/* African Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="african-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M50 0 L100 50 L50 100 L0 50 Z" fill="none" stroke="#C6A664" strokeWidth="0.5" />
              <circle cx="50" cy="50" r="10" fill="none" stroke="#C6A664" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#african-pattern)" />
        </svg>
      </div>

      {/* Hero Image with Overlay */}
      <div className="relative h-[60vh]">
        <img
          src={logo}
          alt="Producteur agro-pastoral camerounais"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#001F1A]/50 to-[#001F1A]" />
        
        {/* Logo */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute top-8 left-8 z-10"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#C6A664] rounded-xl flex items-center justify-center">
              <Sprout className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-white tracking-tight">KamerAgro</div>
              <div className="text-xs text-[#C6A692] font-light tracking-widest">by ATC</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Content Section */}
      <div className="relative z-10 px-6 -mt-60 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Glassmorphism Card */}
          <div >
            <div className="text-center lg:text-left max-w-2xl">
              
              <h1 className="text-4xl font-extrabold text-white mb-4 leading-tight">
                La technologie au service de notre terre
              </h1>

              <p className="text-white/70 text-lg font-light leading-relaxed">
                KamerAgro connecte les producteurs aux acheteurs pour une agriculture moderne,
                transparente et rentable.
              </p>

              {/* Boutons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-6 justify-center lg:justify-start">

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate("/social")}
                  className="bg-[#C6A664] hover:bg-[#B89654] text-[#001F1A] px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <Sprout className="w-5 h-5" />
                  Producteur
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate("/acheteur")}
                  className="backdrop-blur-xl bg-white/10 hover:bg-white/15 border border-[#C6A664] text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Acheteur / PME
                </motion.button>
              </div>
              {!isMobile && (
                <div className="flex mt-6 justify-center lg:justify-start">
                  <motion.a
                    href="/download/kameragro.apk"
                    download
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="backdrop-blur-xl bg-white/10 hover:bg-white/15 border border-[#C6A664] text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <Download className="w-5 h-5" />
                    Télécharger l'application
                  </motion.a>
                </div>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            {[
              { value: "200K+", label: "Producteurs Agro-Pastoraux" },
              { value: "5K+", label: "PME" },
              { value: "100M+", label: "FCFA échangés" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-4 text-center"
              >
                <div className="text-2xl font-extrabold text-[#C6A664]">{stat.value}</div>
                <div className="text-white/60 text-xs mt-1 font-light">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Aperçu des menus */}
          <div className="mt-12 space-y-6">
            {/* Menu Acheteur */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#C6A664]/20 rounded-xl flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5 text-[#C6A664]" />
                </div>
                <h3 className="text-xl font-bold text-white">Espace Acheteur</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 p-3">
                  <div className="text-white/70 text-xs mb-1">Fonctionnalité</div>
                  <div className="text-white font-medium text-sm">Marché Agro-Pastoral</div>
                </div>
                <div className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 p-3">
                  <div className="text-white/70 text-xs mb-1">Fonctionnalité</div>
                  <div className="text-white font-medium text-sm">Filtres Avancés</div>
                </div>
                <div className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 p-3">
                  <div className="text-white/70 text-xs mb-1">Fonctionnalité</div>
                  <div className="text-white font-medium text-sm">Produits Certifiés</div>
                </div>
                <div className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 p-3">
                  <div className="text-white/70 text-xs mb-1">Fonctionnalité</div>
                  <div className="text-white font-medium text-sm">Livraison Rapide</div>
                </div>
              </div>
            </motion.div>

            {/* Menu Producteur */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#C6A664]/20 rounded-xl flex items-center justify-center">
                  <Sprout className="w-5 h-5 text-[#C6A664]" />
                </div>
                <h3 className="text-xl font-bold text-white">Espace Producteur Agro-Pastoral</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 p-3">
                  <div className="text-white/70 text-xs mb-1">Fonctionnalité</div>
                  <div className="text-white font-medium text-sm">Dashboard Pro</div>
                </div>
                <div className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 p-3">
                  <div className="text-white/70 text-xs mb-1">Fonctionnalité</div>
                  <div className="text-white font-medium text-sm">Suivi des Ventes</div>
                </div>
                <div className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 p-3">
                  <div className="text-white/70 text-xs mb-1">Fonctionnalité</div>
                  <div className="text-white font-medium text-sm">Certification ATC</div>
                </div>
                <div className="backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 p-3">
                  <div className="text-white/70 text-xs mb-1">Fonctionnalité</div>
                  <div className="text-white font-medium text-sm">Analytiques</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Section Produits Populaires */}
          <div className="mt-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-extrabold text-white">Produits les plus vendus</h2>
                <TrendingUp className="w-6 h-6 text-[#C6A664]" />
              </div>

              <div className="grid grid-cols-1 gap-4">
                {topProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 + index * 0.1 }}
                    onClick={() => navigate("/acheteur")}
                    className="backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 overflow-hidden hover:bg-white/10 transition-all cursor-pointer group"
                  >
                    {/* Product Image */}
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#001F1A] via-transparent to-transparent" />
                      
                      {/* Verified Badge */}
                      {product.verified && (
                        <div className="absolute top-3 right-3 bg-[#C6A664] px-2 py-1 rounded-full flex items-center gap-1 shadow-lg">
                          <BadgeCheck className="w-3 h-3 text-[#001F1A]" />
                          <span className="text-[#001F1A] text-xs font-bold">ATC</span>
                        </div>
                      )}

                      {/* Category Badge */}
                      <div className="absolute top-3 left-3 backdrop-blur-xl bg-white/20 px-3 py-1 rounded-full">
                        <span className="text-white text-xs font-medium">{product.category}</span>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <h3 className="text-white font-bold text-lg mb-2">{product.name}</h3>
                      <div className="flex items-center gap-1 text-white/60 text-sm mb-3">
                        <MapPin className="w-3 h-3" />
                        {product.location}, {product.region}
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-white/10">
                        <div>
                          <div className="text-[#C6A664] font-extrabold text-xl">
                            {product.price.toLocaleString()}
                            <span className="text-sm ml-1">FCFA</span>
                          </div>
                          <div className="text-white/60 text-xs">par {product.unit}</div>
                        </div>
                        <div className="backdrop-blur-xl bg-[#C6A664]/20 px-3 py-1 rounded-full">
                          <span className="text-[#C6A664] font-bold text-sm">
                            <Package className="w-3 h-3 inline mr-1" />
                            {product.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/acheteur")}
                className="w-full mt-6 backdrop-blur-xl bg-white/10 hover:bg-white/15 border-2 border-[#C6A664] text-white py-4 rounded-2xl font-bold text-base transition-all"
              >
                Voir tout le catalogue
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}