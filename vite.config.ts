import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { devParticipantsApi } from './dev/participants-api.ts';

export default defineConfig({
  plugins: [react(), devParticipantsApi()],
});
