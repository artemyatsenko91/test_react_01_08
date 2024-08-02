export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

  if (!emailRegex.test(email)) {
    return false;
  }


  const domain = email.split("@")[1];
  if (domain.endsWith(".ru")) {
    return false;
  }

  return true;
};
