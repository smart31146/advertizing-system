import bcrypt from "bcrypt";

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  const hash: string = await bcrypt.hash(password, saltRounds);
  return hash;
}

export async function comparePasswords(
  inputPassword: string,
  hashedPassword: string
): Promise<boolean> {
  const isMatch: boolean = await bcrypt.compare(inputPassword, hashedPassword);
  return isMatch;
}
