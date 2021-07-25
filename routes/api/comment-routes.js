const router = require('express').Router();

const { 
    addComment, 
    removeComment,
    addReply,
    removeReply
 } = require('../../controllers/comment-controller');

// /api/comments/<pizzaId>
router.route('/:pizzaId').post(addComment);

// /api/comments/<pizzaId>/<commentId>
// router.route('/:pizzaId/:commentId').delete(removeComment);

// put new reply or delete comment
router.route('/:pizzaId/:commentId')
 .put(addReply)  //  the callback function of a route method has req and res as parameters, so we don't have to explicitly pass any arguments to addReply.
 .delete(removeComment)

// delete reply
router.route('/:pizzaId/:commentId/:replyId').delete(removeReply);

module.exports = router;