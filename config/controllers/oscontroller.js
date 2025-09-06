const osservice = require('../service/osservice');

module.exports.getOsInformation = async (req,res)=>{
      try {
           const osInformation = await osservice.getData()
         
           res.status(200).json({osInformation});
       } catch (error) {
           res.status(500).json({ message: error.message });
       }}