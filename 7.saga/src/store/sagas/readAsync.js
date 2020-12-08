import { readFile } from '../utils'
import { cps } from 'redux-saga/effects'

export default function* readAsync() {
  let content = yield cps(readFile, 'README.md')
  console.log(content)
}
