export const youtubeIdPattern = /^[A-Za-z0-9_-]{11}$/;

/** @param {string} value */
export function youtubeId(value) {
  if (youtubeIdPattern.test(value)) return value;
  let url;
  try {
    url = new URL(value);
  } catch {
    throw new Error('Use an 11-character YouTube ID or an HTTPS YouTube video link.');
  }
  if (url.protocol !== 'https:' || url.username || url.password || url.port) {
    throw new Error('YouTube links must use HTTPS without credentials or custom ports.');
  }
  let id;
  if (url.hostname === 'youtu.be') id = url.pathname.slice(1);
  if (['youtube.com', 'www.youtube.com', 'm.youtube.com'].includes(url.hostname)) {
    if (url.pathname === '/watch') id = url.searchParams.get('v');
    else id = url.pathname.match(/^\/(?:embed|shorts)\/([^/]+)\/?$/)?.[1];
  }
  if (!id || !youtubeIdPattern.test(id)) throw new Error('This is not a supported YouTube video link.');
  return id;
}

/** @param {string} value */
export function padletUrl(value) {
  if (!value) return '';
  const url = new URL(value);
  if (
    url.protocol !== 'https:' || url.hostname !== 'padlet.com' ||
    url.username || url.password || url.port ||
    !/^\/(?:embed\/)?[A-Za-z0-9_-]+(?:\/[A-Za-z0-9_-]+)?\/?$/.test(url.pathname) ||
    url.search || url.hash
  ) {
    throw new Error('Use an HTTPS padlet.com board or embed URL, without query parameters.');
  }
  return url.href;
}

/** @param {string} value @param {string} base */
export function withBase(value, base) {
  const prefix = `/${base.split('/').filter(Boolean).join('/')}`;
  const root = prefix === '/' ? '' : prefix;
  const decoded = decodeURIComponent(value.split(/[?#]/)[0]);
  if (!value.startsWith('/') || value.startsWith('//') || value.includes('\\') ||
    decoded.includes('\\') || /(?:^|\/)\.\.?(?:\/|$)/.test(decoded) ||
    /[\u0000-\u001f]/.test(decoded)) {
    throw new Error(`Expected a safe site-relative path: ${value}`);
  }
  if (root && (value === root || value.startsWith(`${root}/`))) return value;
  return `${root}${value}`;
}

/** @param {string} value */
export function mediaPath(value) {
  return /^\/media\/(?:[A-Za-z0-9._-]+\/)*[A-Za-z0-9._-]+\.(?:jpe?g|png|webp|gif)$/i.test(value) &&
    !value.split('/').some((part) => part === '..' || part === '.');
}

/** @param {string} value @param {string} base */
export function contentUrl(value, base) {
  if (value.startsWith('#')) return value;
  if (value.startsWith('/') && !value.startsWith('//')) return withBase(value, base);
  const url = new URL(value);
  if (url.protocol === 'mailto:' && !/[\r\n]/.test(decodeURIComponent(value))) return value;
  if (url.protocol !== 'https:' || url.username || url.password) {
    throw new Error(`Unsupported content URL: ${value}`);
  }
  if (['www.pzrt.org', 'pzrt.org'].includes(url.hostname) &&
    (/^\/(?:post\/|videos\/?$|blog\/?$|contact\/?$|bulletin-wall-2021\/?$)/.test(url.pathname) || url.pathname === '/')) {
    return withBase(`${url.pathname}${url.search}${url.hash}`, base);
  }
  return value;
}

/** @param {{ base: string }} options */
export function contentUrls({ base }) {
  /** @param {{ type: string, url?: string, children?: object[] }} tree */
  return function transform(tree) {
    /** @param {{ type: string, url?: string, children?: object[] }} node */
    function walk(node) {
      if (['link', 'image', 'definition'].includes(node.type) && node.url) {
        node.url = contentUrl(node.url, base);
      }
      node.children?.forEach(walk);
    }
    walk(tree);
  };
}
