simply-edit.js
==============

A really simple javascript toolbar with really simple options
for basic formatting options for text areas. It's setup to work
with bootstrap 3 and font awesome icons.

Check out the demo:<http://willywos.github.com/simply-edit.js/demo.html>

### Usage

Include the script file in your html page. Then call the jquery
plugin by passing the id of the textarea.

```
<html>
  <head>
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="css/font-awesome.min.css">
    <link rel="stylesheet" href="css/simplyedit.css">
  </head>
  <body>
    <textarea id="textarea-awesome">Text in text area</textarea>

    <script src="js/jquery-1.11.1.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/simply-edit.js"></script>

    <script type="text/javascript">
      $("#textarea-awesome").simplyedit();
    </script>
  </body>
</html>
```

### Options

The plugin has 3 options. When none of the options are specified
it defaults with these values:

```
height:"200px"
width:"100%""
buttons:[
  "font-size",
  "bold",
  "italic",
  "underline",
  "strikethrough",
  "subscript",
  "superscript",
  "list-ol",
  "list-ul",
  "align-left",
  "align-center",
  "align-right",
  "undo"
]
```

You can change any of the buttons or change the order of the buttons
based on array passed into buttons.

For example if I only wanted bold, italic, underline buttons to show in
the toolbar.

```
$("#textarea-awesome").simplyedit({
  buttons:["bold", "italic", "underline"]
});
```

#### Dependencies
This is what I wrote the plugin with. It should work nice with other
versions of jQuery. By default it uses the css classes for font-awesome
and Bootstrap 3.

* jQuery (1.11.1)
* Font Awesome (4.0.3)
* Bootstrap (3.1.1)

Check out the demo:<http://willywos.github.com/simply-edit.js/demo.html>
