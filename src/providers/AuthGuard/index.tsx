import { Suspense } from "react";
import { AuthGuard } from "./AuthGuard";

const SuspenseAuthGuard = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense fallback={null}>
      <AuthGuard>{children}</AuthGuard>
    </Suspense>
  );
};

export default SuspenseAuthGuard;
