import identity from './identity';

/**
 * This method is similar to lodash `flowRight`. It permits to easily compose
 * several high order components.
 *
 * @static
 * @category Utilities
 * @param {...Function} [funcs] The functions to invoke.
 * @returns {Function} Returns the new composite function.
 * @see https://lodash.com/docs/master#flowRight
 * @example
 *
 * const enhance = compose(pure, withProps({foo: 'bar'}));
 * const Component = enhance(MyComponent);
 */
function compose(...funcs) {
  if (funcs.length === 0) {
    return identity;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  const last = funcs[funcs.length - 1];

  return (...args) => {
    let result = last(...args);
    for (let i = funcs.length - 2; i >= 0; i -= 1) {
      const f = funcs[i];
      result = f(result);
    }
    return result;
  };
}

export default compose;
