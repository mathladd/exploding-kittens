import BaseLayout from 'layout/BaseLayout';
import Stack from 'components/Stack';
import SignupModule from 'modules/signupModule';

export default function SignupPage() {
  return (
    <BaseLayout>
      <Stack className="flex-col flex-1 relative w-full min-h-full justify-center items-center my-4">
        <SignupModule />
      </Stack>
    </BaseLayout>
  );
}
