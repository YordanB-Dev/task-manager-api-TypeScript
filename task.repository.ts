import db from "../db.js";
import type { QueryResult } from "pg";

const getAllTask = async (): Promise<QueryResult> => {
  return db.query(
    `SELECT * FROM task`
  );
};

const getTaskById = async (id: number): Promise<QueryResult> => {
  return db.query(
    `SELECT * FROM task WHERE id = $1`,
    [id]
  );
};

const createTask = async (
  title: string,
  description: string,
  userId: number
): Promise<QueryResult> => {
  return db.query(
    `INSERT INTO task (title, description, userId) VALUES ($1, $2, $3) RETURNING *`,
    [
      title,
      description,
      userId
    ]
  );
};

const updateTask = async (
  id: number,
  title: string,
  description: string,
  userId: number
): Promise<QueryResult> => {
  return db.query(
    `UPDATE task SET title = $1, description = $2, userId = $3 WHERE id = $4 RETURNING *`,
    [
      title,
      description,
      userId,
      id
    ]
  );
};

const deleteTask = async (id: number): Promise<QueryResult> => {
  return db.query(
    `DELETE FROM task WHERE id = $1 RETURNING *`,
    [id]
  );
};

export default {
  getAllTask,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};