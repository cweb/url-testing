var data;           // the test cases

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

function test_simple(name, url, expect_url) {
  if (name === '') name = JSON.stringify(url);
  var t = async_test(name);
  var iframe = document.createElement('iframe');
  document.body.appendChild(iframe);
  var doc = iframe.contentWindow.document;
  iframe.onload = function(){
    t.step(function() {
        assert_equals(doc.getElementsByTagName('a')[0].href, expect_url);
        this.done();
        });
    document.body.removeChild(iframe);
  }
  doc.open();
  doc.write('<!doctype html><a href="' + quote(url) + '"></a>');
  doc.close();
}


function test_relative(name, base, rel, expect_rel) {
  if (name === '') name = JSON.stringify(base) + " + " + JSON.stringify(rel);
  var t = async_test(name);
  var iframe = document.createElement('iframe');
  document.body.appendChild(iframe);
  var doc = iframe.contentWindow.document;
  iframe.onload = function(){
    t.step(function() {
        assert_equals(doc.getElementsByTagName('a')[0].href, expect_rel);
        this.done();
        });
    document.body.removeChild(iframe);
  }
  doc.open();
  doc.write('<!doctype html><base href="'+ quote(base) + '"><a href="' + quote(rel) + '"></a>');
  doc.close();
}

// Test components using a base href
function test_components_relative(name, base, rel, expect_scheme, expect_host, expect_port, expect_path, expect_query, expect_fragment) {
  if (name === '') name = JSON.stringify(base) + " + " + JSON.stringify(rel);
  var t = async_test(name);
  var iframe = document.createElement('iframe');
  document.body.appendChild(iframe);
  var doc = iframe.contentWindow.document;
  iframe.onload = function(){
    t.step(function() {
        var target = doc.getElementsByTagName('a')[0];
        var actual = [target.protocol, target.hostname, target.port, target.pathname, target.search, target.hash];
        var expect = [expect_scheme, expect_host, expect_port, expect_path, expect_query, expect_fragment];
        assert_array_equals(actual, expect);
        this.done();
        });
    document.body.removeChild(iframe);
  }
  doc.open();
  doc.write('<!doctype html><base href="'+ quote(base) + '"><a href="' + quote(rel) + '"></a>');
  doc.close();
}

function test_components(name, url, expect_url, expect_scheme, expect_host, expect_port, expect_path, expect_query, expect_fragment) {
  if (name === '') name = JSON.stringify(base) + " + " + JSON.stringify(rel);
  var t = async_test(name);
  var iframe = document.createElement('iframe');
  document.body.appendChild(iframe);
  var doc = iframe.contentWindow.document;
  iframe.onload = function(){
    t.step(function() {
        var target = doc.getElementsByTagName('a')[0];
        var actual = [target.href, target.protocol, target.hostname, target.port, target.pathname, target.search, target.hash];
        var expect = [expect_url, expect_scheme, expect_host, expect_port, expect_path, expect_query, expect_fragment];
        assert_array_equals(actual, expect);
        this.done();
        });
    document.body.removeChild(iframe);
  }
  doc.open();
  doc.write('<!doctype html><a href="' + quote(url) + '"></a>');
  doc.close();
}
