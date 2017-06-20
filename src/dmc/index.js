import { constants as getters } from '../store/getters';
import { constants as states } from '../store/states';

export default function() {
  const store = this.riotx.get();

  const isEnabled = store.getter(getters.MENU_ENABLED);
  const isOpened = store.getter(getters.MENU_OPENED);
  this.isMenuOpened = isEnabled && isOpened;
  // 表示すべきページの名前。
  this.pageName = store.getter(getters.LOCATION_NAME);
  // 表示すべきページのルーティング情報。
  this.pageRoute = store.getter(getters.LOCATION_ROUTE);

  // TODO: riotx update後に修正すること。
  this.on('mount', () => {
    store.change(states.APPLICATION, this.handleApplicationStateChange);
    store.change(states.LOCATION, this.handleLocationStateChange);
    store.change(states.MENU, this.handleMenuStateChange);
  }).on('unmount', () => {
    store.off(states.APPLICATION, this.handleApplicationStateChange);
    store.off(states.LOCATION, this.handleLocationStateChange);
    store.off(states.MENU, this.handleMenuStateChange);
  });

  // `application`情報が変更された時の処理。
  this.handleApplicationStateChange = () => {
    this.isLaunched = store.getter(getters.APPLICATION_ISLAUNCHED);
    this.isNavigating = store.getter(getters.APPLICATION_ISNAVIGATING);
    this.isNetworking = store.getter(getters.APPLICATION_ISNETWORKING);
    this.isBlocked = this.isLaunched && !this.isNavigating && !this.isNetworking;
    this.update();
  };

  // `location`情報が変更された時の処理。
  this.handleLocationStateChange = () => {
    this.pageName = store.getter(getters.LOCATION_NAME);
    this.pageRoute = store.getter(getters.LOCATION_ROUTE);
    this.update();
  };

  // `menu`情報が変更された時の処理。
  this.handleMenuStateChange = () => {
    const isEnabled = store.getter(getters.MENU_ENABLED);
    const isOpened = store.getter(getters.MENU_OPENED);
    this.isMenuOpened = isEnabled && isOpened;
    this.update();
  };
}