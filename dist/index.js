import { fromHtml } from 'hast-util-from-html';
import { visit } from 'unist-util-visit';
export default function rehypeTargetBlank({ excludes, icon, iconClass, rel, } = {
    excludes: ['http://localhost', '#'],
    icon: true,
    iconClass: 'ml-1 inline-block align-text-top w-2.5 h-2.5',
    rel: 'external',
}) {
    return (tree) => {
        visit(tree, 'element', (node) => {
            if (!isTarget(node, excludes !== null && excludes !== void 0 ? excludes : [])) {
                return;
            }
            node.properties = Object.assign(Object.assign({}, node.properties), { target: '_blank', rel });
            icon && addExternalIcon(node, iconClass);
        });
    };
}
/**
 * Check whether a specified node is a target.
 *
 * @param node Node to be checked
 * @param excludes URLs to be considered not external links
 * @returns true when the node is a target, otherwise false
 */
function isTarget(node, excludes) {
    var _a, _b;
    const href = (_b = (_a = node.properties.href) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : '';
    return node.tagName === 'a'
        && excludes.filter(exclude => href.startsWith(exclude)).length === 0;
}
/**
 * Add an external icon to a specified node.
 *
 * @param node Node to which an external icon is added
 * @param iconClass CSS classes for an external icon
 */
function addExternalIcon(node, iconClass = '') {
    const last = node.children.at(-1);
    const icon = createExternalIcon(iconClass);
    ((last === null || last === void 0 ? void 0 : last.type) === 'element' ? last : node).children.push(icon);
}
/**
 * Create an external icon.
 *
 * @param iconClass CSS classes for an external icon
 * @returns Element containing an external icon
 */
function createExternalIcon(iconClass = '') {
    return fromHtml(`
    <svg class="${iconClass !== null && iconClass !== void 0 ? iconClass : ''}" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"/>
    </svg>
  `.trim().replaceAll('\n', ''), { fragment: true });
}
