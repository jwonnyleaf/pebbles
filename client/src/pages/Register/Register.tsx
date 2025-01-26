import { RegisterForm } from '@/components/register-form';
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
} from '@/components/ui';

export default function Register() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <Card className="w-[350px]">
        <CardHeader>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
      </Card>
    </div>
  );
}
