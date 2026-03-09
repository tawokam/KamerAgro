import { useState } from "react";
import { ArrowLeft, Search, Filter, MapPin, BadgeCheck, UserPlus } from "lucide-react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { products } from "../data/mockData";
import BottomNav from "../components/BottomNav";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { toast } from "sonner";

export default function AcheteurCatalogue() {
  const navigate = useNavigate();
  const [selectedRegion, setSelectedRegion] = useState<string>("Toutes");
  const [selectedCategory, setSelectedCategory] = useState<string>("Toutes");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    nomEntreprise: "",
    nomContact: "",
    email: "",
    telephone: "",
    ville: "",
    typeActivite: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Compte créé avec succès ! Bienvenue sur KAMERAGRO", {
      description: "Vous pouvez maintenant passer vos commandes.",
    });
    setIsDialogOpen(false);
    setFormData({
      nomEntreprise: "",
      nomContact: "",
      email: "",
      telephone: "",
      ville: "",
      typeActivite: "",
    });
  };

  const regions = ["Toutes", "Ouest", "Centre", "Littoral", "Sud", "Nord", "Adamaoua"];
  const categories = ["Toutes", "Céréales", "Cacao", "Légumes", "Tubercules", "Fruits", "Oléagineux", "Élevage", "Pisciculture", "Aquaculture"];

  const filteredProducts = products.filter(product => {
    const matchesRegion = selectedRegion === "Toutes" || product.region === selectedRegion;
    const matchesCategory = selectedCategory === "Toutes" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.producer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#001F1A] relative overflow-hidden pb-24">
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
        {/* Header */}
        <div className="px-6 py-6 border-b border-white/10 backdrop-blur-xl bg-[#001F1A]/80 sticky top-0 z-20">
          <div className="flex items-center justify-between mb-4">
            <div className="text-xl font-bold text-white">Matières Premières Agro-Pastorales</div>
            <div className="flex items-center gap-2">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <button className="backdrop-blur-xl bg-[#C6A664] hover:bg-[#B89654] text-[#001F1A] px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg transition-all">
                    <UserPlus className="w-4 h-4" />
                    Créer un compte
                  </button>
                </DialogTrigger>
                <DialogContent className="bg-[#001F1A] border-[#C6A664]/30 text-white max-w-md max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-[#C6A664] flex items-center gap-2">
                      <UserPlus className="w-6 h-6" />
                      Créer un compte Acheteur
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div>
                      <Label htmlFor="nomEntreprise" className="text-white/80">Nom de l'entreprise / PME</Label>
                      <Input
                        id="nomEntreprise"
                        value={formData.nomEntreprise}
                        onChange={(e) => setFormData({ ...formData, nomEntreprise: e.target.value })}
                        className="bg-white/5 border-white/10 text-white mt-1"
                        placeholder="Ex: Restaurant Le Palmier"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="nomContact" className="text-white/80">Nom du contact</Label>
                      <Input
                        id="nomContact"
                        value={formData.nomContact}
                        onChange={(e) => setFormData({ ...formData, nomContact: e.target.value })}
                        className="bg-white/5 border-white/10 text-white mt-1"
                        placeholder="Ex: Marie Dupont"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-white/80">Email professionnel</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-white/5 border-white/10 text-white mt-1"
                        placeholder="contact@entreprise.cm"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="telephone" className="text-white/80">Téléphone</Label>
                      <Input
                        id="telephone"
                        type="tel"
                        value={formData.telephone}
                        onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                        className="bg-white/5 border-white/10 text-white mt-1"
                        placeholder="+237 6XX XXX XXX"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="ville" className="text-white/80">Ville</Label>
                      <Input
                        id="ville"
                        value={formData.ville}
                        onChange={(e) => setFormData({ ...formData, ville: e.target.value })}
                        className="bg-white/5 border-white/10 text-white mt-1"
                        placeholder="Ex: Douala"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="typeActivite" className="text-white/80">Type d'activité</Label>
                      <Input
                        id="typeActivite"
                        value={formData.typeActivite}
                        onChange={(e) => setFormData({ ...formData, typeActivite: e.target.value })}
                        className="bg-white/5 border-white/10 text-white mt-1"
                        placeholder="Ex: Restaurant, Hôtel, Transformation..."
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-[#C6A664] hover:bg-[#B89654] text-[#001F1A] font-bold py-6 mt-6"
                    >
                      Créer mon compte acheteur
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Search Bar - Glassmorphism */}
          <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-4 flex items-center gap-3">
            <Search className="w-5 h-5 text-white/60" />
            <input
              type="text"
              placeholder="Que recherchez-vous ?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-white placeholder:text-white/50 outline-none"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="px-6 py-4 space-y-3">
          {/* Region Filter */}
          <div>
            <div className="text-white/70 text-sm mb-2 font-light">Région</div>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {regions.map((region) => (
                <button
                  key={region}
                  onClick={() => setSelectedRegion(region)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    selectedRegion === region
                      ? "bg-[#C6A664] text-[#001F1A]"
                      : "backdrop-blur-xl bg-white/5 text-white border border-white/10 hover:bg-white/10"
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <div className="text-white/70 text-sm mb-2 font-light">Catégorie</div>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
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
        </div>

        {/* Results Count */}
        <div className="px-6 py-2">
          <div className="text-white/60 text-sm">
            {filteredProducts.length} produit{filteredProducts.length > 1 ? "s" : ""} disponible{filteredProducts.length > 1 ? "s" : ""}
          </div>
        </div>

        {/* Products Grid */}
        <div className="px-6 py-4 grid grid-cols-1 gap-4">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => navigate(`/produit/${product.id}`)}
              className="backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 overflow-hidden hover:bg-white/10 transition-all cursor-pointer group"
            >
              {/* Product Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#001F1A] via-transparent to-transparent" />
                
                {/* Verified Badge */}
                {product.verified && (
                  <div className="absolute top-4 right-4 bg-[#C6A664] px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                    <BadgeCheck className="w-4 h-4 text-[#001F1A]" />
                    <span className="text-[#001F1A] text-xs font-bold">ATC Vérifié</span>
                  </div>
                )}

                {/* Category Badge */}
                <div className="absolute top-4 left-4 backdrop-blur-xl bg-white/20 px-3 py-1 rounded-full">
                  <span className="text-white text-xs font-medium">{product.category}</span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-lg mb-1">{product.name}</h3>
                    <div className="flex items-center gap-1 text-white/60 text-sm">
                      <MapPin className="w-3 h-3" />
                      {product.location}, {product.region}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <div>
                    <div className="text-[#C6A664] font-extrabold text-2xl">
                      {product.price.toLocaleString()}
                      <span className="text-sm ml-1">FCFA</span>
                    </div>
                    <div className="text-white/60 text-xs">par {product.unit}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-medium">{product.quantity} disponibles</div>
                    <div className="text-white/60 text-xs">{product.producer}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-white/40 text-lg mb-2">Aucun produit trouvé</div>
            <div className="text-white/30 text-sm">Essayez de modifier vos filtres</div>
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