// next.config.js                                                     
const nextConfig = {                                                  
    images: {                                                           
      domains: ['images.unsplash.com', 'placehold.co', 'localhost', 'wohnungstausch.codeium.com'],                 
      dangerouslyAllowSVG: true, // Erlaube das Laden von SVG-Bildern   
      deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
      imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
      formats: ['image/webp'],
    },                                                                  
  };                                                                    
                                                                        
  module.exports = nextConfig;  