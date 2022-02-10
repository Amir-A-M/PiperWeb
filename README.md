# gulp commands
`gulp` for start Live server and watch `js, css, image, data, vendors, html` tasks
`gulp vendors` To copy the vendors folder in the public path
`gulp data` To copy the data folder in the public path
`gulp clean` For Cleaning the public for fresh export
`gulp production` to minify and remove sourcemap, will affect js, css and image

```
root/
├─ public/
│  ├─ assets/
│  │  ├─ css/bundle.css
│  │  ├─ js/bundle.js
│  │  ├─ vendors/
│  │  ├─ image/
│  ├─ data/
│  ├─ *.html
├─ src/
│  ├─ assets/
│  │  ├─ scss/index.scss
│  │  ├─ js/*
│  │  ├─ vendors/
│  │  ├─ image/
│  ├─ data/
│  ├─ pages/*.html
```

## [gulp-file-include](https://github.com/haoxins/gulp-file-include)
##### include HTML pieces from partials folder
```
@@include('./partials/<file>')
```

##### for include js pieces
```js
// @@include('./lib/jquery-3.6.0.js')
``` 

> :warning: **this is correct:** `// @@` ---- **this is wrong:** `//@@` 