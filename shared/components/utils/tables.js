
export const filterColumn = key => column => column.label !== `table.header.${key}`

export const hasRows =  list => Array.isArray( list ) && list.length
