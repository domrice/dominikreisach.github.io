import { unified } from "@astrojs/markdown-remark";

// the slice of a hast node this walk reads; hast's own types are not a dependency here
type Node = { type: string; tagName?: string; properties?: Record<string, unknown>; children?: Node[] };

// One spelling for every link that leaves the site. `rel="noopener"` is implicit
// beside `target="_blank"` in current browsers, but stating it keeps older ones
// safe and — more usefully — makes outbound links a single greppable decision
// instead of twelve independent ones.
export const external = { target: "_blank", rel: "noopener" } as const;

// …and one spelling for "does this link leave the site at all". `mailto:` takes
// neither attribute: `_blank` on a mail scheme leaves a stray blank tab behind in
// some browsers, and not binding it also keeps the `a[target="_blank"]` arrow rule
// and the "opens in a new tab" suffix off links that open no tab.
export const isExternal = (href: string) => href.startsWith("http");

// absolute URLs in markdown open in a new tab, on the same `external` terms as
// every hand-written outbound link
const walk = (node: Node) => {
  if (node.tagName === "a" && node.properties && isExternal(String(node.properties.href)))
    Object.assign(node.properties, external);
  node.children?.forEach(walk);
};

// the one markdown pipeline: work bodies (astro.config) and pitch blurbs both render
// through it
export const markdown = unified({ rehypePlugins: [() => walk] });
