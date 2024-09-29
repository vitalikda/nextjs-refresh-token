import Image from "next/image";
import Link from "next/link";
import { Button } from "src/components/ui/button";
import { publicPaths } from "src/configs/routes";

export default function HomePage() {
  return (
    <section className="flex h-screen w-screen items-center justify-center overflow-hidden bg-black text-white">
      <div className="container flex h-full w-full flex-col items-center justify-center px-4 md:flex-row">
        <div className="max-w-4xl space-y-8">
          <h1 className="text-balance text-5xl font-bold tracking-tighter">
            Next.js 14 refresh token rotation with http only cookies and
            external backend (Hono.js)
          </h1>
          <div>
            <Link href={publicPaths.login}>
              <Button size="lg" variant="secondary">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
        <div className="w-full">
          <Image
            src="https://doodleipsum.com/500/abstract"
            alt=""
            width={500}
            height={500}
            className="aspect-square"
          />
        </div>
      </div>
    </section>
  );
}
