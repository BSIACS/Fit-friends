import {compare, genSalt, hash} from 'bcrypt';


export const setPasswordHash = async (password: string) => {
  const salt = await genSalt(10);
  const passwordHash = await hash(password, salt);

  return passwordHash;
}

export const comparePassword = async (password: string, passwordHash: string) => {
  const result =  await compare(password, passwordHash);

  return result;
}
