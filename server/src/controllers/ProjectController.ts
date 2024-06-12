import type { Request, Response } from "express";
import Project from "../models/Project";
import colors from "colors";

export class ProjectController {
    static createProject = async (req: Request, res: Response) => {
        const project = new Project(req.body);

        // asignar el manager del proyecto
        project.manager = req.user._id;
        try {
            await project.save();
            res.send("Proyecto creado");
        } catch (error) {
            console.log(colors.bgRed.bold(`Error creando el proyecto`));
        }
    };
    static getAllProjects = async (req: Request, res: Response) => {
        try {
            const projects = await Project.find({
                $or: [
                    { manager: { $in: req.user._id } },
                    { team: { $in: req.user._id } },
                ],
            });
            res.json(projects);
        } catch (error) {
            console.log(colors.bgRed.bold(`Error obteniendo los proyectos`));
        }
    };
    static getAllProjectById = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const project = await Project.findById(id).populate("tasks");
            if (!project) {
                const error = new Error("Project not found");
                return res.status(404).json({ error: error.message });
            }
            if (
                project.manager.toString() !== req.user._id.toString() &&
                !project.team.includes(req.user._id)
            ) {
                const error = new Error("No tienes acceso a este proyecto");
                return res.status(403).json({ error: error.message });
            }
            res.json(project);
        } catch (error) {
            console.log(
                colors.bgRed.bold(`Error obteniendo el proyecto por id`)
            );
        }
    };
    static updateProject = async (req: Request, res: Response) => {
        try {
            req.project.clientName = req.body.clientName;
            req.project.projectName = req.body.projectName;
            req.project.description = req.body.description;
            await req.project.save();
            res.json("Projecto actualizado");
        } catch (error) {
            console.log(error);
        }
    };
    static deleteProject = async (req: Request, res: Response) => {
        try {
            await req.project.deleteOne();
            res.json("Projecto borrado");
        } catch (error) {
            console.log(error);
        }
    };
}
