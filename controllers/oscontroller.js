const os = require('os');

module.exports.getOsInformation = async (req, res) => {
    try {
        const osInformation = {
            hostname: os.hostname(),
            platform: os.platform(),
            type: os.type(),
            release: os.release()
        };
        res.status(200).json(osInformation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};