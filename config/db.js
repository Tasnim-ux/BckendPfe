
const mongoose = require("mongoose");

const connecttoMongoDB = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.Url_Mongo, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("✅ Connecté à MongoDB !");
    } catch (error) {
        console.error("❌ Erreur de connexion MongoDB :", error.message);
        process.exit(1); // ← optionnel, arrête le serveur si la connexion échoue
    }
};

module.exports = { connecttoMongoDB };
//boubakertasnim48
//PFqxAPMN4otEmiJH
