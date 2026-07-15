import { SignJWT, jwtVerify } from "jose";

export const ADMIN_SESSION_COOKIE = "kloom_admin_session";
export const ADMIN_SESSION_MAX_AGE = 60 * 60 * 12;

type AdminSessionPayload = {
  adminId: string;
  email: string;
  displayName: string;
};

function getSecret() {
  const value = process.env.AUTH_SECRET ?? "";
  if (value.length < 32) {
    throw new Error("AUTH_SECRET must contain at least 32 characters.");
  }
  return new TextEncoder().encode(value);
}

export function isAuthConfigured() {
  return Boolean((process.env.AUTH_SECRET ?? "").length >= 32);
}

export async function createAdminSessionToken(payload: AdminSessionPayload) {
  return new SignJWT({
    email: payload.email,
    displayName: payload.displayName,
    role: "admin",
  })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.adminId)
    .setIssuedAt()
    .setExpirationTime(`${ADMIN_SESSION_MAX_AGE}s`)
    .sign(getSecret());
}

export async function verifyAdminSessionToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getSecret(), {
      algorithms: ["HS256"],
    });

    if (
      payload.role !== "admin" ||
      typeof payload.sub !== "string" ||
      typeof payload.email !== "string"
    ) {
      return null;
    }

    return {
      adminId: payload.sub,
      email: payload.email,
      displayName:
        typeof payload.displayName === "string" ? payload.displayName : payload.email,
    };
  } catch {
    return null;
  }
}
