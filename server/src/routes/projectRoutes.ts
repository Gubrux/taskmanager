import { Router } from "express";
import { ProjectController } from "../controllers/ProjectController";
import { body, param } from "express-validator";
import { TaskController } from "../controllers/TaskController";
import { handleInputErrors } from "../middleware/validation";
import { projectExists } from "../middleware/project";
import {
    hasAutorization,
    taskBelongsToProject,
    taskExists,
} from "../middleware/task";
import { authenticate } from "../middleware/auth";
import { TeamMemberController } from "../controllers/TeamController";
import { NoteController } from "../controllers/NoteController";
import Note from "../models/Note";

const router = Router();

router.use(authenticate);

// Routes for create project
router.post(
    "/",
    body("projectName")
        .notEmpty()
        .withMessage("El nombre del proyecto es requerido"),
    body("clientName")
        .notEmpty()
        .withMessage("El cliente del proyecto es requerido"),
    body("description")
        .notEmpty()
        .withMessage("La descripción del proyecto es requerida"),
    handleInputErrors,
    ProjectController.createProject
);
// Get all projects
router.get("/", ProjectController.getAllProjects);

// Get project by id
router.get(
    "/:id",
    param("id").isMongoId().withMessage("ID de proyecto inválido"),
    handleInputErrors,
    ProjectController.getAllProjectById
);

// Routes for tasks
router.param("projectId", projectExists);

// Update project
router.put(
    "/:projectId",
    param("projectId").isMongoId().withMessage("ID de proyecto inválido"),
    body("projectName")
        .notEmpty()
        .withMessage("El nombre del proyecto es requerido"),
    body("clientName")
        .notEmpty()
        .withMessage("El cliente del proyecto es requerido"),
    body("description")
        .notEmpty()
        .withMessage("La descripción del proyecto es requerida"),
    handleInputErrors,
    hasAutorization,
    ProjectController.updateProject
);

router.delete(
    "/:projectId",
    param("projectId").isMongoId().withMessage("ID de proyecto inválido"),
    handleInputErrors,
    hasAutorization,
    ProjectController.deleteProject
);

// Create task
router.post(
    "/:projectId/tasks",
    hasAutorization,
    body("name").notEmpty().withMessage("El nombre de la tarea es requerido"),
    body("description")
        .notEmpty()
        .withMessage("La descripción de la tarea es requerida"),
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
    param("taskId").isMongoId().withMessage("ID de tarea inválido"),
    handleInputErrors,
    TaskController.getTaskById
);

// Update task
router.put(
    "/:projectId/tasks/:taskId",
    hasAutorization,
    param("taskId").isMongoId().withMessage("ID de tarea inválido"),
    body("name").notEmpty().withMessage("El nombre de la tarea es requerido"),
    body("description")
        .notEmpty()
        .withMessage("La descripción de la tarea es requerida"),
    handleInputErrors,
    TaskController.updateTask
);
// delete task
router.delete(
    "/:projectId/tasks/:taskId",
    hasAutorization,
    param("taskId").isMongoId().withMessage("Accion no permitida"),
    handleInputErrors,
    TaskController.deleteTask
);

// task status
router.post(
    "/:projectId/tasks/:taskId/status",
    param("taskId").isMongoId().withMessage("ID de tarea inválido"),
    body("status").notEmpty().withMessage("El estado de la tarea es requerido"),
    handleInputErrors,
    TaskController.updateStatus
);

// routes for teams
router.post(
    "/:projectId/team/find",
    body("email").isEmail().toLowerCase().withMessage("Email no válido"),
    handleInputErrors,
    TeamMemberController.findMemberByEmail
);

// Get project team
router.get("/:projectId/team", TeamMemberController.getProjectTeam);

// Add member to project team
router.post(
    "/:projectId/team",
    body("id").isMongoId().withMessage("ID no válido"),
    handleInputErrors,
    TeamMemberController.addMemberById
);

// Remove member from project team
router.delete(
    "/:projectId/team/:userId",
    param("userId").isMongoId().withMessage("ID no válido"),
    handleInputErrors,
    TeamMemberController.removeMemberById
);
// routes for notes
router.post(
    "/:projectId/tasks/:taskId/notes",
    body("content")
        .notEmpty()
        .withMessage("El contenido de la nota es requerido"),
    handleInputErrors,
    NoteController.createNote
);
// get notes
router.get("/:projectId/tasks/:taskId/notes", NoteController.getTaskNotes);
// delete note
router.delete(
    "/:projectId/tasks/:taskId/notes/:noteId",
    param("noteId").isMongoId().withMessage("ID no válido"),
    handleInputErrors,
    NoteController.deleteNote
);
export default router;
