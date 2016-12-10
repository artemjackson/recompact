import {Component} from 'react';
import createHelper from './createHelper';
import createEagerFactory from './createEagerFactory';

/**
 * Provides context to the component's children. `childContextTypes` is an object
 * of React prop types. `getChildContext()` is a function that returns
 * the child context. Use along with `getContext()`.
 *
 * @static
 * @category High-order-components
 * @param {Object} childContextTypes
 * @param {Function} getChildContext
 * @returns {HighOrderComponent} Returns a function that take a Component.
 * @example
 *
 * // Provide window in the context, useful for testing
 * const withWindow = withContext({window: PropTypes.object.isRequired}, () => {window})
 */
const withContext = (childContextTypes, getChildContext) => (BaseComponent) => {
  const factory = createEagerFactory(BaseComponent);
  class WithContext extends Component {
    getChildContext = () => getChildContext(this.props);

    render() {
      return factory(this.props);
    }
  }

  WithContext.childContextTypes = childContextTypes;

  return WithContext;
};

export default createHelper(withContext, 'withContext');
