const { createCommentCtrl, getallCommentCtrl, deleteCommentCtrl, updatecommentCtrl } = require("../controllers/commentsController")
const { verifyToken, verifyTokenAndAdmin } = require("../middlewares/verifiedToken")
const router = require("express").Router()

/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Create comment (logged in user)
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [postId, text]
 *             properties:
 *               postId:
 *                 type: string
 *                 example: 64abc123...
 *               text:
 *                 type: string
 *                 example: Great post!
 *     responses:
 *       201:
 *         description: Comment created
 *       400:
 *         description: Validation error
 */
router.post("/comments", verifyToken, createCommentCtrl)

/**
 * @swagger
 * /comments:
 *   get:
 *     summary: Get all comments (admin only)
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of comments
 *       403:
 *         description: Access denied
 */
router.get("/comments", verifyTokenAndAdmin, getallCommentCtrl)

/**
 * @swagger
 * /comments/{id}:
 *   delete:
 *     summary: Delete comment (admin or user himself)
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comment deleted
 *       403:
 *         description: Access denied
 */
router.delete("/comments/:id", verifyToken, deleteCommentCtrl)

/**
 * @swagger
 * /comments/{id}:
 *   put:
 *     summary: Update comment (user himself only)
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [text]
 *             properties:
 *               text:
 *                 type: string
 *                 example: Updated comment
 *     responses:
 *       200:
 *         description: Comment updated
 *       403:
 *         description: Access denied
 */
router.put("/comments/:id", verifyToken, updatecommentCtrl)

module.exports = router