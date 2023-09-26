import jwt from "jsonwebtoken";
import config from "../config";

/**
 * Sign in jwt from user details
 * 
 * @param paylaod 
 * @returns 
 */
export const signJWT = (paylaod: string | Buffer | object) => {
  return jwt.sign(paylaod, config.JWT_SECRET, {
    expiresIn: "7d",
  });
};


/**
 * Verify user token 
 * 
 * @param token 
 * @returns 
 */
export const verifyJWT = (token: string) => {
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
};
