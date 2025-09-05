import bcryptjs from 'bcryptjs';
import jwt,{JwtPayload} from 'jsonwebtoken';
import { jwtVerify } from 'jose';
import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import User, { IUser } from '@/dbModels/user/user';
import connectDB from '../dbConfig/db';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export interface MyTokenPayload extends JwtPayload {
  id: string;
  email?: string;
  role: 'admin' | 'staff' | 'patient'
  // Add any other fields you include in your JWT
}


export async function hashPassword(password: string): Promise<string> {
  const salt = await bcryptjs.genSalt(12);
  return bcryptjs.hash(password, salt);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcryptjs.compare(password, hashedPassword);
}

export function generateToken(userId: string, email: string, role: string): string {
  return jwt.sign(
    { userId, email, role },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export async function verifyToken(token: string): Promise<any | null> {
  try {
    const secret = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return payload; // contains { userId, email, role, exp, iat }
  } catch (error) {
    console.error('JWT verification failed in edge:', error);
    return null;
  }
}
export async function authenticateUser(email: string, password: string): Promise<IUser | null> {
  try {
    await connectDB();
    
    const user = await User.findOne({ email, isActive: true });
    if (!user) return null;

    const isValidPassword = await verifyPassword(password, user.password);
    if (!isValidPassword) return null;

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    return user;
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
}

export const  getUserIdFromCookie = async(request: NextRequest):Promise<MyTokenPayload> => {
 
  const token = request.cookies.get('auth-token')?.value;

  if (!token) throw new Error('No token found');

  const decoded = await jwt.verify(token, JWT_SECRET) as MyTokenPayload;
  return decoded; // assuming token payload is { id, email, etc. }
};


export function isAuthorized(user: IUser | null, requiredRoles: string[] = ['admin', 'staff']): boolean {
  if (!user || !user.isActive) return false;
  return requiredRoles.includes(user.role);
}


export  async function  getUserFromServerCookies() {
  const token = (await cookies()).get('token')?.value;
  if (!token) return null;

  try {
    return await jwt.verify(token, process.env.JWT_SECRET!) as MyTokenPayload;
  } catch {
    return null;
  }
}

export async function getUserFromToken(request: NextRequest): Promise<IUser | null> {
  try {
    // await connectDB();
    console.log('Fetching user from token...');
    const token = request.cookies.get('auth-token')?.value;
    // console.log('Fetching user from token...',token);

    if (!token) return null;
   
    const decoded = await verifyToken(token);
    
  
    if (!decoded) return null;

    // const userInfo = await User.findOne({
    //   _id: decoded.userId,
    //   isActive: true
    // }).select('-password -__v');

    // console.log('User found:', userInfo);
    
    return decoded;
  } catch (error) {
    console.error('Token verification error:', error);
    return null;
  }
}