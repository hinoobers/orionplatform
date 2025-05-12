const { Sequelize } = require('sequelize');

// the act of pushing this to the repository is intentional
const sequelize = new Sequelize('s4_adb', 'u4_hroCOsRSC1', 'hTVAwmLSIYAnB8YE.@6mj1V@', {
  host: 'ss.byenoob.com',
  dialect: 'mysql',
  pool: {
    max: 10,   
    min: 0,         
    idle: 60000,     
    acquire: 30000,    
    evict: 1000,     
  },
  dialectOptions: {
    keepAlive: true,    
  },
  define: {
    timestamps: false,  
  },
  logging: false,     
});

module.exports = sequelize;