simply-edit.js
==============

A really simple toolbar with really simple options
for formatting textareas. It's setup to work
with Bootstrap 3 and Font Awesome.

Check out the demo:<http://willywos.github.com/simply-edit.js/demo.html>

### Usage

You can also use Bower to install the package. Just run:

```
$ bower install simply-edit.js
```
OR you can download the script and include the script file in your html page.
Then call the simply-edit.js plugin by passing the id of the textarea.


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
    <script src="simply-edit.js"></script>

    <script type="text/javascript">
      $("#textarea-awesome").simplyedit();
    </script>
  </body>
</html>
```

### Options

Simply-Edit.js has three options. When none of the options are specified,
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
  "seperator",
  "subscript",
  "superscript",
  "list-ol",
  "list-ul",
  "seperator",
  "align-left",
  "align-center",
  "align-right",
  "seperator",
  "undo"
]
```

You can change any of the buttons or change the order of the buttons
based on array passed into buttons.

If you want to have a seperator between the buttons add a "seperator"
in the buttons array.

For example, if I only wanted bold, italic, underline buttons to show in
the toolbar.

```
$("#textarea-awesome").simplyedit({
  buttons:["bold", "italic", "underline"]
});
```

#### Dependencies
It should work nice with other versions of jQuery.
By default it uses the css classes for Font Awesome
and Bootstrap 3.

* jQuery (1.11.1)
* Font Awesome (4.0.3)
* Bootstrap (3.1.1)

Check out the demo:<http://willywos.github.com/simply-edit.js/demo.html>
