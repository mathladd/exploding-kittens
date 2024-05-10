import BaseLayout from 'layout/BaseLayout';
import Stack from 'components/Stack';
import LoginModule from 'modules/loginModule';

export default function LobbyPage() {
  return (
    <BaseLayout>
      <Stack className="flex-col flex-1 relative w-full min-h-full justify-center items-center my-4">
        <LoginModule />
      </Stack>
    </BaseLayout>
  );
}
