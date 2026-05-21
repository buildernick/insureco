export async function forgotPassword(email) {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return { success: true, message: `Password reset link sent to ${email}` };
}
