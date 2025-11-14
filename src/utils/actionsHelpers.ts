import { ActionError } from "astro:actions";

export const validateUserId = (userId: string | undefined): string => {
  if (!userId) {
    throw new ActionError({
      message:
        "Ha ocurrido un error de autenticación. Por favor, recarga la página.",
      code: "UNAUTHORIZED",
    });
  }
  return userId;
};
