import api from "@/lib/axios";
import {
    Project,
    ProjectFormData,
    dashboardProjectSchema,
} from "@/types/index.ts";
import { isAxiosError } from "axios";

export async function createProject(formData: ProjectFormData) {
    try {
        const url = "./projects";
        const { data } = await api.post(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function getProjects() {
    try {
        const url = "./projects";
        const { data } = await api.get(url);
        const response = dashboardProjectSchema.safeParse(data);
        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function getProjectsById(id: Project["_id"]) {
    try {
        const url = `./projects/${id}`;
        const { data } = await api.get(url);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

type ProjectAPITYPE = {
    formData: ProjectFormData;
    projectId: Project["_id"];
};
export async function updateProject({ formData, projectId }: ProjectAPITYPE) {
    try {
        const url = `./projects/${projectId}`;
        const { data } = await api.put<string>(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function deleteProject(id: Project["_id"]) {
    try {
        const url = `./projects/${id}`;
        const { data } = await api.delete<string>(url);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}
