const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");

const ProjectsController = require ('../controllers/projects');

// Handle incoming GET requests to /orders
router.get("/", checkAuth, ProjectsController.get_all_projects);

router.post("/", checkAuth, ProjectsController.create_project);

router.get("/:projectId", checkAuth, ProjectsController.get_project);

router.patch("/:projectId", checkAuth, ProjectsController.update_project);

router.delete("/:projectId", checkAuth, ProjectsController.delete_project);

module.exports = router;