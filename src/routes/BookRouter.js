const express=require('express');
const bookcontroller=require('../controllers/Bookcontroller');
const router=express.Router();

router.get('/' ,getAllbooks);
router.get('/:id' , getBookById);
router.post('/' , createBook);
router.put('/:id' , updateBook);
router.delete('/:id' , deleteBook);


module.exports=router;