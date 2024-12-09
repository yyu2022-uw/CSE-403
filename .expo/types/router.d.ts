/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(auth)` | `/(auth)/login` | `/(home)` | `/(home)/` | `/(home)/(tabs)` | `/(home)/(tabs)/` | `/(home)/(tabs)/communities` | `/(home)/(tabs)/communities/` | `/(home)/(tabs)/matching` | `/(home)/(tabs)/matching/` | `/(home)/(tabs)/matching/detail/match` | `/(home)/(tabs)/matching/detail/matchDetail` | `/(home)/(tabs)/matching/home` | `/(home)/(tabs)/matching/home/` | `/(home)/(tabs)/profile` | `/(home)/(tabs)/profile/` | `/(home)/(tabs)/profile/detail/profile` | `/(home)/channel` | `/(home)/channel/` | `/(home)/communities` | `/(home)/communities/` | `/(home)/matching` | `/(home)/matching/` | `/(home)/matching/detail/match` | `/(home)/matching/detail/matchDetail` | `/(home)/matching/home` | `/(home)/matching/home/` | `/(home)/profile` | `/(home)/profile/` | `/(home)/profile/detail/profile` | `/(tabs)` | `/(tabs)/` | `/(tabs)/communities` | `/(tabs)/communities/` | `/(tabs)/matching` | `/(tabs)/matching/` | `/(tabs)/matching/detail/match` | `/(tabs)/matching/detail/matchDetail` | `/(tabs)/matching/home` | `/(tabs)/matching/home/` | `/(tabs)/profile` | `/(tabs)/profile/` | `/(tabs)/profile/detail/profile` | `/_sitemap` | `/channel` | `/channel/` | `/communities` | `/communities/` | `/login` | `/matching` | `/matching/` | `/matching/detail/match` | `/matching/detail/matchDetail` | `/matching/home` | `/matching/home/` | `/profile` | `/profile/` | `/profile/detail/profile`;
      DynamicRoutes: `/(home)/channel/${Router.SingleRoutePart<T>}` | `/channel/${Router.SingleRoutePart<T>}`;
      DynamicRouteTemplate: `/(home)/channel/[cid]` | `/channel/[cid]`;
    }
  }
}
