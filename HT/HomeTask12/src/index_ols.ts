/* import express, { Request, Response } from 'express';
import fs from 'fs/promises';

const app = express();
const port = 3000;


app.use(express.json());

const USERS_FILE = './src/users.json';


const readUsers = async () => {
  try {
    const data = await fs.readFile(USERS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const writeUsers = async (users: any) => {
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
};


app.get('/', (req: Request, res: Response) => {
  res.json({ author: 'Your Name' });
});


app.get('/users', async (req: Request, res: Response) => {
  const users = await readUsers();
  res.json(users);
});

app.post('/users', async (req: Request, res: Response) => {
  const { user, email } = req.body;

  if (!user || !email) {
    return res.status(400).json({ error: 'Error' });
  }

  const users = await readUsers();
  const newUser = { id: Date.now().toString(), user, email };
  users.push(newUser);
  await writeUsers(users);

  res.status(201).json(newUser);
});

app.patch('/users/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { user, email } = req.body;

  const users = await readUsers();
  const userIndex = users.findIndex((u: any) => u.id === id);

  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  users[userIndex] = { ...users[userIndex], user, email };
  await writeUsers(users);

  res.json(users[userIndex]);
});

app.delete('/users/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  const users = await readUsers();
  const filteredUsers = users.filter((u: any) => u.id !== id);

  if (users.length === filteredUsers.length) {
    return res.status(404).json({ error: 'User not found' });
  }

  await writeUsers(filteredUsers);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
 */