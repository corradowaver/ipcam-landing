export function classNames(...names: Array<false | null | string | undefined>) {
  return names.filter((name): name is string => Boolean(name)).join(' ')
}
