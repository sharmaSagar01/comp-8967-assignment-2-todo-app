const express = require("express");
const router = express.Router();
const {
  getNotes,
  setNote,
  deleteNote,
  updateNote,
} = require("../controllers/noteController");
const { protect } = require("../middlewares/authMiddleware");

router.route("/").get(protect, getNotes).post(protect, setNote);
router.route("/:id").put(protect, updateNote).delete(protect, deleteNote);

module.exports = router;
