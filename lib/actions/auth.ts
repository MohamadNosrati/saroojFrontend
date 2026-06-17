"use server";

import { cookies } from "next/headers";
import { z } from "zod";
import { AxiosError } from "axios";

import { authServices } from "../services/auth";
import { IUser } from "../types/user";
import { AUTH_COOKIE_KEY } from "../constants/user";

const loginSchema = z.object({
  email: z.string(),
  password: z.string().min(1, "Password is required"),
});

export type LoginState = {
  errors?: {
    email?: string[];
    password?: string[];
    _form?: string[];
  };
  success?: boolean;
  user?: IUser;
};

export async function login(
  prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  // 1. Validate form data
  const validatedFields = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  try {
    const response = await authServices.signin({
      email,
      password,
    });

    (await cookies()).set(
      String(AUTH_COOKIE_KEY),
      String(response?.data?.data?.token),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24,
        path: "/",
      },
    );

    return {
      success: true,
      user: response?.data?.data?.user,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.status === 400) {
        return {
          errors: {
            _form: ["ایمیل یا رمز عبور اشتباه است."],
          },
        };
      } else {
        return {
          errors: {
            _form: ["there is a problem please try again!"],
          },
        };
      }
    } else {
      return {
        errors: {
          _form: ["there is a problem please try again!"],
        },
      };
    }
  }
}

export async function logout(): Promise<{
  success: boolean;
}> {
  try {
    const cookieStore = await cookies();

    cookieStore.delete(AUTH_COOKIE_KEY);

    return {
      success: true,
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
    };
  }
}

export async function getCookie() {
  const cookiesStore = await cookies();

  return cookiesStore.get(AUTH_COOKIE_KEY)?.value;
}
