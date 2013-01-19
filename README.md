url-testing
===========

Test cases and harnesses for URL testing, using testharness.js.

URLs have been tricky little devils over the years. Mainly because various implementations have diverged 
in subtle details of parsing them. The test pages here are designed to test URL parsing in the described ways.

## URL Live Viewer
Display a URL's parsed components from both the browser's DOM, and from the URL.js project being prototyped
for the WHATWG URL spec.

## URL Test Runner for 500+ URL test cases
Run all tests from urls.json using testharness.js to compare the Web browser's DOM properties with the expected result.

## Test URL parsing in HTTP GET requests
Run all tests from urls.json using testharness.js to compare the Web browser's DOM properties with the 
resultant HTTP request's path and hostname parts.
