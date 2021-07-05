import * as historyApi from 'history';

const history = historyApi.createBrowserHistory();
export default history;

export function forwardTo(location: string): void {
  history.push(location);
}

export function goBack(): void {
  history.back();
}
