# Architecture Design Doc

## JavaScript

- Write javaScript module as node.js module
- Use [node-webkit-index-pattern](https://github.com/azu/node-webkit-index-pattern "azu/node-webkit-index-pattern")

## CSS

- Layout by FlexBox
    - [Solved By Flexbox — Cleaner, hack-free CSS](http://philipwalton.github.io/solved-by-flexbox/ "Solved By Flexbox — Cleaner, hack-free CSS")
- Use Sass 
- Sass is Components
    - base/
    - layout/
    - vendor/
    - component
        - component related position view/
        
## View
        
- view/ is used by vue-component
    - [Composing Components - vue.js](http://vuejs.org/guide/composition.html "Composing Components - vue.js")
    - Snippet html
    - `<article v-component="comment" v-repeat="comments"></article>`

## Storage

- issue/comment data saved as json
    - `comments.json`
    - `issue.json`
- Additionally, dataManager has last-modified date.
- modified,then save as json and change last-modified date.