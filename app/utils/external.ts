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
