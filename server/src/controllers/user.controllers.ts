import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";

import { get_users } from "../services/user.services";

const searchUsers = async (req: Request, res: Response) => {
  try {
    const searchQuery = req.query.q as string;

    if (!searchQuery) {
      res.status(400).json({ message: "You did not include any parameters" });
    } else {
      const searchData = await get_users(searchQuery);

      if (searchData.data) {
        res.status(searchData.status).json(searchData.data);
      } else {
        res.status(searchData.status).json({ message: searchData.message });
      }
    }
  } catch (e) {
    handleHttp(res, "Internal Server Error");
  }
};

export { searchUsers };
