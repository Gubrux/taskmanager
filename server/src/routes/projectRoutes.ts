import { Router } from "express";
import { ProjectController } from "../controllers/ProjectController";
import { body, param } from "express-validator";
import { TaskController } from "../controllers/TaskController";
import { handleInputErrors } from "../middleware/validation";
import { projectExists } from "../middleware/project";
import { taskBelongsToProject, taskExists } from "../middleware/task";
import { authenticate } from "../middleware/auth";

const router = Router();

router.use(authenticate);

router.post(
    "/",
    body("projectName").notEmpty().withMessage("Project name is required"),
    body("clientName").notEmpty().withMessage("Project client is required"),
    body("description")
        .notEmpty()
        .withMessage("Project description is required"),
    handleInputErrors,
    ProjectController.createProject
);

router.get("/", ProjectController.getAllProjects);

router.get(
    "/:id",
    param("id").isMongoId().withMessage("Invalid project id"),
    handleInputErrors,
    ProjectController.getAllProjectById
);

router.put(
    "/:id",
    param("id").isMongoId().withMessage("Invalid project id"),
    body("projectName").notEmpty().withMessage("Project name is required"),
    body("clientName").notEmpty().withMessage("Project client is required"),
    body("description")
        .notEmpty()
        .withMessage("Project description is required"),
    handleInputErrors,
    ProjectController.updateProject
);

router.delete(
    "/:id",
    param("id").isMongoId().withMessage("Invalid project id"),
    handleInputErrors,
    ProjectController.deleteProject
);

// Routes for tasks
router.param("projectId", projectExists);
// Create task
router.post(
    "/:projectId/tasks",
    body("name").notEmpty().withMessage("task name is required"),
    body("description").notEmpty().withMessage("task description is required"),
    handleInputErrors,
    TaskController.createTask
);

// Get all tasks
router.get("/:projectId/tasks", TaskController.getProjectTasks);

// Get task by id
router.param("taskId", taskExists);
router.param("taskId", taskBelongsToProject);
router.get(
    "/:projectId/tasks/:taskId",
    param("taskId").isMongoId().withMessage("Invalid task id"),
    handleInputErrors,
    TaskController.getTaskById
);

// Update task
router.put(
    "/:projectId/tasks/:taskId",

    param("taskId").isMongoId().withMessage("Invalid task id"),
    body("name").notEmpty().withMessage("task name is required"),
    body("description").notEmpty().withMessage("task description is required"),
    handleInputErrors,
    TaskController.updateTask
);
// delete task
router.delete(
    "/:projectId/tasks/:taskId",
    param("taskId").isMongoId().withMessage("Invalid task id"),
    handleInputErrors,
    TaskController.deleteTask
);

// task status
router.post(
    "/:projectId/tasks/:taskId/status",
    param("taskId").isMongoId().withMessage("Invalid task id"),
    body("status").notEmpty().withMessage("task status is required"),
    handleInputErrors,
    TaskController.updateStatus
);
export default router;
