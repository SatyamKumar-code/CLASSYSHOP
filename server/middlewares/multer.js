import multer from 'multer';
import fs from 'fs';

const storage = multer.diskStorage({
    destination: function (req, file, cd) {
        cd( null, "uploads");
    
    },
    filename: function (req, file, cd) {
        cd(null, `${Date.now()}_${file.originalname}`);

    },
});

const upload = multer({ storage: storage });

export default upload;