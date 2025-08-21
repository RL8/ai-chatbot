import { cookies } from 'next/headers';
import { TaylorSwiftDiscography } from '@/components/music/TaylorSwiftDiscography';
import { auth } from '../(auth)/auth';
import { redirect } from 'next/navigation';

export default async function TaylorSwiftPage() {
  const session = await auth();

  if (!session) {
    redirect('/api/auth/guest');
  }

  return (
    <div className="h-full w-full">
      <TaylorSwiftDiscography />
    </div>
  );
}
