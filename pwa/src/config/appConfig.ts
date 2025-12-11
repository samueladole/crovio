// App configuration settings
// Set this to true to show the Coming Soon page and block all other routes
export const APP_CONFIG = {
  isComingSoonMode: process.env.NODE_ENV === 'development' ? false : true, // Change to true to enable Coming Soon mode
};
