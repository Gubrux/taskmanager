import { Router } from "express";
import { ProjectController } from "../controllers/ProjectController";
import { body, param } from 'express-validator';
import { handleInputErrors } from "../middleware/validation";
import { TaskController } from "../controllers/TaskController";

const router = Router();


router.post('/',
    body('projectName')

    .notEmpty().withMessage('Project name is required'),
    body('clientName')
    .notEmpty().withMessage('Project client is required'),
    body('description')
    .notEmpty().withMessage('Project description is required'),
    handleInputErrors,
    ProjectController.createProject);

    router.get("/", ProjectController.getAllProjects);

router.get("/:id",
    param('id').isMongoId().withMessage('Invalid project id'),
    handleInputErrors,
    ProjectController.getAllProjectsById);
    
router.put("/:id",
    param('id').isMongoId().withMessage('Invalid project id'),
    body('projectName')
    .notEmpty().withMessage('Project name is required'),
    body('clientName')
    .notEmpty().withMessage('Project client is required'),
    body('description')
    .notEmpty().withMessage('Project description is required'),
    handleInputErrors,
    ProjectController.updateProject);

    router.delete("/:id",
    param('id').isMongoId().withMessage('Invalid project id'),
    handleInputErrors,
    ProjectController.deleteProject);




    // Routes for tasks
router.post("/:projectId/tasks", TaskController.createTask);


export default router;