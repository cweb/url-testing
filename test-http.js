//++++++++++++++++++++
// Initialization
//++++++++++++++++++++
function init() {

  if(XMLHttpRequest === undefined) {
    alert("Your browser does not support XMLHttpRequest which is required for testing.");
    return;
  }
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

var myscript = '<script>var xhr = new XMLHttpRequest(); xhr.open("GET", "httpget.php", false); ' +
                'xhr.send(null); var response = JSON.parse(xhr.responseText);<' + '/script>';

// Test components using a base href
function test_components_relative(name, base, rel, expect_host, expect_path) {
  if (name === '') name = JSON.stringify(base) + " + " + JSON.stringify(rel);
  var t = async_test(name);
  var iframe = document.createElement('iframe');
  document.body.appendChild(iframe);
  var doc = iframe.contentWindow.document;
  iframe.onload = function(){
    t.step(function() {
        // Get the element from the iframe
        var target = doc.getElementsByTagName('a')[0];
        // Get the data from the iframe XHR response
        var server = doc.response;
        // The DOM parsed URL
        var dom = [target.hostname, target.pathname];
        // The HTTP GET request
        var http = [server.hostname, server.pathname];
        assert_array_equals(actual, expect);
        this.done();
        });
    document.body.removeChild(iframe);
  }
  doc.open();
  doc.write('<!doctype html><base href="'+ quote(base) + '"><a href="' + quote(rel) + '"></a>' + myscript);
  doc.close();
}

function test_components(name, url, expect_host, expect_path) {
  if (name === '') name = JSON.stringify(base) + " + " + JSON.stringify(rel);
  var t = async_test(name);
  var iframe = document.createElement('iframe');
  document.body.appendChild(iframe);
  var doc = iframe.contentWindow.document;
  iframe.onload = function(){
    t.step(function() {
        var target = doc.getElementsByTagName('a')[0];
        var actual = [target.hostname, target.pathname];
        var expect = [expect_host, expect_path];
        assert_array_equals(actual, expect);
        this.done();
        });
    document.body.removeChild(iframe);
  }
  doc.open();
  doc.write('<!doctype html><a href="' + quote(url) + '"></a>');
  doc.close();
}
