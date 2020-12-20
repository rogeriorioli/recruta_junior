import multer from 'multer'
import path from 'path'
import crypto from 'crypto'

module.exports = {

  dest : path.resolve(__dirname, '..','..', 'tmp' , 'uploads'),
  storage : multer.diskStorage({
  destination : (req, file, cb) => {
    cb(null, path.resolve(__dirname, '..','..', 'tmp' , 'uploads'))
  },
  filename : (req, file, cb) => {
    crypto.randomBytes(16, (err, hash) => {
      //@ts-ignore
      if(err) cb(err);
        
      const filename = `${hash.toString('hex')}-${file.originalname}`

      cb(null , filename)
    })
  } 
  }),
  limits : {
    fileSize : 2 * 1024 * 1024
  },
  // fileFilter : ({req, file, cb} : any ) => {
  //   const allowedMimes = [
  //     'image/jpg',
  //     'image/jpeg',
  //     'image/png',
  //     'image/gif',
  //   ]
  //   if(allowedMimes.includes(file.mimetype)) {
  //     cb(null, true)
  //   }else {
  //     cb(new Error('invalid type'))
  //   }
  // } 
}