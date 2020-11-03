class UserSettings {
  constructor(public orderBy: string = 'importance', public orderDirection: number = -1, public showFinished: boolean = false, public theme: string = 'light') {
  }
}

export const sessionUserSettings = (req, res, next) => {
  const userSettings: UserSettings = req.session.userSettings || new UserSettings();
  const {orderBy, showFinished, theme} = req.body
  const ALLOWED_ORDERBY_VALUES: string [] = ['importance', 'createDate', 'finishDate']
  const ALLOWED_THEME_VALUES: string [] = ['light', 'dark']
  const ALLOWED_ORDER_DIRECTION_VALUES: number [] = [-1, 1]

  if (orderBy) {
    if (ALLOWED_ORDERBY_VALUES.includes(orderBy)) {
      userSettings.orderBy = orderBy
    }
    if (ALLOWED_ORDER_DIRECTION_VALUES.includes(userSettings.orderDirection)) {
      userSettings.orderDirection = userSettings.orderBy === orderBy ? userSettings.orderDirection * -1 : -1
    }
  }
  if (showFinished) {
    userSettings.showFinished = 'true' === showFinished
  }
  if (theme && ALLOWED_THEME_VALUES.includes(theme)) {
    userSettings.theme = theme
  }
  req.userSettings = req.session.userSettings = userSettings

  next()
}