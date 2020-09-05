const express = require('express')
const multer  = require('multer')
let path      = require('path')

const mySchema = require('../Models/image-schema.js')

const router  = express.Router()


const storage = multer.diskStorage({
  destination: path.join(__dirname, '../public/files'),
  filename: (req, file, callback) => {
    callback(null, file.originalname)
  }
})

router.route('/').get((req, res) => {
  res.render('index')
}).post()

const upload = multer({
  storage
})

router.route('/add').get().post(upload.single('file') , async (req, res) => {

  let file = req.file
  let { title } = req.body

  const image = new mySchema({
    title, file
  })

  await image.save()

  res.redirect('/images')
})

router.route('/images').get((req, res) => {
  res.render('images')
}).post(async (req, res) => {
  let d = await mySchema.find()

  let data = []

  let { position, counter } = req.body

  for(i = position; i < counter; i++) {
    data.push(d[i])
  }

  console.log( position )
  console.log( counter )
  
  res.json(data)
})

router.route('/delete/:id').get(async (req, res) => {
    const { id } = req.params
    console.log( id )
    await mySchema.findByIdAndDelete({
      _id: id
    })
    res.redirect('/images')
})

module.exports = router