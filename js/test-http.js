//++++++++++++++++++++
// Initialization
//++++++++++++++++++++
function init() {

  if(XMLHttpRequest === undefined) {
    alert("Your browser does not support XMLHttpRequest which is required for testing.");
    return;
  }
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "urls-local.json", false);
  xhr.send(null);

  // Get the test cases from tests.json
  data = JSON.parse(xhr.responseText);
}

//++++++++++++++++++++
// Utilities
//++++++++++++++++++++

// Any function that needs to wait until the entire page 
// is loaded should use this.
function afterOnload(func) {
  if(window.attachEvent) {
    window.attachEvent('onload', func);
  } else {
    if(window.onload) {
      var curronload = window.onload;
      var newonload = function() {
        curronload();
        func();
      };
      window.onload = newonload;
    } else {
      window.onload = func;
    }
  }
}

function quote(str) {
  return str.replace(/"/g, '&quot;');
}


//++++++++++++++++++++
// Testing functions
//++++++++++++++++++++

// Test components using a base href.
// name = descriptive name of the test case
// base = the base URI to set
// (optional) rel = the relative URI to test
function test_components(name, base, rel) {
  if (name === '') name = JSON.stringify(base) + " + " + JSON.stringify(rel);
  //var myscript = '<script>var xhr = new XMLHttpRequest(); xhr.open("GET", "' + rel + '", false); ' +
  //              'xhr.send(null); var response = JSON.parse(xhr.responseText);<' + '/script>';

  if (rel != undefined) {
    var myscript = '<script src="' + quote(rel) + '"></script>';
  }
  else var myscript = '<script src="' + quote(url) + '"></script>';
  
  var t = async_test(name);
  var iframe = document.createElement('iframe');
  document.body.appendChild(iframe);
  var doc = iframe.contentWindow.document;
  iframe.onload = function(){
    t.step(function() {
        // Get the element from the iframe
        var target = doc.getElementsByTagName('a')[0];
        // We compare the DOM's pathname + search components to the HTTP 
        // request's URI which also includes both.
        var domurl = [target.hostname, target.pathname + target.search];
        // The HTTP GET request
        var httpurl = [iframe.contentWindow.hostname, iframe.contentWindow.pathname];
        assert_array_equals(httpurl, domurl);
        this.done();
        });
    document.body.removeChild(iframe);
  }
  doc.open();
  doc.write('<!doctype html><base href="'+ quote(base) + '"><a href="' + quote(rel) + '"></a>' + myscript);
  doc.close();
}

function test_simple(name, url) {
  if (name === '') name = JSON.stringify(url);
  //var myscript = '<script>var xhr = new XMLHttpRequest(); xhr.open("GET", "' + quote(url) + '", false); ' +
  //              'xhr.send(null); var response = JSON.parse(xhr.responseText);<' + '/script>';

  var myscript = '<script src="' + quote(url) + '"></script>';
  
  var t = async_test(name);
  var iframe = document.createElement('iframe');
  iframe.setAttribute("name", name);
  document.body.appendChild(iframe);
  var doc = iframe.contentWindow.document;
  iframe.onload = function(){
    t.step(function() {
        var target = doc.getElementsByTagName('a')[0];
        // We compare the DOM's pathname + search components to the HTTP 
        // request's URI which also includes both.
        var domurl = [target.hostname, target.pathname + target.search];
        // The HTTP GET request
        //var httpurl = [iframe.contentWindow.response.hostname, iframe.contentWindow.response.pathname];
        // The browser will show an empthy pathname as "" while the GET request will look like "/"
        if (iframe.contentWindow.pathname === "/") {
//          iframe.contentWindow.pathname = "";
        }
        var httpurl = [iframe.contentWindow.hostname, iframe.contentWindow.pathname];
        assert_array_equals(httpurl, domurl);
        this.done();
        });
    document.body.removeChild(iframe);
  }
  doc.open();
  doc.write('<!doctype html><a href="' + quote(url) + '"></a>' + myscript);
  doc.close();
}
