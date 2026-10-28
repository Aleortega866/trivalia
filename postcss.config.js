import postcss from 'postcss';
import tailwindcss from 'tailwindcss';

// Tailwind solo procesa src/landing.css; styles.css (con su propio @layer base) queda intacto.
const tailwind = postcss([tailwindcss()]);

const tailwindLandingOnly = {
  postcssPlugin: 'tailwind-landing-only',
  async Once(root, { result }) {
    const file = root.source?.input.file ?? '';
    if (!file.endsWith('landing.css')) return;
    const out = await tailwind.process(root.toString(), { from: file });
    root.removeAll();
    root.append(out.root.nodes);
    result.messages.push(...out.messages); // dependencias: recarga al editar LandingPage.tsx
  },
};

export default { plugins: [tailwindLandingOnly] };
