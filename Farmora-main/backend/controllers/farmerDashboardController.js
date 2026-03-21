const FarmerProfile = require('../models/FarmerProfile');
const MarketPrice = require('../models/MarketPrice');
const RiskAlert = require('../models/RiskAlert');
const Scheme = require('../models/Scheme');
const CommunityPost = require('../models/CommunityPost');
const Analysis = require('../models/Analysis');
const User = require('../models/User');
const Product = require('../models/Product');

exports.getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch all data in parallel for performance
    const [user, profile, marketPrices, schemes, communityPosts, riskAlerts, analyses] = await Promise.all([
      User.findById(userId).select('name email role'),
      FarmerProfile.findOne({ user: userId }),
      MarketPrice.find().sort({ date: -1 }).limit(5),
      Scheme.find().limit(5),
      CommunityPost.find().populate('user', 'name').sort({ createdAt: -1 }).limit(5),
      RiskAlert.find({ active: true }).sort({ createdAt: -1 }).limit(5),
      Analysis.find({ user: userId }).sort({ createdAt: -1 }).limit(5)
    ]);

    // Count active listings and pending orders from Products
    const [activeListingsCount, pendingOrdersCount] = await Promise.all([
      Product.countDocuments({ seller: userId }),
      Product.countDocuments({ seller: userId, status: 'pending' })
    ]);

    // Build stats array matching frontend structure
    const stats = [
      {
        label: 'farmSize',
        value: profile ? `${profile.farmSize} Acres` : '0 Acres',
        icon: 'Grid',
        color: 'emerald'
      },
      {
        label: 'currentCrop',
        value: profile ? profile.currentCrop : 'Not set',
        icon: 'Sprout',
        color: 'amber'
      },
      {
        label: 'weather',
        value: profile ? `${profile.weather.temperature}°C / ${profile.weather.humidity}%` : 'N/A',
        icon: 'CloudRain',
        color: 'blue'
      },
      {
        label: 'nextIrrigation',
        value: profile && profile.irrigationSchedule.nextDate
          ? `In ${Math.max(0, Math.ceil((new Date(profile.irrigationSchedule.nextDate) - new Date()) / (1000 * 60 * 60 * 24)))} Days`
          : 'Not scheduled',
        icon: 'Droplets',
        color: 'cyan'
      }
    ];

    // Build market trends
    const marketTrends = marketPrices.map(mp => ({
      label: mp.cropName,
      price: `₹${mp.price} / ${mp.unit}`,
      trend: mp.trend
    }));

    // Build schemes
    const schemesData = schemes.map(s => ({
      title: s.title,
      dept: s.dept || 'Government',
      status: s.status || 'Eligible'
    }));

    // Build community posts
    const communityData = communityPosts.map(p => ({
      user: p.user ? p.user.name : 'Anonymous',
      action: 'posted',
      time: getTimeAgo(p.createdAt),
      preview: p.content ? p.content.substring(0, 100) : ''
    }));

    // Build risk alerts
    const alertsData = riskAlerts.map(a => ({
      type: a.type,
      title: a.title,
      description: a.description,
      severity: a.severity,
      icon: a.icon || 'AlertTriangle'
    }));

    // Build AI insights
    const aiInsights = {
      optimalSowing: profile && profile.aiInsights ? {
        description: profile.aiInsights.optimalSowing.description,
        progress: profile.aiInsights.optimalSowing.progress
      } : null,
      fertilizerEfficiency: profile && profile.aiInsights ? {
        description: profile.aiInsights.fertilizerEfficiency.description,
        progress: profile.aiInsights.fertilizerEfficiency.progress
      } : null
    };

    // Build sales snapshot
    const salesSnapshot = {
      totalEarnings: profile ? profile.totalEarnings : 0,
      activeListings: profile ? profile.activeListings || activeListingsCount : 0,
      pendingOrders: profile ? profile.pendingOrders || pendingOrdersCount : 0
    };

    res.json({
      user: {
        name: user ? user.name : 'Farmer',
        email: user ? user.email : '',
        role: user ? user.role : 'farmer'
      },
      stats,
      marketTrends,
      schemes: schemesData,
      communityPosts: communityData,
      riskAlerts: alertsData,
      aiInsights,
      salesSnapshot
    });

  } catch (err) {
    console.error('Dashboard fetch error:', err);
    res.status(500).json({ message: err.message });
  }
};

// Helper: get relative time string
function getTimeAgo(date) {
  const now = new Date();
  const diffMs = now - new Date(date);
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}
