import { useState } from "react";
import { Heart, MessageCircle, Share2, BadgeCheck, MapPin, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { socialPosts } from "../data/mockData";
import BottomNav from "../components/BottomNav";

export default function SocialFeed() {
  const navigate = useNavigate();
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());

  const toggleLike = (postId: number) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const getPostTypeColor = (type: string) => {
    switch (type) {
      case "success_story": return "bg-green-500/20 text-green-400 border-green-400/30";
      case "restaurant": return "bg-orange-500/20 text-orange-400 border-orange-400/30";
      case "tourism": return "bg-blue-500/20 text-blue-400 border-blue-400/30";
      case "entrepreneur": return "bg-[#C6A664]/20 text-[#C6A664] border-[#C6A664]/30";
      default: return "bg-white/20 text-white border-white/30";
    }
  };

  const getPostTypeLabel = (type: string) => {
    switch (type) {
      case "success_story": return "Success Story";
      case "restaurant": return "Restaurant";
      case "tourism": return "Tourisme";
      case "entrepreneur": return "Entrepreneur";
      case "marketplace": return "Marché";
      default: return "Post";
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
        <div className="px-6 py-6 border-b border-white/10 backdrop-blur-xl bg-[#001F1A]/80 sticky top-0 z-20">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-extrabold text-white">KAMERAGRO</h1>
              <p className="text-[#C6A664] text-sm font-light">Wall Social</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 border border-green-400/30">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-green-400 text-sm font-medium">En direct</span>
            </div>
          </div>
        </div>

        {/* Social Feed */}
        <div className="px-4 py-6 space-y-6">
          <AnimatePresence>
            {socialPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 overflow-hidden hover:bg-white/10 transition-all"
              >
                {/* Post Header */}
                <div className="p-5 pb-3">
                  <div className="flex items-start gap-3 mb-3">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-14 h-14 rounded-full object-cover ring-2 ring-[#C6A664]/50"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-white font-bold">{post.author.name}</h3>
                        {post.author.verified && (
                          <BadgeCheck className="w-5 h-5 text-[#C6A664]" />
                        )}
                      </div>
                      <p className="text-white/60 text-sm mb-1">{post.author.role}</p>
                      <div className="flex items-center gap-2 text-white/40 text-xs">
                        <MapPin className="w-3 h-3" />
                        {post.location}
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getPostTypeColor(post.type)}`}>
                      {getPostTypeLabel(post.type)}
                    </div>
                  </div>

                  {/* Post Content */}
                  <p className="text-white leading-relaxed mb-3">
                    {post.content}
                  </p>
                </div>

                {/* Post Image */}
                <div className="relative">
                  <img
                    src={post.image}
                    alt={post.content}
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#001F1A]/60 via-transparent to-transparent" />
                </div>

                {/* Post Actions */}
                <div className="p-5 pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-6">
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleLike(post.id)}
                        className="flex items-center gap-2 group"
                      >
                        <Heart
                          className={`w-6 h-6 transition-all ${
                            likedPosts.has(post.id)
                              ? "fill-red-500 text-red-500"
                              : "text-white/60 group-hover:text-red-400"
                          }`}
                        />
                        <span className={`text-sm font-medium ${
                          likedPosts.has(post.id) ? "text-red-500" : "text-white/60"
                        }`}>
                          {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
                        </span>
                      </motion.button>

                      <button className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
                        <MessageCircle className="w-6 h-6" />
                        <span className="text-sm font-medium">{post.comments}</span>
                      </button>

                      <button className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
                        <Share2 className="w-6 h-6" />
                        <span className="text-sm font-medium">{post.shares}</span>
                      </button>
                    </div>

                    <div className="text-white/40 text-xs">
                      {new Date(post.date).toLocaleDateString('fr-FR', { 
                        day: 'numeric', 
                        month: 'short' 
                      })}
                    </div>
                  </div>

                  {/* Engagement Bar */}
                  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(post.likes / 500) * 100}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="h-full bg-gradient-to-r from-[#C6A664] to-green-400"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Floating Action Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-24 right-6 w-16 h-16 bg-[#C6A664] rounded-full flex items-center justify-center shadow-2xl shadow-[#C6A664]/50 z-30"
        >
          <span className="text-[#001F1A] text-3xl font-light">+</span>
        </motion.button>
      </div>

      <BottomNav />
    </div>
  );
}
