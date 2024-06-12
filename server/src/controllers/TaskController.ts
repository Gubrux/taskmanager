import type { Request, Response } from "express";
import Task from "../models/Task";

export class TaskController {
    static createTask = async (req: Request, res: Response) => {
        try {
            const task = new Task(req.body);
            task.project = req.project.id;
            req.project.tasks.push(task.id);
            await Promise.allSettled([task.save(), req.project.save()]);
            res.send("Tarea agregada");
        } catch (error) {
            res.status(500).json({ error: "Error creando la tarea" });
        }
    };
    static getProjectTasks = async (req: Request, res: Response) => {
        try {
            const tasks = await Task.find({ project: req.project.id }).populate(
                "project"
            );
            res.json(tasks);
        } catch (error) {
            res.status(500).json({ error: "Error obteniendo la tarea" });
        }
    };
    static getTaskById = async (req: Request, res: Response) => {
        try {
            const task = await Task.findById(req.task.id)
                .populate({
                    path: "completedBy.user",
                    select: "id name email",
                })
                .populate({
                    path: "notes",
                    populate: { path: "createdBy", select: "id name email" },
                });
            res.json(task);
        } catch (error) {
            res.status(500).json({ error: "Error obteniendo la tarea" });
        }
    };
    static updateTask = async (req: Request, res: Response) => {
        try {
            req.task.name = req.body.name;
            req.task.description = req.body.description;
            await req.task.save();
            res.json("tarea actualizada");
        } catch (error) {
            res.status(500).json({ error: "Error al actualizar la tarea" });
        }
    };
    static deleteTask = async (req: Request, res: Response) => {
        try {
            req.project.tasks = req.project.tasks.filter(
                (task) => task.toString() !== req.task.id
            );
            await Promise.allSettled([
                req.task.deleteOne(),
                req.project.save(),
            ]);
            res.json("task deleted");
        } catch (error) {
            res.status(500).json({
                error: "Error al intentar eliminar la tarea",
            });
        }
    };
    static updateStatus = async (req: Request, res: Response) => {
        try {
            const { status } = req.body;
            req.task.status = status;
            const data = {
                user: req.user.id,
                status,
            };
            req.task.completedBy.push(data);
            await req.task.save();
            res.json("Estado de la tarea actualizado");
        } catch (error) {
            res.status(500).json({
                error: "Error actualizando el estado de la tarea",
            });
        }
    };
}
