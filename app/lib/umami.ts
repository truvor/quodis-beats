export function umamiAttr(name: string) {
  return process.env.NODE_ENV === 'production'
    ? { 'data-umami-event': name }
    : {};
}