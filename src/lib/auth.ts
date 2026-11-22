
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
                required: true,
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
            // Only student and tutor can register.
            if (ctx.path === "/sign-up/email") {
                const allowedRoles = ["student", "tutor"];
                const role = ctx.body?.role;

                if (!allowedRoles.includes(role)) {
                    throw new APIError("BAD_REQUEST", {
                        message: "Only student and tutor roles are allowed.",
                    });
                }
            }

            // Users cannot change their role after registration.
            if (ctx.path === "/update-user" && ctx.body?.role !== undefined) {
                throw new APIError("BAD_REQUEST", {
                    message: "Role cannot be changed.",
                });
            }
        }),
    },

    database: mongodbAdapter(db, {
        client,
    }),
});
