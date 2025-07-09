const fs = require('fs');
const path = require('path')
const download = async (req, res) =>{
    try {
        if (req.query.type !== 'existing' && req.query.type !== 'existing2') {
            return res.status(400).json({
                status: "error",
                message: "Invalid download type"
            });
        }

        // 3. File Handling
        let filePath;
        if (req.query.type === 'existing'){
            filePath = path.join(__dirname, '../assets/HFA AREARS-INV-PREVIEW-ACC-3046416-28749-19[1].pdf');
        }else if(req.query.type === 'existing2'){
            filePath = path.join(__dirname, '../assets/YEARLY-INV-PREVIEW-ACC-3046416-28749-19[1].pdf');
        }else{
            return res.status(400).json({
                status: "error",
                message: "Invalid file type specified"
            });
        }
        
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({
                status: "error",
                message: "File not found"
            });
        }

        // 4. Set Proper Headers
        res.setHeader('Content-Disposition', 'attachment; filename="invoice.pdf"');
        res.setHeader('Content-Type', 'application/pdf');

        // 5. Stream the File
        const fileStream = fs.createReadStream(filePath);
        fileStream.on('error', (err) => {
            console.error('File stream error:', err);
            res.status(500).end();
        });
        fileStream.pipe(res);
    } catch (error) {
        console.error('Download controller error:', error);
        res.status(500).json({
            status: "error",
            message: "Internal server error"
        });

    }
}


module.exports = {
    download,
}