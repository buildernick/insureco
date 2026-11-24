import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Demo-only fake API: POST /api/forgot-password (no real PIN is generated or sent)
// and POST /api/verify-otp (accepts any 6-digit PIN).
const fakeOtpApi = () => {
  const readJson = (req) =>
    new Promise((resolve) => {
      let body = '';
      req.on('data', (chunk) => (body += chunk));
      req.on('end', () => {
        try {
          resolve(JSON.parse(body || '{}'));
        } catch {
          resolve({});
        }
      });
    });

  const send = (res, status, payload) => {
    res.statusCode = status;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(payload));
  };

  const handler = async (req, res, next) => {
    if (req.method !== 'POST') return next();
    if (req.url === '/api/forgot-password') {
      const { email } = await readJson(req);
      if (!email) return send(res, 400, { error: 'Email is required' });
      return send(res, 200, { success: true, message: 'One-time PIN sent (demo)', expiresInSeconds: 600 });
    }
    if (req.url === '/api/verify-otp') {
      const { pin } = await readJson(req);
      if (!/^\d{6}$/.test(pin || '')) return send(res, 400, { error: 'Enter a valid 6-digit PIN' });
      return send(res, 200, { success: true });
    }
    return next();
  };

  return {
    name: 'fake-otp-api',
    configureServer(server) {
      server.middlewares.use(handler);
    },
    configurePreviewServer(server) {
      server.middlewares.use(handler);
    },
  };
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), fakeOtpApi()],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern',
      },
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/__tests__/setup.js",
    css: false, // Skip CSS processing in tests
    coverage: {
      provider: 'v8',
      reporter: ['text'],
      reportOnFailure: true,
      include: ['src/**/*.{js,jsx}'],
      exclude: [
        'src/__tests__/**',
        'src/main.jsx',
        'src/component-examples/**',
        '**/*.stories.{js,jsx}',
      ],
    },
  },
});
