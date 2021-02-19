const getters = {
  // pagesCacheType: state => state.pagesCache.type,
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  roles: state => state.user.roles,
  functionCode: state => state.user.functionCode,
  companyInfo: state => state.user.companyInfo,
  tagsArr: state => state.navTags.tagsArr
}
export default getters
