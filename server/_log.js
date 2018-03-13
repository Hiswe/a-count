'use strict'

import { debuglog } from 'util'
import chalk from 'chalk'

const log = debuglog( `server` )
log( chalk.green(`init logging`) )

export default log
