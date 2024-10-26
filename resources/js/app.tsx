import "./bootstrap";
import "../css/app.css";

import { createRoot } from "react-dom/client";
import { createInertiaApp, Head } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { TerminalProvider } from "./Providers/TerminalProvider";
import { TooltipProvider } from "@radix-ui/react-tooltip";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) =>
    resolvePageComponent(
      `./Pages/${name}.tsx`,
      import.meta.glob("./Pages/**/*.tsx"),
    ),
  setup({ el, App, props }) {
    const root = createRoot(el);

    root.render(
      <TooltipProvider>
        <TerminalProvider>
          <App {...props} />
        </TerminalProvider>
      </TooltipProvider>,
    );
  },
  progress: {
    color: "#35e668",
  },
});
