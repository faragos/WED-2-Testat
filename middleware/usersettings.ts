import {NextFunction, Request, Response} from "express";

class Usersettings {
  constructor(public orderBy: string = 'importance', public orderDirection: number = -1, public showFinished: boolean = false, public theme: string = 'light') {
  }
}

declare global {
  namespace Express {
    interface Request {
      userSettings: Usersettings
    }
  }
}

export const sessionUserSettings = (req: Request, res: Response, next: NextFunction) => {
  const userSettings: Usersettings = req.session && req.session.userSettings ? req.session.userSettings : new Usersettings();
  const {orderBy, showFinished, theme}: { orderBy: string; showFinished: string, theme: string } = req.body
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
  // Fist time session doesn't exist, so it's undefined and we overwrite it
  // @ts-ignore
  req.userSettings = req.session.userSettings = userSettings
  next()
}