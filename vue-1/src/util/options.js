
function guardComponents (options) {}

function guardProps (options) {}

export function mergeOptions (parent, child, vm) {
  console.log('merge options')
  guardComponents(child)
  guardProps(child)
  if (process.env.NODE_ENV !== 'production') {
    if (child.propsData && !vm) {
      console.log('propsData can only be used as an instantiation option.')
    }
  }
  let options = {}, key
  if (child.extends) {

  }
  // function mergeField (key) {
  //   let strat = strat[key] || defaultStrat
  //   options[key] = strat(parent[key], child[key], vm, key)
  // }
  return options
}