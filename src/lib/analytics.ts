type PostHog = typeof import('posthog-js').default;

let ph: PostHog | null = null;
let loading: Promise<PostHog> | null = null;

function load(): Promise<PostHog> {
  if (!loading) {
    loading = import('posthog-js').then(m => {
      ph = m.default;
      return ph;
    });
  }
  return loading;
}

export function capture(event: string, properties?: Record<string, unknown>) {
  if (ph) {
    ph.capture(event, properties);
  } else {
    load().then(p => p.capture(event, properties));
  }
}

export async function init(key: string, options: Record<string, unknown>) {
  const p = await load();
  p.init(key, options);
}
