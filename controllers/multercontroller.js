// let express = require('express')
// let app = express.Router();
// const upload = require("../multer")
// const db = require("../mongo")
// const fs = require("fs")



// app.get('/test', (req, res) => {res.json('testing multer controller')})

// app.post('/uploadmultiple', upload.array('myFiles', 12), (req, res, next) => {
//     const files = req.files
//     if (!files) {
//         const error = new Error('Please choose files')
//         error.httpStatusCode = 400
//         return next(error)
//     }

//     res.send(files)

// })

// app.post('/uploadphoto', upload.single('File'), (req, res) => {
//     var img = fs.readFileSync(req.file.path);
//     var encode_image = img.toString('base64');
//     // Define a JSONobject for the image attributes for saving to database

//     var finalImg = {
//         contentType: req.file.mimetype,
//         img: new Buffer(encode_image, 'base64')
//     };
//     db.collection('quotes').insertOne(finalImg, (err, result) => {
//         console.log(result)

//         if (err) return console.log(err)

//         console.log('saved to database')
//         res.json({ message : 'Photo Saved'})



//     })
// })

// app.get('/photos', (req, res) => {
//     db.collection('quotes').find().toArray((err, result) => {
     
//           const imgArray= result;
//                 console.log(imgArray);
//      console.log('it worked')
//        if (err) return console.log(err)
//        res.json({imgArray})
     
//       })
//     });

//     app.get('/photo/:id', (req, res) => {
//         var filename = req.params.id;
         
//         db.collection('mycollection').findOne({'_id': ObjectId(filename) }, (err, result) => {
         
//             if (err) return console.log(err)
         
//            res.contentType('image/jpeg');
//            res.json(result.image.buffer)
           
            
//           })
//         })

// module.exports = app;