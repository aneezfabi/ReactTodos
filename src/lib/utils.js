export const partial = (fn, ...args) => fn.bind(null, ...args)
/* first args is rest args which gives ,separated arguments
   second args is spread oprtr which takes that to an array */

const _pipe = (f, g) => (...args) => g(f(...args))

export const pipe = (...fns) => fns.reduce(_pipe)