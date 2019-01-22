let fs = require('fs')

function replaceURL(filename) {
  fs.readFile(filename,'utf8', (err, data) => {
    if (err) {
      throw err
    } else {
      let reg = /\S*\/(\w*\.jpg)/gi
      let newstr = data.replace(reg, 'https://coding.net/u/home-fyy/p/blog_images/git/raw/master/code_images/$1')
      reg = /\S*\/(\w*\.png)/gi
      newstr = newstr.replace(reg, 'https://coding.net/u/home-fyy/p/blog_images/git/raw/master/code_images/$1')
      try {
        writeData(filename, newstr)
      } catch (error) {
        console.log(error)
        return
      }
    }
  })
}

function writeData(filename, data) {
  fs.writeFile(filename, data, 'utf8', (err) => {
    if (err) {
      throw err
    } else {
      console.log('文件已保存！')
    }
  })
}

replaceURL('/home/fyy/fyy/hexoBlog/myblog/' + process.env.file)