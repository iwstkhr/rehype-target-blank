import { Element, Root } from 'hast';
import { fromHtml } from 'hast-util-from-html';
import rehypeTargetBlank from './index.js';

function createNode(): Root {
  return fromHtml(
    '<span><a href="https://github.com">GitHub</a></span>',
    { fragment: true },
  );
}

function getAnchor(node: Root): Element {
  return (node.children[0] as unknown as Element).children[0] as unknown as Element;
}

function getIcon(element: Element): Element {
  return (element.children[1] as unknown as Element).children[0] as unknown as Element;
}

test('rehypeTargetBlank - 1', () => {
  const func = rehypeTargetBlank({
    excludes: ['http://localhost'],
    icon: true,
    iconClass: 'ml-1 inline-block align-text-top w-2.5 h-2.5',
    rel: 'external',
  });
  const node = createNode();
  func(node);

  const a = getAnchor(node);
  expect(a.properties.target).toBe('_blank');
  expect(a.properties.rel).toBe('external');

  const icon = getIcon(a);
  expect(icon.tagName).toBe('svg');
  expect(icon.properties.className)
    .toEqual('ml-1 inline-block align-text-top w-2.5 h-2.5'.split(' '));
});

test('rehypeTargetBlank - 2', () => {
  const func = rehypeTargetBlank({
    excludes: ['https://github'],
  });
  const node = createNode();
  func(node);

  const a = getAnchor(node);
  expect(a.properties.target).toBeUndefined();
  expect(a.properties.rel).toBeUndefined();
});
