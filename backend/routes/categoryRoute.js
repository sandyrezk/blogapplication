const { createCategoryCtrl, getallCategoryCtrl, deleteCategoryCtrl } = require("../controllers/categoriesController")
const { verifyToken } = require("../middlewares/verifiedToken")
const router = require("express").Router()

/**
 * @swagger
 * /category:
 *   post:
 *     summary: Create category (admin only)
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title]
 *             properties:
 *               title:
 *                 type: string
 *                 example: Cars
 *     responses:
 *       201:
 *         description: Category created
 *       400:
 *         description: Validation error
 */
router.post("/category", verifyToken, createCategoryCtrl)

/**
 * @swagger
 * /category:
 *   get:
 *     summary: Get all categories (public)
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: List of categories
 */
router.get("/category", getallCategoryCtrl)

/**
 * @swagger
 * /category/{id}:
 *   delete:
 *     summary: Delete category (admin only)
 *     tags: [Categories]
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
 *         description: Category deleted
 *       404:
 *         description: Category not found
 */
router.delete("/category/:id", deleteCategoryCtrl)

module.exports = router;