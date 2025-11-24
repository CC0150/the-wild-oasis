import Spinner from "@/ui/Spinner";
import { Suspense } from "react";

const PageLoader = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<Spinner />}>{children}</Suspense>
);

export default PageLoader;
