url-testing
===========

Test cases and harnesses for URL testing, using testharness.js.

adhoc.html - for single, ad hoc tests
index.html - to run all tests
urls.json  - collection of URL test cases and expected results

TODO:
- Give each test case in urls.json a descriptive name
- Implement testing for HTTP requests generated from each URL,
  comparing HTTP path and hostname with the DOM properties
  for the same URL.
