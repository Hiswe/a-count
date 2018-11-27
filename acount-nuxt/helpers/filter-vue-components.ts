// filter a node list by its tag name
//  • list should be called and rendered in a `render` function
//    or it will loose all informations
//  • don't know why but Type VNode doesn't show vnode.componentOptions.tag
export default (tagName: string) => (vnodes?: any[]): null | any[] => {
  if (!vnodes) return null
  const filteredNodes: any[] = []
  for (let vnode of vnodes) {
    const { tag } = vnode.componentOptions
    if (tag === tagName) filteredNodes.push(vnode)
  }
  return filteredNodes
}
