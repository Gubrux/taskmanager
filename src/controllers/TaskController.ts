import type { Request, Response } from "express"
import Project from "../models/Project";

export class TaskController{
    static createTask = async (req: Request, res: Response) => {
        const { projectId } = req.params;
        const project = await Project.findById(projectId);
        if(!project){
            const error = new Error('Project not found');
            return res.status(404).json({error: error.message});
        }
        try {
            
        } catch (error) {
            
        }
    }
}
