import BaseLayout from 'layout/BaseLayout';
import Stack from 'components/Stack';
import RoomModule from 'modules/roomModule';

export default function RoomPage() {
  return (
    <BaseLayout>
      <Stack className="flex-col flex-1 relative w-full min-h-full justify-center items-center my-4">
        <RoomModule />
      </Stack>
    </BaseLayout>
  );
}
