import { Root } from 'hast';
interface Option {
    excludes?: string[];
    icon?: boolean;
    iconClass?: string;
    rel?: 'alternate' | 'author' | 'bookmark' | 'canonical' | 'dns-prefetch' | 'external' | 'help' | 'icon' | 'license' | 'manifest' | 'me' | 'modulepreload' | 'next' | 'nofollow' | 'noopener' | 'noreferrer' | 'opener' | 'pingback' | 'preconnect' | 'prefetch' | 'preload' | 'prerender' | 'prev' | 'privacy-policy' | 'search' | 'stylesheet' | 'tag' | 'terms-of-service';
}
export default function rehypeTargetBlank({ excludes, icon, iconClass, rel, }?: Option): (tree: Root) => void;
export {};
