export const getSales = async () => {
  return [
    {
      avatarSrc:
        "https://doodleipsum.com/500x500/avatar?i=8fd12c2f2a98330d78603c51bc8aed95",
      name: "Olivia Martin",
      email: "olivia.martin@email.com",
      amount: "$1,999.00",
    },
    {
      avatarSrc:
        "https://doodleipsum.com/500x500/avatar?i=0512365fbc5f44dc6d964e17e6900bb4",
      name: "Jackson Lee",
      email: "jackson.lee@email.com",
      amount: "$39.00",
    },
    {
      avatarSrc:
        "https://doodleipsum.com/500x500/avatar?i=29d0717893ed6e5e964b32f888f29cc1",
      name: "Isabella Nguyen",
      email: "isabella.nguyen@email.com",
      amount: "$299.00",
    },
    {
      avatarSrc:
        "https://doodleipsum.com/500x500/avatar?i=7094be8d9b8779e18696f23102e378bf",
      name: "William Kim",
      email: "will@email.com",
      amount: "$99.00",
    },
    {
      avatarSrc:
        "https://doodleipsum.com/500x500/avatar?i=4eb7231368706e403353b433848826c9",
      name: "Sofia Davis",
      email: "sofia.davis@email.com",
      amount: "$39.00",
    },
  ];
};

export const getSalesStats = async () => {
  // prettier-ignore
  const labels = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  return labels.map((name) => ({
    name,
    total: Math.floor(Math.random() * 5000) + 1000,
  }));
};
