import { useCallback, useEffect, useRef, useState } from "react";
import { categoryOrder, works, type Category } from "@/data/portfolio";

export type View = "canvas" | "archive" | "about";
export type Filter = Category | "all";

export interface Route {
  view: View;
  filter: Filter;
  work: string | null;
}

const initialRoute: Route = { view: "canvas", filter: "all", work: null };

function parse(hash: string, previous: Route): Route {
  const [head, argument] = hash.replace(/^#\/?/, "").split("/");
  if (head === "works" && works.some((work) => work.id === argument)) {
    return { ...previous, work: argument };
  }
  if (head === "archive") {
    const filter = categoryOrder.find((category) => category === argument);
    return { view: "archive", filter: filter ?? "all", work: null };
  }
  if (head === "about") return { ...previous, view: "about", work: null };
  return { ...previous, view: "canvas", work: null };
}

export function viewHash({ view, filter }: Route) {
  if (view === "archive")
    return filter === "all" ? "#archive" : `#archive/${filter}`;
  return view === "about" ? "#about" : "#";
}

export function useRoute() {
  const [route, setRoute] = useState(initialRoute);
  const openedInPage = useRef(false);

  useEffect(() => {
    const sync = () => {
      setRoute((previous) => {
        const next = parse(window.location.hash, previous);
        if (!previous.work && next.work)
          openedInPage.current = previous !== initialRoute;
        return next;
      });
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const closeWork = useCallback(() => {
    if (openedInPage.current) window.history.back();
    else window.location.replace(viewHash(route));
  }, [route]);

  const stepWork = useCallback(
    (direction: number) => {
      const index = works.findIndex((work) => work.id === route.work);
      const next = works[index + direction];
      if (next) window.location.replace(`#works/${next.id}`);
    },
    [route.work],
  );

  return { route, closeWork, stepWork };
}
