import { Element, Root } from 'hast'
import { fromHtml } from 'hast-util-from-html';
import { selectAll } from 'hast-util-select';

interface Option {
  excludes?: string[];
  icon?: boolean;
  iconClass?: string;
  rel?: 'alternate' | 'author' | 'bookmark' | 'canonical' | 'dns-prefetch' | 'external' | 'help' | 'icon' | 'license' | 'manifest' | 'me' | 'modulepreload' | 'next' | 'nofollow' | 'noopener' | 'noreferrer' | 'opener' | 'pingback' | 'preconnect' | 'prefetch' | 'preload' | 'prerender' | 'prev' | 'privacy-policy' | 'search' | 'stylesheet' | 'tag' | 'terms-of-service';
}

export default function rehypeTargetBlank({
  excludes,
  icon,
  iconClass,
  rel,
}: Option = {
  excludes: ['http://localhost', '#'],
  icon: true,
  iconClass: 'ml-1 inline-block align-text-top w-2.5 h-2.5',
  rel: 'external',
}) {
  return (tree: Root): void => {
    selectAll('a', tree)
      .filter(node => isTarget(node, excludes ?? []))
      .map(node => {
        node.properties = {
          ...node.properties,
          target: '_blank',
          rel,
        };
        return node;
      })
      .forEach(node => icon && addExternalIcon(node, iconClass));
  };
}

/**
 * Check whether a specified node is a target.
 *
 * @param node Node to be checked
 * @param excludes URLs to be considered not external links
 * @returns true when the node is a target, otherwise false
 */
function isTarget(node: Element, excludes: string[]): boolean {
  const href = node.properties.href?.toString() ?? '';
  return excludes.filter(exclude => href.startsWith(exclude)).length === 0;
}

/**
 * Add an external icon to a specified node.
 *
 * @param node Node to which an external icon is added
 * @param iconClass CSS classes for an external icon
 */
function addExternalIcon(node: Element, iconClass: string = ''): void {
  const last = node.children.at(-1);
  const icon = createExternalIcon(iconClass);
  (last?.type === 'element' ? last : node).children.push(icon);
}

/**
 * Create an external icon.
 *
 * @param iconClass CSS classes for an external icon
 * @returns Element containing an external icon
 */
function createExternalIcon(iconClass: string = ''): Element {
  return fromHtml(`
    <svg class="${iconClass ?? ''}" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"/>
    </svg>
  `.trim().replaceAll('\n', ''), { fragment: true }) as unknown as Element;
}
