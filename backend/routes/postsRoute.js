const { createPostCtrl, getPostCtrl, getpostcountCtrl, getsinglePostCtrl, deletePostCtrl, updatePostCtrl, updatePostimageCtrl, togglelikeCtrl } = require("../controllers/postControllers")
const photoUpload = require("../middlewares/photoUpload")
const { verifyToken } = require("../middlewares/verifiedToken")
const router = require("express").Router()

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create new post (logged in user)
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [title, description, category, image]
 *             properties:
 *               title:
 *                 type: string
 *                 example: My First Post
 *               description:
 *                 type: string
 *                 example: Post description
 *               category:
 *                 type: string
 *                 example: Cars
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Post created
 *       400:
 *         description: Validation error
 */
router.post("/posts", verifyToken, photoUpload.single("image"), createPostCtrl)

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Get all posts (public)
 *     tags: [Posts]
 *     parameters:
 *       - in: query
 *         name: pageNumber
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category
 *     responses:
 *       200:
 *         description: List of posts
 */
router.get("/posts", getPostCtrl)

/**
 * @swagger
 * /posts/count:
 *   get:
 *     summary: Get posts count (public)
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Posts count
 */
router.get("/posts/count", getpostcountCtrl)

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Delete post (admin or user himself)
 *     tags: [Posts]
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
 *         description: Post deleted
 *       403:
 *         description: Access denied
 */
router.delete("/posts/:id", verifyToken, deletePostCtrl)

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Update post (user himself only)
 *     tags: [Posts]
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
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated Title
 *               description:
 *                 type: string
 *                 example: Updated description
 *               category:
 *                 type: string
 *                 example: Music
 *     responses:
 *       200:
 *         description: Post updated
 *       403:
 *         description: Access denied
 */
router.put("/posts/:id", verifyToken, updatePostCtrl)

/**
 * @swagger
 * /posts/like/{id}:
 *   put:
 *     summary: Toggle like on post (logged in user)
 *     tags: [Posts]
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
 *         description: Like toggled
 *       404:
 *         description: Post not found
 */
router.put("/posts/like/:id", verifyToken, togglelikeCtrl)

/**
 * @swagger
 * /posts/image/{id}:
 *   put:
 *     summary: Update post image (user himself only)
 *     tags: [Posts]
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
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Image updated
 *       400:
 *         description: No image provided
 */
router.put("/posts/image/:id", verifyToken, photoUpload.single("image"), updatePostimageCtrl)

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Get single post (public)
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post data
 *       404:
 *         description: Post not found
 */
router.get("/posts/:id", getsinglePostCtrl)

module.exports = router;