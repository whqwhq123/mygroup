const getters = {
  // pagesCacheType: state => state.pagesCache.type,
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  roles: state => state.user.roles,
  tagsArr: state => state.navTags.tagsArr,
}
export default getters
