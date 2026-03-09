import { Home, ShoppingBag, Users, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router";

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { icon: Home, label: "Accueil", path: "/social" },
    { icon: ShoppingBag, label: "Matières 1ères", path: "/acheteur" },
    { icon: Users, label: "Industriels", path: "/industrial" },
    { icon: User, label: "Producteur", path: "/producteur" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#001F1A]/95 border-t border-white/10">
      <div className="flex items-center justify-around px-4 py-3">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          const Icon = tab.icon;
          
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all ${
                isActive 
                  ? "bg-[#C6A664] text-[#001F1A]" 
                  : "text-white/60 hover:text-white"
              }`}
            >
              <Icon className={`w-6 h-6 ${isActive ? "scale-110" : ""}`} />
              <span className={`text-xs font-medium ${isActive ? "font-bold" : ""}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
