const cloudinary = require("cloudinary").v2;

    cloudinary.config({ 
        cloud_name: 'dh549anka', 
        api_key: '935189298935591', 
        api_secret: 'aqOgo9K1Dzw-hJAWbnPgeAOMQwc'
    });
    
    
    module.exports = cloudinary