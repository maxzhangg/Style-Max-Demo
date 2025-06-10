// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Style-Max-Demo/', // ← 这里改成你的 GitHub 仓库名（不是用户名）
  plugins: [react()],
});
