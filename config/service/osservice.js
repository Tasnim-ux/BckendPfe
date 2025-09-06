const os = require('os');


module.exports.getData = async (req,res)=>{
      try {
           const osInformation = {
               hostname: os.hostname(),
               platform: os.platform(),
               type: os.type(),
               release: os.release()
           };
           return osInformation
       } catch (error) {
           res.status(500).json({ message: error.message });
       }}