//http://code.google.com/p/rte-light/
//Based much of the code on rte-light
//Configured a little differently to use
//bootstrap classes and the font awesome fonts
//

(function($) {

  $.fn.simplyedit = function(options) {
    var defaults  = {
      height: "200",
      width: "100%"
    };
    var opts = $.extend(defaults, options);

    return this.each(function() {
      var textarea = $(this);
      var iframe;
      var element_id = textarea.attr("id");

      function enableDesignMode() {
	var content = textarea.val();

        if($.trim(content)=='') {
	  content = '<br />';
        }

	if(iframe) {
	  loadIFrame();
	  return true;
        } else {
	  buildIFrame();
	}

	textarea.after(iframe);
	var doc = "<html><head></head><body>"+content+"</body></html>";
	tryEnableDesignMode(doc, function() {
	    $("#toolbar-" + element_id).remove();
	    textarea.before(toolbar());
	    textarea.hide();
	});
      }

      function loadIFrame() {
	textarea.hide();

	$(iframe).contents().find("body").html(content);
	$(iframe).show();

	$("#toolbar-" + element_id).remove();
	textarea.before(toolbar());
      }

      function buildIFrame() {
	iframe = document.createElement("iframe");
	iframe.frameBorder=0;
	iframe.frameMargin=0;
	iframe.framePadding=0;
	iframe.height=opts.height;
	iframe.width=opts.width;
	if(textarea.attr('class'))
	    iframe.className = textarea.attr('class');
	if(textarea.attr('id'))
	    iframe.id = element_id;
	if(textarea.attr('name'))
	    iframe.title = textarea.attr('name');
      }

      function tryEnableDesignMode(doc, callback) {
	if(!iframe) {
	  return false;
	}

	try {
	  iframe.contentWindow.document.open();
	  iframe.contentWindow.document.write(doc);
	  iframe.contentWindow.document.close();
	} catch(error) {
	}

	if (document.contentEditable) {
	  iframe.contentWindow.document.designMode = "On";
	  callback();
	  return true;
	} else if(document.designMode != null) {
	  try {
	    iframe.contentWindow.document.designMode = "on";
	    callback();
	    return true;
	  } catch (error) {
	  }
	}
	setTimeout(function(){tryEnableDesignMode(doc, callback)}, 500);
	return false;
      }

      function disableDesignMode(submit) {
	var content = $(iframe).contents().find("body").html();
	if($(iframe).is(":visible")) {
	  textarea.val(content);
	}
	if(submit !== true) {
	  textarea.show();
	  $(iframe).hide();
	}
      }

      // create toolbar and bind events to it's elements
      function toolbarHtml() {
	//
	//this is where all the html is layed out for the toolbar. The id of the element is very important
	//you'll see why a little further down. This is primarly just building the html to show up, so feel
	//free to hack it to what you want. It's easy.
	//
	return $("<div class='simply-edit-toolbar' id='toolbar-"+ element_id +"'><div>\
	    <div class='btn-toolbar' role='toolbar'>\
	      <div class='btn-group'>\
		<select id='font-size' style='margin-bottom:0px;'>\
		  <option value=''>Font Size</option>\
		  <option value='1'>Very Small</option>\
		  <option value='2'>Small</option>\
		  <option value='3'>Normal</option>\
		  <option value='4'>Medium</option>\
		  <option value='5'>Big</option>\
		</select>\
	      </div>\
	      <div class='btn-group'>\
		<button class='btn btn-default' type='button' id='bold'><i class='fa fa-bold' /></button>\
		<button class='btn btn-default' type='button' id='italic'><i class='fa fa-italic'/></button>\
		<button class='btn btn-default' type='button' id='underline'><i class='fa fa-underline'/></button>\
		<button class='btn btn-default' type='button' id='strikethrough'><i class='fa fa-strikethrough'/></button>\
		<button class='btn btn-default' type='button' id='subscript'><i class='fa fa-subscript'/></button>\
		<button class='btn btn-default' type='button' id='superscript'><i class='fa fa-superscript'/></button>\
		<button class='btn btn-default' type='button' id='insertOrderedList'><i class='fa fa-list-ol'/></button>\
		<button class='btn btn-default' type='button' id='insertUnorderedList'><i class='fa fa-list-ul'/></button>\
		<button class='btn btn-default' type='button' id='justifyLeft'><i class='fa fa-align-left'/></button>\
		<button class='btn btn-default' type='button' id='justifyCenter'><i class='fa fa-align-center'/></button>\
		<button class='btn btn-default' type='button' id='justifyRight'><i class='fa fa-align-right'/></button>\
		<button class='btn btn-default' type='button' id='undo'><i class='fa fa-undo' alt='undo'/></button>\
	      </div>\
	    </div>");
      }

      function toolbar() {
	var tb = toolbarHtml();

	//These are built in by the browsers and are called with the execCommand
	//https://developer.mozilla.org/en-US/docs/Rich-Text_Editing_in_Mozilla
	//This is where your events go, the items are looked up by the id from the html up above in toolbarHtml()
	$('#bold', tb).click(function(){		formatText('bold');		    return false; });
	$('#italic', tb).click(function(){              formatText('italic');               return false; });
	$('#underline', tb).click(function(){           formatText('underline');            return false; });
	$('#subscript', tb).click(function() {		formatText('subscript');	    return false; });
	$('#superscript', tb).click(function(){		formatText('superscript');          return false; });
	$('#strikethrough', tb).click(function(){	formatText('strikeThrough');	    return false; });
	$('#justifyLeft', tb).click(function(){		formatText('justifyLeft');          return false; });
	$('#justifyCenter', tb).click(function(){       formatText('justifyCenter');	    return false; });
	$('#justifyRight', tb).click(function(){	formatText('justifyRight');	    return false; });
	$('#undo', tb).click(function(){		formatText('undo');		    return false; });
	$('#insertUnorderedList', tb).click(function(){ formatText('insertUnorderedList');  return false; });
	$('#insertOrderedList', tb).click(function(){	formatText('insertOrderedList');    return false; });

	$('#font-size', tb).change(function(){
	  var index = this.selectedIndex;
	  if( index!=0 ) {
	    var selected = this.options[index].value;
	    formatText("fontsize", selected);
	  }
	});

	// iframe events for selecting text
	//
	if(opts.dot_net_button_class) {
	  var dot_net_button = $(iframe).parents('form').find(opts.dot_net_button_class);
	  dot_net_button.click(function() {
	    disableDesignMode(true);
	  });
	} else {
	  $(iframe).parents('form').submit(function(){
	    disableDesignMode(true);
	  });
	}

	var iframeDoc = $(iframe.contentWindow.document);
	var select = $('select', tb)[0];

	iframeDoc.mouseup(function(){
	  setSelectedType(getSelectionElement(), select);
	  return true;
	});

	iframeDoc.keyup(function() {
	  setSelectedType(getSelectionElement(), select);
	  var body = $('body', iframeDoc);
	  if(body.scrollTop() > 0) {
	    var iframe_height = parseInt(iframe.style['height'])
	    if(isNaN(iframe_height))
		iframe_height = 0;
	    var h = Math.min(opts.height, iframe_height+body.scrollTop()) + 'px';
	    iframe.style['height'] = h;
	  }
	  return true;
	});

	return tb;
      };

      function formatText(command, option) {
	iframe.contentWindow.focus();
	try {
	  iframe.contentWindow.document.execCommand(command, false, option);
	} catch(e) {
	}
	iframe.contentWindow.focus();
      };

      function setSelectedType(node, select) {
	while(node.parentNode) {
	  var nName = node.nodeName.toLowerCase();
	  for(var i=0;i<select.options.length;i++) {
	    if(nName==select.options[i].value){
		select.selectedIndex=i;
		return true;
	    }
	  }
	  node = node.parentNode;
	}
	select.selectedIndex=0;
	return true;
      };

      function getSelectionElement() {
	if (iframe.contentWindow.document.selection) {
	  selection = iframe.contentWindow.document.selection;
	  range = selection.createRange();
	  try {
	    node = range.parentElement();
	  }
	  catch (e) {
	    return false;
	  }
	} else {
	  try {
	    selection = iframe.contentWindow.getSelection();
	    range = selection.getRangeAt(0);
	  }
	  catch(e){
	    return false;
	  }
	  node = range.commonAncestorContainer;
	}
	return node;
      };
      enableDesignMode();
    });
  };
})(jQuery);


