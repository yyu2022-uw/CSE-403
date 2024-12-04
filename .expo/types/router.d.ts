/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(home)` | `/(home)/` | `/(home)/(tabs)` | `/(home)/(tabs)/` | `/(home)/(tabs)/communities` | `/(home)/(tabs)/communities/communityList` | `/(home)/(tabs)/communities/communityPage` | `/(home)/(tabs)/communities/editCommunities` | `/(home)/(tabs)/matching` | `/(home)/(tabs)/matching/` | `/(home)/(tabs)/matching/detail/match` | `/(home)/(tabs)/matching/detail/mentorDetail` | `/(home)/(tabs)/matching/home` | `/(home)/(tabs)/matching/home/` | `/(home)/(tabs)/profile` | `/(home)/channel` | `/(home)/channel/` | `/(home)/communities` | `/(home)/communities/communityList` | `/(home)/communities/communityPage` | `/(home)/communities/editCommunities` | `/(home)/matching` | `/(home)/matching/` | `/(home)/matching/detail/match` | `/(home)/matching/detail/mentorDetail` | `/(home)/matching/home` | `/(home)/matching/home/` | `/(home)/profile` | `/(tabs)` | `/(tabs)/` | `/(tabs)/communities` | `/(tabs)/communities/communityList` | `/(tabs)/communities/communityPage` | `/(tabs)/communities/editCommunities` | `/(tabs)/matching` | `/(tabs)/matching/` | `/(tabs)/matching/detail/match` | `/(tabs)/matching/detail/mentorDetail` | `/(tabs)/matching/home` | `/(tabs)/matching/home/` | `/(tabs)/profile` | `/_sitemap` | `/channel` | `/channel/` | `/communities` | `/communities/communityList` | `/communities/communityPage` | `/communities/editCommunities` | `/matching` | `/matching/` | `/matching/detail/match` | `/matching/detail/mentorDetail` | `/matching/home` | `/matching/home/` | `/profile`;
      DynamicRoutes: `/(home)/channel/${Router.SingleRoutePart<T>}` | `/channel/${Router.SingleRoutePart<T>}`;
      DynamicRouteTemplate: `/(home)/channel/[cid]` | `/channel/[cid]`;
    }
  }
}
