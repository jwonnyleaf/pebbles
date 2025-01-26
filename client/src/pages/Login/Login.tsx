import { GalleryVerticalEnd } from 'lucide-react';

import { LoginForm } from '@/components/login-form';

import templogin from '@/assets/pebbles.jpg';

export default function Login() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 bg-green text-silver">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-3 md:justify-start">
          <a href="/" className="flex items-center gap-6 text-xl font-medium">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-16" />
            </div>
            Pebbles.
          </a>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src={templogin}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover "
        />
      </div>
    </div>
  );
}
