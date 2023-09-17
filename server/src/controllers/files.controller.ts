import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";

import { add_csv } from "../services/files.services";

const addCsv = async (req: Request, res: Response) => {
  try {
    const file = req.file;

    const data = await add_csv(file);

    res.status(data.status).json({ message: data.message });
  } catch (e) {
    handleHttp(res, "Internal Server Error");
  }
};

export { addCsv };
