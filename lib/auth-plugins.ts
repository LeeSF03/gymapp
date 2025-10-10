import { BetterAuthClientPlugin } from "better-auth"
import { APIError, createAuthEndpoint } from "better-auth/api"
import { BetterAuthPlugin } from "better-auth/plugins"
import * as z from "zod"

export const credentialVerifier = () => {
  return {
    id: "sign-in-credential-verifier",
    endpoints: {
      verifyCredential: createAuthEndpoint(
        "/sign-in/credential-verifier",
        {
          method: "POST",
          body: z.object({
            email: z.email("You need to provide a valid email address"),
            password: z
              .string()
              .min(8, "Password must be at least 8 characters"),
          }),
        },
        async (ctx) => {
          const { email, password } = ctx.body

          const userAccount =
            await ctx.context.internalAdapter.findUserByEmail(email)
          if (!userAccount) {
            throw new APIError("BAD_REQUEST", {
              message: "Invalid email or password",
            })
          }

          const { accounts } = userAccount
          const account = accounts.find(
            (acc) => acc.providerId === "credential"
          )

          if (!account?.password || !password) {
            throw new APIError("BAD_REQUEST", {
              message: "No password credential found",
            })
          }

          const compare = await ctx.context.password.verify({
            hash: account.password,
            password,
          })

          if (!compare) {
            throw new APIError("BAD_REQUEST", {
              message: "Invalid email or password",
            })
          }

          return ctx.json({
            success: true,
          })
        }
      ),
    },
  } satisfies BetterAuthPlugin
}

export const credentialVerifierClient = () => {
  return {
    id: "sign-in-credential-verifier-client",
    $InferServerPlugin: {} as ReturnType<typeof credentialVerifier>,
  } satisfies BetterAuthClientPlugin
}
