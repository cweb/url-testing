//++++++++++++++++++++
// Initialization
//++++++++++++++++++++
function init() {

  if(XMLHttpRequest === undefined) {
    alert("Your browser does not support XMLHttpRequest which is required for testing.");
    return;
  }
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "urls.json", false);
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

// Test components using a base href
function test_components_relative(name, base, rel, expect_hostnamename, expect_path) {
  if (name === '') name = JSON.stringify(base) + " + " + JSON.stringify(rel);
  var myscript = '<script>var xhr = new XMLHttpRequest(); xhr.open("GET", "' + rel + '", false); ' +
                'xhr.send(null); var response = JSON.parse(xhr.responseText);<' + '/script>';
  var t = async_test(name);
  var iframe = document.createElement('iframe');
  document.body.appendChild(iframe);
  var doc = iframe.contentWindow.document;
  iframe.onload = function(){
    t.step(function() {
        // Get the element from the iframe
        var target = doc.getElementsByTagName('a')[0];
        // The DOM parsed URL
        var domurl = [target.hostname, target.pathname];
        // The HTTP GET request
        var httpurl = [iframe.contentWindow.response.hostname, iframe.contentWindow.response.pathname];
        assert_array_equals(domurl, httpurl);
        this.done();
        });
    document.body.removeChild(iframe);
  }
  doc.open();
  doc.write('<!doctype html><base href="'+ quote(base) + '"><a href="' + quote(rel) + '"></a>' + myscript);
  doc.close();
}

function test_components(name, url, expect_hostnamename, expect_path) {
  if (name === '') name = JSON.stringify(base) + " + " + JSON.stringify(rel);
  var myscript = '<script>var xhr = new XMLHttpRequest(); xhr.open("GET", "' + url + '", false); ' +
                'xhr.send(null); var response = JSON.parse(xhr.responseText);<' + '/script>';
  var t = async_test(name);
  var iframe = document.createElement('iframe');
  document.body.appendChild(iframe);
  var doc = iframe.contentWindow.document;
  iframe.onload = function(){
    t.step(function() {
        var target = doc.getElementsByTagName('a')[0];
        var domurl = [target.hostname, target.pathname];
        var expect = [expect_hostnamename, expect_path];
        // The HTTP GET request
        var httpurl = [iframe.contentWindow.response.hostname, iframe.contentWindow.response.pathname];
        assert_array_equals(domurl, httpurl);
        this.done();
        });
    document.body.removeChild(iframe);
  }
  doc.open();
  doc.write('<!doctype html><a href="' + quote(url) + '"></a>' + myscript);
  doc.close();
}
