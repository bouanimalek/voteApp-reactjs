export const Routes = {
  // pages
  Dashboard: { path: "/dashboard" },
  Signin: { path: "/sign-in" },
  Signup: { path: "/sign-up" },
  ForgotPassword: { path: "/forgot-password" },
  ResetPassword: { path: "/reset-password/:token" },
  NotFound: { path: "/404" },
  ServerError: { path: "/500" },

  AddSubject: { path: "/subjects/create" },
  ShowSubject: { path: "/subjects/show/:idSubject" },
};
