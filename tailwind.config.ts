import type { Config } from 'tailwindcss';
export default { content: ['./app/**/*.{ts,tsx}'], theme: { extend: { colors: { ink: '#1e2a25', cream: '#fbfaf6', sage: '#dce9df', moss: '#315a48', coral: '#ed7259', gold: '#efa85b' }, boxShadow: { soft: '0 18px 60px rgba(40, 65, 52, .10)' } } }, plugins: [] } satisfies Config;
