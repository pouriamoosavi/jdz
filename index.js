var parser = new DOMParser();
var id = 0;
var dropContainer;
var filesContainer;

var options;
window.JDZ = {
  init: function (targetID, inputOptions) {
    var targetContainer = document.getElementById(targetID);
    if (inputOptions && typeof inputOptions === "object") {
      options = inputOptions;
    }

    var dropFileHere = options.dropFileHere || '<p id="jdzDropFilesHere" class="jdz-drop-files-here"> Drop Files Here ... </p>';
    var dropContainerHtmlString = '<div id="jdzDropContainer" class="jdz-drop-container">' +
      dropFileHere + '</div>';
    var dropContainerEl = parser.parseFromString(dropContainerHtmlString, "text/html");
    dropContainer = dropContainerEl.getElementsByTagName("div")[0];

    var filesContainerHtmlString = '<div style="display: none;" id="jdzFilesContainer"></div>'
    var filesContainerEl = parser.parseFromString(filesContainerHtmlString, "text/html");
    filesContainer = filesContainerEl.getElementsByTagName("div")[0];

    targetContainer.appendChild(dropContainer)
    targetContainer.appendChild(filesContainer)

    dropContainer.ondragenter = dropContainer.ondragover = function (e) {
      e.stopPropagation();
      e.preventDefault();
    }

    dropContainer.ondrop = function (e) {
      e.stopPropagation();
      e.preventDefault();

      var files = e.dataTransfer.files;
      for (var i = 0; i < files.length; i++) {
        functions.addFileInput(files[i]);
        functions.addImgPreview(files[i]);
        functions.fileUploaded();
      }

    };

    if (options.files) {
      if (!Array.isArray(options.files)) {
        options.files = [options.files]
      }

      for (var i = 0; i < options.files.length; i++) {
        var file = options.files[i];
        var fileBlob = file.blob || [""];
        var fileObj = new File(fileBlob, file.name, { type: file.mime })
        functions.addFileInput(fileObj)
        var imgElDoc = functions.imgPreviewElDoc(file.path);
        document.getElementById("jdzDropContainer").appendChild(imgElDoc);
        functions.fileUploaded();
      }
    }
  },

  browse: function () {
    // create a temporary file input to open choose file dialog.
    var inputElDoc = functions.fileInputElDoc()
    inputElDoc.onchange = function () {

      var files = this.files;
      // create a file input for each chosen file.
      for (var i = 0; i < files.length; i++) {
        functions.addFileInput(files[i]);
        functions.addImgPreview(files[i]);
        functions.fileUploaded();
      }

      // remove temporary file input
      this.remove()
    }

    // add temporary file input to dom and trigger click.
    document.getElementById("jdzFilesContainer").appendChild(inputElDoc);
    inputElDoc.click();
  },

  delete: function (id) {
    document.getElementById('jdzFileInput_' + id).remove();
    document.getElementById('jdzFilePreview_' + id).remove();
    functions.dropFilesHereStatus();
  },
}

var functions = {
  fileInputElDoc: function () {
    var paramName = options.paramName || "files";
    var inputHtmlString = '<input type="file" name="' + paramName + '" multiple="multiple" id="jdzFileInput_' + id + '"/>';
    var inputEl = parser.parseFromString(inputHtmlString, "text/html");
    return inputEl.getElementsByTagName("input")[0];
  },

  imgPreviewElDoc: function (src) {
    var imgHtmlString = '<div class="jdz-img-preview" id="jdzFilePreview_' + id + '">' +
      '<img src="' + src + '" alt="No preview for this image!" />' +
      '<span class="jdz-img-preview-desc">' +
      '<div style="margin-bottom: 7px">' +
      '<a class="jdz-btn jdz-btn-dark jdz-btn-sm" style="margin-right: 7px" href="' + src + '" download="download">' +
      '<i class="fa fa-download"></i></a>' +
      '<button type="button" class="jdz-btn jdz-btn-dark jdz-btn-sm" onclick="window.open(\'' + src + '\', \'blank\')">' +
      '<i class="fas fa-external-link-alt"></i></button>' +
      '</div>' +
      '<div><button type="button" class="jdz-btn jdz-btn-dark jdz-btn-sm" onclick="JDZ.delete(' + id + ')">' +
      '<i class="fa fa-trash"></i></button></div>' +
      '</span>' +
      '<div>';
    var imgEl = parser.parseFromString(imgHtmlString, "text/html");
    return imgEl.getElementsByTagName("div")[0];
  },

  addFileInput: function (file) {
    var inputElDoc = functions.fileInputElDoc();

    // element.files accepts an array of files only.
    var list = new DataTransfer();
    list.items.add(file);

    if (file) inputElDoc.files = list.files;
    document.getElementById("jdzFilesContainer").appendChild(inputElDoc);
  },

  addImgPreview: function (file) {
    var src = URL.createObjectURL(file)
    var imgElDoc = functions.imgPreviewElDoc(src);
    document.getElementById("jdzDropContainer").appendChild(imgElDoc);
  },

  fileUploaded: function () {
    functions.dropFilesHereStatus();
    id++;
  },

  dropFilesHereStatus: function () {
    if (document.getElementById("jdzFilesContainer").children.length === 0) {
      document.getElementById('jdzDropFilesHere').style.display = "block"
    } else {
      document.getElementById('jdzDropFilesHere').style.display = "none"
    }
  },
}



