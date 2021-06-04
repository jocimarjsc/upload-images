import multer from "multer";
import path from "path";
import crypto from "crypto";
import { Request } from "express";

const multerConfig = {
    dest: path.resolve(__dirname, "..", "..", process.env.PATH_UPLOAD),
    storage: multer.diskStorage({
        destination: (req: any, file: any, cb: any) => {
            cb(null, path.resolve(__dirname, "..", "..", process.env.PATH_UPLOAD));
        },
        filename: (req: any, file: any, cb: any) => {
            crypto.randomBytes(16, (err, hash) => {
                if(err) {
                    cb(err);
                };

                const fileName = `${hash.toString("hex")}-${file.originalname}`;

                cb(null, fileName)
            })
        }
    }),
    limits: {
        fileSize: 2 * 1024 * 1024
    },
    fileFilter: (req: any, file: any, cb: any) => {
        const allowedMimes = [
            "image/jpeg",
            "image/pjpeg",
            "image/png",
            "image/gif",
            "image/jpg"
        ];

        if(allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb( new Error("Invalid file type!"))
        }
    }
};

export { multerConfig };