import { Route, Switch } from "wouter";
import { Home } from "@/pages/Home";
import { NotFound } from "@/pages/NotFound";

/**
 * Root layout. The site is a single scrolling page; the catch-all route only
 * exists so a mistyped deep link renders something deliberate rather than a
 * blank document after the host rewrite.
 */
export default function App() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}
