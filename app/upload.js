import * as path from 'path'
import multer from 'multer'
import fs from 'fs'

const uploadFilePath = path.join(
    '/Users/vishavrattan/Desktop/personal/graphql-express-migrating-mysql',
    '/public/uploads',
)
fs.chmodSync(uploadFilePath, '755')
const storageFile = multer.diskStorage({
    destination: uploadFilePath,
    filename(req, file, fn) {
        fn(
            null,
            `${new Date().getTime().toString()}-${file.fieldname}${path.extname(
                file.originalname,
            )}`,
        )
    },
})

const uploadFile = multer({
    storage: storageFile,
    limits: { fileSize: 5 * 1024 * 1024 },
}).array('picture')

const handleUploadFile = async (req, res) => {
    return new Promise((resolve, reject) => {
        uploadFile(req, res, (error) => {
            if (error) {
                reject(error)
            }

            resolve({ files: req.files.map((f) => f.filename) })
        })
    })
}

export { handleUploadFile, uploadFilePath }
