import { defaultSchema } from 'rehype-sanitize';
import { contentUrl, youtubeId } from './urls.mjs';

const formattingClass = /^source-(?:(?:size|line|gap)-\d+(?:_\d+)?|(?:margin|padding)-(?:top|right|bottom|left)-\d+(?:_\d+)?|weight-[1-9]00|face-barlow-(?:extralight|light|medium|semibold)|(?:color|background)-[a-f0-9]{6}|align-(?:left|center|right)|float-(?:left|right)|video)$/;

export const articleHtmlSchema = {
  ...defaultSchema,
  tagNames: [...defaultSchema.tagNames, 'u'],
  attributes: {
    ...Object.fromEntries(Object.entries(defaultSchema.attributes).map(([tag, attributes]) => [
      tag,
      attributes.map((attribute) => Array.isArray(attribute) && attribute[0] === 'className' ? [...attribute, formattingClass] : attribute),
    ])),
    '*': [
      ...(defaultSchema.attributes['*'] || []),
      ['className', formattingClass],
    ],
    div: [...(defaultSchema.attributes.div || []), ['dataYoutubeId', /^[A-Za-z0-9_-]{11}$/]],
  },
};

/** @param {{ base: string }} options */
export function contentHtmlUrls({ base }) {
  return function transform(tree) {
    function walk(node) {
      if (node.type === 'element') {
        if (node.tagName === 'div' && node.properties?.className?.includes('source-video')) {
          youtubeId(node.properties.dataYoutubeId || '');
        }
        for (const property of ['href', 'src']) {
          if (typeof node.properties?.[property] === 'string') {
            node.properties[property] = contentUrl(node.properties[property], base);
          }
        }
      }
      node.children?.forEach(walk);
    }
    walk(tree);
  };
}
