class Usersettings {
    constructor(orderBy = 'importance', orderDirection = -1, showFinished = false, theme = 'light') {
        this.orderBy = orderBy;
        this.orderDirection = orderDirection;
        this.showFinished = showFinished;
        this.theme = theme;
    }
}
export const sessionUserSettings = (req, res, next) => {
    const userSettings = req.session && req.session.userSettings ? req.session.userSettings : new Usersettings();
    const { orderBy, showFinished, theme } = req.body;
    const ALLOWED_ORDERBY_VALUES = ['importance', 'createDate', 'finishDate'];
    const ALLOWED_THEME_VALUES = ['light', 'dark'];
    const ALLOWED_ORDER_DIRECTION_VALUES = [-1, 1];
    if (orderBy) {
        if (ALLOWED_ORDERBY_VALUES.includes(orderBy)) {
            userSettings.orderBy = orderBy;
        }
        if (ALLOWED_ORDER_DIRECTION_VALUES.includes(userSettings.orderDirection)) {
            userSettings.orderDirection = userSettings.orderBy === orderBy ? userSettings.orderDirection * -1 : -1;
        }
    }
    if (showFinished) {
        userSettings.showFinished = 'true' === showFinished;
    }
    if (theme && ALLOWED_THEME_VALUES.includes(theme)) {
        userSettings.theme = theme;
    }
    // @ts-ignore
    req.userSettings = req.session.userSettings = userSettings;
    next();
};
