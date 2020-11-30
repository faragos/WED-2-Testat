export function registerHelpers(hbs) {
  hbs.registerHelper('times', function (n: number, block) {
    let accum = ''
    for (let i = 0; i < n; ++i) {
      accum += block.fn(i)
    }
    return accum
  })

  hbs.registerHelper('formatDate', function (datetime: string) {
    return new Date(datetime).toISOString().substring(0, 10)
  })

  hbs.registerHelper('ifEquals', function (v1, v2, options) {
    if (v1 === v2) {
      // @ts-ignore
      return options.fn(this)
    }
    // @ts-ignore
    return options.inverse()
  })
}

