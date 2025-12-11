// App configuration settings
// Set this to true to show the Coming Soon page and block all other routes
export const APP_CONFIG = {
  isComingSoonMode: process.env.NODE_ENV === 'development' ? false : true, // Change to true to enable Coming Soon mode
};

// Application route paths configuration
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  ABOUT: '/about',
  PRICES: '/prices',
  SET_PRICE_ALERT: '/set-price-alert',
  MARKETPLACE: '/marketplace',
  COMMUNITY: '/community',
  COMMUNITY_DISCUSSION: '/community/discussion',
  COMMUNITY_CHATS: '/community/chats',
  AI_ASSISTANT: '/ai-assistant',
  ADMIN: '/admin',
  ADMIN_DEALERS: '/admin/dealers',
  ADMIN_PRODUCTS: '/admin/products',
  ADMIN_PRICES: '/admin/prices',
  ADMIN_DISCUSSIONS: '/admin/discussions',
  ADMIN_ANALYTICS: '/admin/analytics',
  TOOLS_DISEASE_DETECTION: '/tools/disease-detection',
  TOOLS_SOIL_ANALYSIS: '/tools/soil-analysis',
  TOOLS_PLANTING_SCHEDULE: '/tools/planting-schedule',
  TOOLS_IRRIGATION_GUIDE: '/tools/irrigation-guide',
}