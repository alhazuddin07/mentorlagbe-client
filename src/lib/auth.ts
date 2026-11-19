import { betterAuth } from "better-auth";
import { APIError, createAuthMiddleware } from "better-auth/api";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db("mentor-lagbe");

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
    },
    user: {
        additionalFields: {
            role: {
                type: "string",
                required: false,
                defaultValue: "student",
                input: true,
            },
            plan: {
                type: "string",
                required: false,
                defaultValue: "free",
                input: false,
            },
        },
    },
    hooks: {
        before: createAuthMiddleware(async (ctx) => {
            // `role` has to be an input field so sign-up can pick
            // student/tutor, but it must never be changed afterwards.
            // Otherwise any signed-in user could promote themselves to admin
            // through `POST /api/auth/update-user`.
            if (ctx.path === "/update-user" && ctx.body?.role !== undefined) {
                throw new APIError("BAD_REQUEST", {
                    message: "Role cannot be changed.",
                });
            }
        }),
    },
    databaseHooks: {
        user: {
            create: {
                before: async (user) => {
                    const allowedRoles = ["student", "tutor"];
                    const role = allowedRoles.includes(user.role as string)
                        ? user.role
                        : "student";
                    return {
                        data: {
                            ...user,
                            role,
                        },
                    };
                },
            },
        },
    },
    database: mongodbAdapter(db, {
        client,
    }),
});
