const { getAllUsersCtrl, getUsersCtrl, updateUsersCtrl, getUserscountCtrl, uploadPhoto, deleteUserProfile } = require("../controllers/usersController");
const { verifyTokenAndAdmin, verifyTokenAndUserhimself, verifyToken, verifyTokenAndAuthorization } = require("../middlewares/verifiedToken");
const photoupload = require("../middlewares/photoUpload")
const router = require("express").Router()

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Get all users (admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 *       403:
 *         description: Access denied
 */
router.get("/profile", verifyTokenAndAdmin, getAllUsersCtrl)

/**
 * @swagger
 * /profile/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User data
 *       404:
 *         description: User not found
 */
router.get("/profile/:id", getUsersCtrl)

/**
 * @swagger
 * /profile/{id}:
 *   put:
 *     summary: Update user profile (user himself only)
 *     tags: [Users]
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
 *               username:
 *                 type: string
 *                 example: Ahmed
 *               password:
 *                 type: string
 *                 example: newpassword
 *               bio:
 *                 type: string
 *                 example: I am a developer
 *     responses:
 *       200:
 *         description: User updated
 *       403:
 *         description: Access denied
 */
router.put("/profile/:id", verifyTokenAndUserhimself, updateUsersCtrl)

/**
 * @swagger
 * /photo:
 *   post:
 *     summary: Upload profile photo
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
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
 *         description: Photo uploaded successfully
 *       400:
 *         description: No file provided
 */
router.post("/photo", verifyToken, photoupload.single("image"), uploadPhoto)

/**
 * @swagger
 * /profile/{id}:
 *   delete:
 *     summary: Delete user profile (admin or user himself)
 *     tags: [Users]
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
 *         description: User deleted
 *       404:
 *         description: User not found
 */
router.delete("/profile/:id", verifyTokenAndAuthorization, deleteUserProfile)

/**
 * @swagger
 * /count:
 *   get:
 *     summary: Get users count (admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Users count
 */
router.get("/count", verifyTokenAndAdmin, getUserscountCtrl)

module.exports = router;