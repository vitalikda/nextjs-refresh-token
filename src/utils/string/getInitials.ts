export const getInitials = (name: string) => {
  const initials = name
    .split(" ")
    .map((n) => n.charAt(0))
    .join("");
  return initials.toUpperCase();
};
