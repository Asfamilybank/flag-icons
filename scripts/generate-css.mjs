import {fileURLToPath} from 'node:url'
import {resolve, dirname} from 'node:path'
import {readFile, writeFile} from 'node:fs/promises'
import countryCode from './country-code.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const cssDir = resolve(__dirname, '../css');
const sourceCssFile = 'flag-icons.css';
const allCssFile = 'flag-icons-all.css';
const allCssFileMin = 'flag-icons-all.min.css';

const sourceCss = await readFile(resolve(cssDir, sourceCssFile), 'utf8');
let allCss = sourceCss

countryCode.forEach(({alpha2, alpha3, numeric}) => {
  allCss = allCss
    .replace(`.fi-${alpha2} `, `.fi-${alpha2}, .fi-${alpha3}, .fi-${numeric} `)
    .replace(`.fi-${alpha2}.fis`, `$&, .fi-${alpha3}.fis, .fi-${numeric}.fis`)
})

const allCssMin = allCss.replaceAll(/\s/g, '')

await writeFile(resolve(cssDir, allCssFile), allCss, { encoding: 'utf8' });
await writeFile(resolve(cssDir, allCssFileMin), allCssMin, { encoding: 'utf8' });