import swagger from '../../../core/swagger';
import { constants as actions } from '../../../store/actions';
import { constants as getters } from '../../../store/getters';
import '../../atoms/dmc-message/index.tag';

export default {
  /**
   * ページ遷移前の処理。
   * @param {riotx.Store} store
   * @param {Object} route
   * @param {Function} replace
   * @return {Promise}
   */
  onBefore: (store, route, replace) => {
    const endpointKey = route.params.endpointKey;
    const endpoint = store.getter(getters.ENDPOINTS_ONE, endpointKey);

    // endpointが存在しなければTOPに戻す。
    if (!endpoint) {
      return Promise
        .resolve()
        .then(() => store.action(actions.CURRENT_REMOVE))
        .then(() => {
          replace('/');
        })
        .catch(err => store.action(actions.MODALS_ADD, 'dmc-message', {
          error: err
        }));
    }

    return Promise
      .resolve()
      .then(() => store.action(actions.CURRENT_UPDATE, endpointKey))
      .then(() => {
        // 無駄な通信を減らすために、`dmc`データを未取得の場合のみfetchする。
        const dmc = store.getter(getters.DMC);
        if (!!dmc) {
          return Promise.resolve();
        }
        return Promise
          .resolve()
          .then(() => swagger.setup(endpoint))
          .then(() => store.action(actions.DMC_GET));
      })
      .catch(err => store.action(actions.MODALS_ADD, 'dmc-message', {
        error: err
      }));
  },

  /**
   * ページ遷移時の処理。
   * @param {riotx.Store} store
   * @param {Object} route
   * @return {Promise}
   */
  onEnter: (store, route) => {// eslint-disable-line no-unused-vars
    return store.action(actions.LOCATION_UPDATE, {
      name: 'empty',
      route
    });
  }
};