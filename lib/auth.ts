import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { query, execute } from "@/lib/db";

const JWT_SECRET = process.env.JWT_SECRET || "nisha_fashions_super_secret_jwt_key_2026_xyz";
const COOKIE_NAME = "nfw_admin_token";

export interface AdminUserPayload {
  id: number;
  email: string;
  name: string;
  role: string;
}

export function signToken(payload: AdminUserPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): AdminUserPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AdminUserPayload;
  } catch (err) {
    return null;
  }
}

/**
 * Get currently authenticated admin user from cookies
 */
export async function getAdminUser(): Promise<AdminUserPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;

    const payload = verifyToken(token);
    if (!payload) return null;

    // Verify user still exists in database
    const users: any = await query(`SELECT id, email, name, role FROM admin_users WHERE id = ? LIMIT 1`, [payload.id]);
    if (!users || users.length === 0) return null;

    return users[0] as AdminUserPayload;
  } catch (error) {
    return null;
  }
}

/**
 * Authenticate admin with email and password
 */
export async function loginAdmin(email: string, password: string): Promise<{ success: boolean; error?: string; user?: AdminUserPayload }> {
  try {
    const users: any = await query(`SELECT * FROM admin_users WHERE email = ? LIMIT 1`, [email.trim().toLowerCase()]);
    if (!users || users.length === 0) {
      return { success: false, error: "Invalid email or password." };
    }

    const user = users[0];
    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) {
      return { success: false, error: "Invalid email or password." };
    }

    const payload: AdminUserPayload = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    const token = signToken(payload);
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return { success: true, user: payload };
  } catch (error: any) {
    return { success: false, error: error.message || "Login failed." };
  }
}

/**
 * Log out admin
 */
export async function logoutAdmin(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

/**
 * Update Admin Profile & Password
 */
export async function updateAdminProfile(
  userId: number,
  data: { name?: string; email?: string; currentPassword?: string; newPassword?: string }
): Promise<{ success: boolean; error?: string }> {
  try {
    const users: any = await query(`SELECT * FROM admin_users WHERE id = ? LIMIT 1`, [userId]);
    if (!users || users.length === 0) return { success: false, error: "User not found." };
    const user = users[0];

    // If changing password, verify current password
    if (data.newPassword) {
      if (!data.currentPassword) {
        return { success: false, error: "Current password is required to set a new password." };
      }
      const valid = await bcrypt.compare(data.currentPassword, user.password_hash);
      if (!valid) {
        return { success: false, error: "Incorrect current password." };
      }
      const newHash = await bcrypt.hash(data.newPassword, 10);
      await execute(`UPDATE admin_users SET password_hash = ? WHERE id = ?`, [newHash, userId]);
    }

    if (data.name || data.email) {
      const name = data.name || user.name;
      const email = data.email ? data.email.trim().toLowerCase() : user.email;
      await execute(`UPDATE admin_users SET name = ?, email = ? WHERE id = ?`, [name, email, userId]);
    }

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to update profile." };
  }
}
