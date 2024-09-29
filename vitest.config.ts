import { defineConfig } from "vitest/config";
import path from "path";
import tsconfigPaths from "vitest-tsconfig-paths";

export default defineConfig({
  test: {
    // browser: {
    //   enabled: true,
    //   name: 'chromium',
    //   provider: 'playwright',
    //   // https://playwright.dev
    //   providerOptions: {},
    // },
    reporters: ["html", "verbose"],
    ui: true,
    typecheck: {
      allowJs: true,
      checker: "tsc",
      tsconfig: path.join(path.resolve(), "tsconfig.json"),
    },
    update: true,
    coverage: {
      reporter: ["html", "clover", "json"],
      enabled: true,
      include: [
        "./src/**/*.{test,spec}.?(c|m)[jt]s?(x)",
        "**/__tests__/*.spec.ts",
      ],
      exclude: [
        "**/node_modules/**",
        "**/dist/**",
        "**/cypress/**",
        "**/.{idea,git,cache,output,temp}/**",
        "**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*",
      ],
    },
    benchmark: { reporters: ["default", "verbose"] },
    include: [
      "./src/**/*.{test,spec}.?(c|m)[jt]s?(x)",
      "**/__tests__/*.spec.ts",
    ],
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "**/cypress/**",
      "**/.{idea,git,cache,output,temp}/**",
      "**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*",
    ],
  },
  plugins: [tsconfigPaths()],
});
