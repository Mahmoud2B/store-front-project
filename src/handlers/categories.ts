import express, { Request, Response } from "express";
import checkJWT from "../middlewares/authToken";
import { Category, CategoryStore } from "../models/category";

const store = new CategoryStore();

const index = async (_req: Request, res: Response) => {
  try {
    const categories = await store.index();
    res.json(categories);
  } catch (error) {
    res.status(400).send("Something went wrong!");
  }
};

const create = async (req: Request, res: Response) => {
  let name: string = req.body.name as string;

  if (name == null) {
    res.status(400).send("Category data is missing one or more field(s)");
    return;
  }
  try {
    let category: Category = {
      name: name
    };
    const categories = await store.create(category);
    res.json(categories);
  } catch (error) {
    res.status(400).send(`Something went wrong! ${error}`);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id);
    const category = await store.show(id);
    if (category) {
      res.json(category);
    } else {
      res.status(404).send("Category do not exist");
    }
  } catch (error) {
    res.status(400).send("Something went wrong!");
  }
};

const categories_routes = (app: express.Application) => {
  app.get("/categories", checkJWT, index);
  app.post("/categories/create", checkJWT, create);
  app.get("/categories/:id", checkJWT, show);
};

export default categories_routes;
