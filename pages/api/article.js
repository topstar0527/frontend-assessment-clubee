import { pool } from "config/db";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return await getArticles(req, res);
    case "POST":
      return await saveArticle(req, res);
    default:
      return res.status(400).send("Method not allowed");
  }
}

const getArticles = async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM articles ORDER BY createdAt DESC LIMIT 5"); //ORDER BY createAt LIMIT 5
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const saveArticle = async (req, res) => {
  try {
    const { title, description, email } = req.body;

    const result = await pool.query("INSERT INTO articles SET ?", {
      title,
      description,
      email,
    });

    return res.status(200).json({ ...req.body, id: result.insertId });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
