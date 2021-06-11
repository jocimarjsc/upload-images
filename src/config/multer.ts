import multer, { Multer } from "multer";
import path from "path";
import crypto from "crypto";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const storateTypes = {
    local: multer.diskStorage({
        destination: (req: Express.Request, file: Express.Multer.File & {key: string }, cb: any) => {
            cb(null, path.resolve(__dirname, "..", "..", process.env.PATH_UPLOAD));
        },
        filename: (req: Express.Request, file: Express.Multer.File & {key: string }, cb: any) => {
            crypto.randomBytes(16, (err, hash) => {
                if(err) {
                    cb(err);
                };
                const extensionName = path.extname(file.originalname);
                file.key = `${hash.toString("hex")}${extensionName}`;

                cb(null, file.key)
            })
        }
    }),
    s3: multerS3({
        s3: new aws.S3(),
        bucket: "uploads-joci",
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: "public-read",
        key: (request, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if(err) {
                    cb(err);
                };

                const extensionName = path.extname(file.originalname);
                const fileName = `${hash.toString("hex")}${extensionName}`;

                cb(null, fileName)
            })
        }
    })
};

const multerConfig = {
    dest: path.resolve(__dirname, "..", "..", process.env.PATH_UPLOAD),
    storage: storateTypes[process.env.STORAGE_TYPE],
    limits: {
        fileSize: 2 * 1024 * 1024
    },
    fileFilter: (req: any, file: any, cb: any) => {
        const allowedMimes = [
            "image/jpeg",
            "image/pjpeg",
            "image/png",
            "image/gif"
        ];

        if(allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb( new Error("Invalid file type!"))
        }
    }
};

export { multerConfig };