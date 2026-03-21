import React from "react";
import { Users, TrendingUp, MessageSquare, Image as ImageIcon, Heart, Share2, Plus, Search, Filter, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const FarmerCommunity = () => {
  const posts = [
    {
      author: "Ramesh Meher",
      role: "Cotton Farmer",
      time: "2 hours ago",
      content: "Does anyone know the best treatment for pink bollworm? Seeing some activity in my 5-acre field.",
      tags: ["#PestControl", "#Cotton"],
      likes: 24,
      comments: 12,
      delay: 0.1
    },
    {
      author: "Sujata Pradhan",
      role: "Organic Farmer",
      time: "4 hours ago",
      content: "Successfully implemented drip irrigation today! The flow is much better than traditional methods.",
      image: "https://images.unsplash.com/photo-1592982537447-6f2a6a0c3023?auto=format&fit=crop&q=80&w=800",
      tags: ["#Irrigation", "#SuccessStory"],
      likes: 56,
      comments: 8,
      delay: 0.2
    }
  ];

  return (
    <div className="p-4 md:p-10 space-y-8 pb-20 max-w-5xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Farmer Community</h1>
          <p className="text-slate-500 font-medium italic">Share knowledge, photos, and tips with local farmers</p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-emerald-600 text-white px-8 py-3 rounded-2xl font-black flex items-center justify-center gap-2 shadow-lg shadow-emerald-200"
        >
          <Plus size={20} />
          Create Post
        </motion.button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* POSTS FEED */}
        <div className="lg:col-span-2 space-y-6">
           <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600">
                 <Users size={24} />
              </div>
              <input type="text" placeholder="What's on your mind, Ramesh?" className="flex-1 bg-slate-100/50 border-none rounded-2xl px-6 py-3 font-medium outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500/20 transition-all" />
              <button className="p-3 text-slate-400 hover:text-emerald-600 transition-colors">
                <ImageIcon size={22} />
              </button>
           </div>

           <div className="space-y-6">
              {posts.map((post, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: post.delay }}
                  className="bg-white/70 backdrop-blur-xl border border-slate-200 rounded-[2.5rem] shadow-sm overflow-hidden"
                >
                   <div className="p-6 md:p-8 space-y-4">
                      <div className="flex items-center justify-between">
                         <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-slate-200 overflow-hidden">
                               <img src={`https://ui-avatars.com/api/?name=${post.author.replace(' ', '+')}&background=random`} alt={post.author} />
                            </div>
                            <div>
                               <h4 className="font-black text-slate-900">{post.author}</h4>
                               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{post.role} • {post.time}</p>
                            </div>
                         </div>
                      </div>
                      
                      <p className="text-slate-700 font-medium leading-relaxed">{post.content}</p>
                      
                      {post.image && (
                        <div className="rounded-3xl overflow-hidden border border-slate-100 max-h-[400px]">
                           <img src={post.image} alt="Post content" className="w-full h-full object-cover" />
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2">
                         {post.tags.map((tag, j) => (
                           <span key={j} className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-black">{tag}</span>
                         ))}
                      </div>
                      
                      <div className="pt-4 border-t border-slate-100 flex items-center gap-6">
                         <button className="flex items-center gap-2 text-slate-500 font-black text-sm hover:text-red-500 transition-colors">
                            <Heart size={20} /> {post.likes}
                         </button>
                         <button className="flex items-center gap-2 text-slate-500 font-black text-sm hover:text-blue-500 transition-colors">
                            <MessageSquare size={20} /> {post.comments}
                         </button>
                         <button className="flex items-center gap-2 text-slate-500 font-black text-sm hover:text-emerald-500 transition-colors">
                            <Share2 size={20} /> Share
                         </button>
                      </div>
                   </div>
                </motion.div>
              ))}
           </div>
        </div>

        {/* TRENDING SIDEBAR */}
        <div className="space-y-8">
           <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <TrendingUp className="text-emerald-600" size={24} />
                Trending Discussions
              </h3>
              <div className="space-y-4">
                 {["Pest Alert in Bargarh", "Organic Rice Market", "Monsoon Sowing Dates", "Drip Irrigation Subsidy"].map((topic, i) => (
                   <div key={i} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-2xl cursor-pointer group transition-colors">
                      <span className="font-bold text-slate-600 group-hover:text-emerald-700 transition-colors">#{topic.replace(/ /g, '')}</span>
                      <ArrowRight size={16} className="text-slate-300 group-hover:text-emerald-600" />
                   </div>
                 ))}
              </div>
           </div>

           <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-xl font-black text-slate-900">Featured Farmers</h3>
              <div className="space-y-4">
                 {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-center justify-between">
                       <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200" />
                          <div>
                            <p className="text-sm font-black">Farmer {i}</p>
                            <p className="text-[10px] font-bold text-slate-400">Paddy Specialist</p>
                          </div>
                       </div>
                       <button className="text-xs font-black text-emerald-600 px-4 py-2 bg-emerald-50 rounded-xl">Follow</button>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerCommunity;
