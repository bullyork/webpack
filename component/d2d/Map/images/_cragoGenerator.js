import fs from 'fs'
import { colorHues, sls } from './_cargoHues'


console.log(colorHues, sls)
// function getSVG(size = 50, colorHue = 342, number) {
//   return (
// `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 50 50" width="${size}" height="${size}">
// 	<path fill="hsl(${colorHue}, 100%, 50%)" d="M7.2,18.5C7.2,28.3,25,49.2,25,49.2V0.8C15.2,0.8,7.2,8.7,7.2,18.5z"/>
// 	<path fill="hsl(${colorHue}, 100%, 50%)" d="M25,0.8v48.5c0,0,17.8-20.9,17.8-30.7S34.8,0.8,25,0.8z"/>
// 	<circle fill="#FFFFFF" cx="25" cy="18.3" r="9.6"/>
//   <text fill="hsl(${colorHue}, 100%, 50%)" text-anchor="middle" transform="matrix(1 0 0 1 25 22.4568)" font-size="12" style="font-family: Microsoft YaHei, Open Sans, sans-serif, Hiragino Sans GB, Arial, Lantinghei SC, STHeiti, WenQuanYi Micro Hei, SimSun;">
//     ${number}
//   </text>
// </svg>`
// 	)
// }

// colorHues.forEach((colorHue, index) => {
//   for (let i = 0; i < 100; i++) {
//     fs.writeFile(`cargo${index}_${i}.svg`, getSVG(50, colorHue, i + 1), wriError => {
//       wriError && console.error(wriError)
//     })
//   }
// })
let index = 0

function getSVG(size = 50, hue, sl, number) {
  return (
    `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 50 50" width="${size}" height="${size}">
     <path fill="hsl(${hue}, ${sl.s}, ${sl.l})" d="M7.2,18.5C7.2,28.3,25,49.2,25,49.2V0.8C15.2,0.8,7.2,8.7,7.2,18.5z"/>
     <path fill="hsl(${hue}, ${sl.s}, ${sl.l})" d="M25,0.8v48.5c0,0,17.8-20.9,17.8-30.7S34.8,0.8,25,0.8z"/>
     <circle fill="#FFFFFF" cx="25" cy="18.3" r="9.6"/>
      <text fill="hsl(${hue}, ${sl.s}, ${sl.l})" text-anchor="middle" transform="matrix(1 0 0 1 25 22.4568)" font-size="12" style="font-family: Microsoft YaHei, Open Sans, sans-serif, Hiragino Sans GB, Arial, Lantinghei SC, STHeiti, WenQuanYi Micro Hei, SimSun;">
        ${number}
      </text>
    </svg>`
  )
}

colorHues.forEach(color => {
  sls.forEach(sl => {
    for (let i = 50;i < 99; i++) {
      fs.writeFile(`cargo${index}_${i}.svg`, getSVG(50, color, sl, i), err => console.error(err))
    }
    index ++
  })
})
