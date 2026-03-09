import { useState } from "react";
import { ArrowLeft, ShoppingCart, Shield, CheckCircle, CreditCard } from "lucide-react";
import { useNavigate, useLocation } from "react-router";
import { motion } from "motion/react";

export default function Paiement() {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product;
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<"orange" | "mtn" | null>(null);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#001F1A] flex items-center justify-center">
        <div className="text-white">Aucun produit sélectionné</div>
      </div>
    );
  }

  const deliveryFee = 5000;
  const subtotal = product.price * quantity;
  const total = subtotal + deliveryFee;

  const handlePayment = () => {
    // Mock payment process
    alert(`Paiement de ${total.toLocaleString()} FCFA via ${paymentMethod === "orange" ? "Orange Money" : "MTN Mobile Money"} en cours...`);
  };

  return (
    <div className="min-h-screen bg-[#001F1A] relative overflow-hidden pb-32">
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
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="text-white/80 hover:text-white">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <div className="text-xl font-bold text-white">Paiement</div>
              <div className="text-xs text-white/60">Sécurisé par ATC</div>
            </div>
          </div>
        </div>

        <div className="px-6 py-6 space-y-6">
          {/* Cart Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <ShoppingCart className="w-5 h-5 text-[#C6A664]" />
              <h2 className="text-xl font-bold text-white">Récapitulatif</h2>
            </div>

            {/* Product Item */}
            <div className="flex gap-4 mb-6">
              <img
                src={product.image}
                alt={product.name}
                className="w-20 h-20 rounded-2xl object-cover"
              />
              <div className="flex-1">
                <div className="text-white font-semibold mb-1">{product.name}</div>
                <div className="text-white/60 text-sm mb-2">{product.producer}</div>
                <div className="text-[#C6A664] font-bold">
                  {product.price.toLocaleString()} FCFA / {product.unit}
                </div>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-4 mb-4">
              <div className="text-white/70 text-sm mb-3">Quantité</div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all"
                >
                  -
                </button>
                <div className="flex-1 text-center">
                  <div className="text-white font-bold text-2xl">{quantity}</div>
                  <div className="text-white/60 text-xs">{product.unit}</div>
                </div>
                <button
                  onClick={() => setQuantity(Math.min(product.quantity, quantity + 1))}
                  className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all"
                >
                  +
                </button>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <div className="flex justify-between text-white/70">
                <span>Sous-total</span>
                <span>{subtotal.toLocaleString()} FCFA</span>
              </div>
              <div className="flex justify-between text-white/70">
                <span>Frais de livraison ATC</span>
                <span>{deliveryFee.toLocaleString()} FCFA</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-white/10">
                <span className="text-white font-bold text-lg">Total</span>
                <span className="text-[#C6A664] font-extrabold text-2xl">
                  {total.toLocaleString()} FCFA
                </span>
              </div>
            </div>
          </motion.div>

          {/* Payment Methods */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <CreditCard className="w-5 h-5 text-[#C6A664]" />
              <h2 className="text-xl font-bold text-white">Méthode de paiement</h2>
            </div>

            <div className="space-y-3">
              {/* Orange Money */}
              <button
                onClick={() => setPaymentMethod("orange")}
                className={`w-full p-4 rounded-2xl border-2 transition-all ${
                  paymentMethod === "orange"
                    ? "border-[#C6A664] bg-[#C6A664]/10"
                    : "border-white/20 bg-white/5 hover:bg-white/10"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-orange-500 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">OM</span>
                    </div>
                    <div className="text-left">
                      <div className="text-white font-semibold">Orange Money</div>
                      <div className="text-white/60 text-xs">Paiement mobile</div>
                    </div>
                  </div>
                  {paymentMethod === "orange" && (
                    <CheckCircle className="w-6 h-6 text-[#C6A664]" />
                  )}
                </div>
              </button>

              {/* MTN Mobile Money */}
              <button
                onClick={() => setPaymentMethod("mtn")}
                className={`w-full p-4 rounded-2xl border-2 transition-all ${
                  paymentMethod === "mtn"
                    ? "border-[#C6A664] bg-[#C6A664]/10"
                    : "border-white/20 bg-white/5 hover:bg-white/10"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-yellow-400 flex items-center justify-center">
                      <span className="text-black font-bold text-lg">MM</span>
                    </div>
                    <div className="text-left">
                      <div className="text-white font-semibold">MTN Mobile Money</div>
                      <div className="text-white/60 text-xs">Paiement mobile</div>
                    </div>
                  </div>
                  {paymentMethod === "mtn" && (
                    <CheckCircle className="w-6 h-6 text-[#C6A664]" />
                  )}
                </div>
              </button>
            </div>
          </motion.div>

          {/* Security Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="backdrop-blur-xl bg-[#C6A664]/10 rounded-3xl border border-[#C6A664]/30 p-6"
          >
            <div className="flex items-start gap-3">
              <Shield className="w-6 h-6 text-[#C6A664] flex-shrink-0 mt-1" />
              <div>
                <div className="text-white font-semibold mb-2">
                  Garantie de sécurité ATC
                </div>
                <p className="text-white/70 text-sm leading-relaxed">
                  Votre argent est sécurisé par ATC et ne sera versé au vendeur 
                  qu'après confirmation de la réception de votre commande.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 px-6 py-6 backdrop-blur-xl bg-[#001F1A]/90 border-t border-white/10">
        <motion.button
          whileHover={{ scale: paymentMethod ? 1.02 : 1 }}
          whileTap={{ scale: paymentMethod ? 0.98 : 1 }}
          onClick={handlePayment}
          disabled={!paymentMethod}
          className={`w-full py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-lg transition-all ${
            paymentMethod
              ? "bg-[#C6A664] hover:bg-[#B89654] text-[#001F1A] shadow-[#C6A664]/30"
              : "bg-white/10 text-white/40 cursor-not-allowed"
          }`}
        >
          <CheckCircle className="w-6 h-6" />
          Confirmer le paiement
        </motion.button>
      </div>
    </div>
  );
}
