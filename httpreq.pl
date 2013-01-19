#!/usr/bin/perl 

use strict;

sub quote {
  my $input = $_[0];
  $input =~ s/\\/\\\\"/g;
  $input =~ s/"/\\"/g;
  return $input;
}

my $hostname = &quote($ENV{HTTP_HOST});
my $pathname = &quote($ENV{REQUEST_URI});

#print "Content-Type: application/json; charset=utf-8\n";
print "Content-Type: application/javascript; charset=utf-8\n";
print "Access-Control-Allow-Origin: *\n\n";

#print "{\"hostname\":\"$hostname\",\"pathname\":\"$pathname\"}";

print "var hostname = \"$hostname\"; var pathname = \"$pathname\";";
