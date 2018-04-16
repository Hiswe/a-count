'use strict'

module.exports = function formatList({list, dbQuery}) {
  const { page, limit } = dbQuery
  const pages     = Math.ceil(list.count / limit)
  const start     = page * limit
  const end       = start + list.rows.length
  return {
    meta: {
      start,
      end,
      limit,
      pages,
      total:        list.count,
      offset:       dbQuery.offset,
      currentPage:  page,
      previousPage: page > 1 ? page - 1 : false,
      nextPage:     page < pages ? page + 1 : false,
    },
    rows: list.rows,
  }
}
