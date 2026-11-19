'use client';
import { useSession } from "./auth-client"

/**
 * Client-side session hook. Must be called from a component render
 * (it wraps `authClient.useSession`), never from an async function.
 */
export const useClientUserSession = () => useSession();
