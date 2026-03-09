import { ArrowLeft, Plus, TrendingUp, Package, Clock, CheckCircle, UserPlus } from "lucide-react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { sales } from "../data/mockData";
import BottomNav from "../components/BottomNav";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
import { useState } from "react";

export default function ProducteurDashboard() {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    nomProducteur: "",
    typeProduction: "",
    email: "",
    telephone: "",
    region: "",
    superficie: "",
  });

  const totalSales = sales.reduce((sum, sale) => sum + sale.amount, 0);
  const pendingSales = sales.filter(s => s.status === "En attente de collecte").length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Compte producteur agro-pastoral créé avec succès !", {
      description: "Vous pouvez maintenant publier vos produits (agriculture, élevage, pisciculture, aquaculture).",
    });
    setIsDialogOpen(false);
    setFormData({
      nomProducteur: "",
      typeProduction: "",
      email: "",
      telephone: "",
      region: "",
      superficie: "",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Livré": return "text-green-400 bg-green-400/10 border-green-400/30";
      case "En transit": return "text-blue-400 bg-blue-400/10 border-blue-400/30";
      case "En attente de collecte": return "text-[#C6A664] bg-[#C6A664]/10 border-[#C6A664]/30";
      default: return "text-gray-400 bg-gray-400/10 border-gray-400/30";
    }
  };

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
        <div className="px-6 py-6 border-b border-white/10">
          <div className="flex items-center justify-between mb-6">
            <div className="w-6" />
            <div className="text-center">
              <div className="text-xl font-bold text-white">Dashboard Producteur Agro-Pastoral</div>
              <div className="text-xs text-[#C6A664]">Bienvenue, Jean Kamga</div>
            </div>
            <div className="w-6" />
          </div>

          {/* Bouton Créer un compte */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <button className="w-full backdrop-blur-xl bg-white/10 hover:bg-white/15 border-2 border-[#C6A664] text-white py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all mt-4">
                <UserPlus className="w-5 h-5" />
                Créer un nouveau compte producteur agro-pastoral
              </button>
            </DialogTrigger>
            <DialogContent className="bg-[#001F1A] border-[#C6A664]/30 text-white max-w-md max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-[#C6A664] flex items-center gap-2">
                  <UserPlus className="w-6 h-6" />
                  Créer un compte Producteur Agro-Pastoral
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="nomProducteur" className="text-white/80">Nom / Coopérative</Label>
                  <Input
                    id="nomProducteur"
                    value={formData.nomProducteur}
                    onChange={(e) => setFormData({ ...formData, nomProducteur: e.target.value })}
                    className="bg-white/5 border-white/10 text-white mt-1"
                    placeholder="Ex: Coopérative AGROTECH"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="typeProduction" className="text-white/80">Type de production agro-pastorale</Label>
                  <Input
                    id="typeProduction"
                    value={formData.typeProduction}
                    onChange={(e) => setFormData({ ...formData, typeProduction: e.target.value })}
                    className="bg-white/5 border-white/10 text-white mt-1"
                    placeholder="Ex: Maïs, Élevage bovin, Pisciculture, Aquaculture..."
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-white/80">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-white/5 border-white/10 text-white mt-1"
                    placeholder="contact@producteur.cm"
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
                  <Label htmlFor="region" className="text-white/80">Région</Label>
                  <Input
                    id="region"
                    value={formData.region}
                    onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                    className="bg-white/5 border-white/10 text-white mt-1"
                    placeholder="Ex: Ouest, Centre, Littoral..."
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="superficie" className="text-white/80">Superficie / Capacité de production</Label>
                  <Input
                    id="superficie"
                    value={formData.superficie}
                    onChange={(e) => setFormData({ ...formData, superficie: e.target.value })}
                    className="bg-white/5 border-white/10 text-white mt-1"
                    placeholder="Ex: 5 hectares, 100 têtes, 10 bassins..."
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[#C6A664] hover:bg-[#B89654] text-[#001F1A] font-bold py-6 mt-6"
                >
                  Créer mon compte producteur agro-pastoral
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Balance Card - Glassmorphism */}
        <div className="px-6 py-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="backdrop-blur-xl bg-gradient-to-br from-[#C6A664]/20 to-[#C6A664]/5 rounded-3xl border border-[#C6A664]/30 p-8 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="text-white/70 text-sm font-light">Mon solde total</div>
              <TrendingUp className="w-5 h-5 text-[#C6A664]" />
            </div>
            <div className="text-5xl font-extrabold text-white mb-1">
              {totalSales.toLocaleString()}
              <span className="text-2xl ml-2 text-[#C6A664]">FCFA</span>
            </div>
            <div className="text-green-400 text-sm font-medium">
              +15% ce mois-ci
            </div>
          </motion.div>
        </div>

        {/* Quick Stats */}
        <div className="px-6 grid grid-cols-2 gap-4 mb-6">
          <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-[#C6A664]/20 rounded-xl flex items-center justify-center">
                <Package className="w-5 h-5 text-[#C6A664]" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{sales.length}</div>
                <div className="text-white/60 text-xs">Ventes totales</div>
              </div>
            </div>
          </div>

          <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center">
                <Clock className="w-5 h-5 text-orange-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{pendingSales}</div>
                <div className="text-white/60 text-xs">En attente</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Action Button */}
        <div className="px-6 mb-8">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-[#C6A664] hover:bg-[#B89654] text-[#001F1A] py-6 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-lg shadow-[#C6A664]/30 transition-all"
          >
            <Plus className="w-6 h-6" />
            Publier une nouvelle récolte
          </motion.button>
        </div>

        {/* Sales List */}
        <div className="px-6 pb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Mes ventes</h2>
            <button className="text-[#C6A664] text-sm font-medium">Voir tout</button>
          </div>

          <div className="space-y-3">
            {sales.map((sale, index) => (
              <motion.div
                key={sale.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-5 hover:bg-white/10 transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-white font-semibold text-lg mb-1">{sale.product}</div>
                    <div className="text-white/60 text-sm">{sale.quantity}</div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(sale.status)}`}>
                    {sale.status === "Livré" && <CheckCircle className="w-3 h-3 inline mr-1" />}
                    {sale.status}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <div className="text-white/60 text-sm">{sale.buyer}</div>
                  <div className="text-[#C6A664] font-bold">
                    {sale.amount.toLocaleString()} FCFA
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Trust Badge */}
        <div className="px-6 pb-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C6A664]/10 border border-[#C6A664]/30">
            <CheckCircle className="w-4 h-4 text-[#C6A664]" />
            <span className="text-[#C6A664] text-sm font-medium">
              Profil vérifié ATC
            </span>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}