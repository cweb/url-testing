url-testing
===========

Test cases and harnesses for URL testing, using testharness.js.

URLs have been tricky little devils over the years. Mainly because various implementations have diverged 
in subtle details of parsing them. The test pages here are designed to test URL parsing in the described ways.

### URL Live Viewer
Display a URL's parsed components from both the browser's DOM, and from the URL.js project being prototyped
for the WHATWG URL spec.

### URL Test Runner for 500+ URL test cases
Run all tests from urls.json using testharness.js to compare the Web browser's DOM properties with the expected result.

### Test URL parsing in HTTP GET requests
Run all tests from urls-local.json using testharness.js to compare the Web browser's DOM properties with the 
resultant HTTP request's path and hostname parts.

This test is more complicated because it has the following server-side __requirements__:

- __mod_rewrite__ configured to proxy all requests for a pre-determined hostname pattern:

```
# Redirect everything that includes urltest.lookout.net in the hostname for URL testing
RewriteCond %{HTTP_HOST} ^.*urltest\.lookout\.net$ [NC]
RewriteRule ^.*$ /cgi-bin/httpreq.pl
```

With the above RewriteCond, each test case must point to a URL that includes urltest.lookout.net in the hostname.
The RewriteRule will send the request to /cgi-bin/httpreq.pl, a CGI Perl script which will return the HTTP GET
request's Host header value, and GET path.  These values are returned as javascript variables to be used in 
evaluating how the URL was parsed.  For example, the following HTTP request:

```
GET /foo/bar HTTP/1.1
Host: foo.urltest.lookout.net
```

would return:

```javascript
var pathname = "/foo/bar"
var hostname = "foo.urltest.lookout.net"
```

- __DNS wildcard__ record for the host

For this to work, the DNS must be setup with a wildcard __A__ record so that requests to *.lookout.net all resolve
to the same IP address.

