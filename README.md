# jdz

Just Drop Zone
A simple, light, low dependant library to create a dropzone. By default it creates a div in your specific element which would handle file dropped. After a file is added, a hidden file `input` will create near the zone itself which you can use it anyway you want. the simplest way is to create a `div` in your HTML `form`. This way all hidden file `input`s will submit with your form along other data.

## Installation

### Download

- Clone project from this repo.
- Add it somewhere your front-end code can access.
- Add link to css file: `<link rel="stylesheet" href="/path_to_jdz/styles.css"/>`
- Add script to js file: `<script src="path_to_jdz/index.js"></script>`

### CDN

- Add link to css file: `<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/pouriamoosavi/jdz/styles.css"/>`
- Add script to js file: `<script src="https://cdn.jsdelivr.net/gh/pouriamoosavi/jdz/index.js"></script>`

## Usage

`JDZ` is a global object (in `window`) so you can use it like `JDZ.function_name` any where in your script right after you include it in your page.<br> For now there is only one way to use this library, calling `init` function.<br>
This function accepts two arguments, first is the id of the element you want to dropzone place in it. simplest configuration would be:

```js
JDZ.init("jdzContainer"); // jdzContainer is the id of the element which would be JDZ parent
```

The second argument is an object with some extra options:
| Key | Description | Type | Required | Default |
|---|---|---|---|---|
|`dropFileHere`|The label which shows on the dropzone area. Accepts html too.|string|false|`<p class="jdz-drop-files-here"> Drop Files Here ... </p>`|
|`files`|Default files which would be fill in dropzone from the beginning.|[object] \| object|false|`[]`|
|`paramName`|The name of the input elements which will create near the dropzone|string|false|`"files"`|

Each object in `files` array should have these keys to work properly:
| Key | Description | Type | Required | Default |
|---|---|---|---|---|
|`blob`|The blob of the file data. You can read about blobs <a href="https://developer.mozilla.org/en-US/docs/Web/API/Blob">here</a>|Blob|false|`[""]`
|`name`|The file name|string|true|`""`|
|`mime`|The file mimetype|string|true|`"image/png"`|
|`path`|The file path (in your server for example)|string|true|`""`|

Beside those `options` There are two functions which you can access from `JDZ`:
| Name | Description | Inputs | Output |
|---|---|---|---|
|`browse`|Open file browse dialog to choose file/files from system.|`null`|`null`|
|`delete`|Delete one file from both dropzone and file `input`s|`id`: number|`null`|

## Examples

`init` with options:

```js
JDZ.init("jdzContainer", {
  dropFileHere: "<labe>Awesome Drop Zone!</label>",
  files: [
    {
      name: "radome photo.png",
      path: "https://picsum.photos/200/300",
      mime: "image/png",
    },
  ],
  paramName: "photos",
});
```

Calling `browse` function:

```html
<button type="button" onclick="JDZ.browse()"><i class="fa fa-upload"></i> upload</button>
```

Full example:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Awesome JDZ</title>
    <link
      rel="stylesheet"
      type="text/css"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"
    />
    <link
      rel="stylesheet"
      type="text/css"
      href="https://cdn.jsdelivr.net/gh/pouriamoosavi/jdz/styles.css"
    />
    <script src="https://cdn.jsdelivr.net/gh/pouriamoosavi/jdz/index.js"></script>
  </head>
  <body>
    <div style="margin-bottom: 10px;">
      <label
        >Drop files here to upload or click
        <button type="button" class="jdz-btn jdz-btn-sm jdz-btn-dark" onclick="JDZ.browse()">
          <i class="fa fa-upload"></i> upload
        </button>
      </label>
    </div>
    <div id="jdzContainer"></div>
    <script>
      JDZ.init("jdzContainer", {
        files: [
          {
            name: "radome photo.png",
            path: "https://picsum.photos/200/300",
            mime: "image/png",
          },
        ],
      });
    </script>
  </body>
</html>
```

## Dependencies

- <a href="https://fontawesome.com/">Font Awesome</a> (fa) >= 5

## Contribute

Feel free to report bugs and issues.
Also new ideas will be appreciated.
For now I think the most important things to do are:

- Add more options specially for styles, labels, sizing, showing preview buttons and button labels.
- Add more events and hooks. (e.g: `onDrop`, `beforeDelete`, ...)

So if you find them cool, you can help me!
