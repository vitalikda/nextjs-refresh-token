type User = {
  id: number;
  email: string;
  password: string;
};

const users = new Set<User>();

export const getUser = async (email: string) => {
  return Array.from(users).find((user) => user.email === email);
};

export const createUser = async (user: Omit<User, "id">) => {
  const newUser = { ...user, id: users.size + 1 };
  users.add(newUser);
  return newUser;
};
