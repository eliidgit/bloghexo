
/*
Tipue Search 5.0
Copyright (c) 2015 Tipue
Tipue Search is released under the MIT License
http://www.tipue.com/search
*/


// List of pages for Live mode

var tipuesearch_pages = [&quot;http://foo.com&quot;, &quot;http://foo.com/about&quot;, &quot;http://foo.com/blog&quot;];


/*
Stop words
Stop words list from http://www.ranks.nl/stopwords
*/

var tipuesearch_stop_words = [&quot;a&quot;, &quot;about&quot;, &quot;above&quot;, &quot;after&quot;, &quot;again&quot;, &quot;against&quot;, &quot;all&quot;, &quot;am&quot;, &quot;an&quot;, &quot;and&quot;, &quot;any&quot;, &quot;are&quot;, &quot;aren&apos;t&quot;, &quot;as&quot;, &quot;at&quot;, &quot;be&quot;, &quot;because&quot;, &quot;been&quot;, &quot;before&quot;, &quot;being&quot;, &quot;below&quot;, &quot;between&quot;, &quot;both&quot;, &quot;but&quot;, &quot;by&quot;, &quot;can&apos;t&quot;, &quot;cannot&quot;, &quot;could&quot;, &quot;couldn&apos;t&quot;, &quot;did&quot;, &quot;didn&apos;t&quot;, &quot;do&quot;, &quot;does&quot;, &quot;doesn&apos;t&quot;, &quot;doing&quot;, &quot;don&apos;t&quot;, &quot;down&quot;, &quot;during&quot;, &quot;each&quot;, &quot;few&quot;, &quot;for&quot;, &quot;from&quot;, &quot;further&quot;, &quot;had&quot;, &quot;hadn&apos;t&quot;, &quot;has&quot;, &quot;hasn&apos;t&quot;, &quot;have&quot;, &quot;haven&apos;t&quot;, &quot;having&quot;, &quot;he&quot;, &quot;he&apos;d&quot;, &quot;he&apos;ll&quot;, &quot;he&apos;s&quot;, &quot;her&quot;, &quot;here&quot;, &quot;here&apos;s&quot;, &quot;hers&quot;, &quot;herself&quot;, &quot;him&quot;, &quot;himself&quot;, &quot;his&quot;, &quot;how&quot;, &quot;how&apos;s&quot;, &quot;i&quot;, &quot;i&apos;d&quot;, &quot;i&apos;ll&quot;, &quot;i&apos;m&quot;, &quot;i&apos;ve&quot;, &quot;if&quot;, &quot;in&quot;, &quot;into&quot;, &quot;is&quot;, &quot;isn&apos;t&quot;, &quot;it&quot;, &quot;it&apos;s&quot;, &quot;its&quot;, &quot;itself&quot;, &quot;let&apos;s&quot;, &quot;me&quot;, &quot;more&quot;, &quot;most&quot;, &quot;mustn&apos;t&quot;, &quot;my&quot;, &quot;myself&quot;, &quot;no&quot;, &quot;nor&quot;, &quot;not&quot;, &quot;of&quot;, &quot;off&quot;, &quot;on&quot;, &quot;once&quot;, &quot;only&quot;, &quot;or&quot;, &quot;other&quot;, &quot;ought&quot;, &quot;our&quot;, &quot;ours&quot;, &quot;ourselves&quot;, &quot;out&quot;, &quot;over&quot;, &quot;own&quot;, &quot;same&quot;, &quot;shan&apos;t&quot;, &quot;she&quot;, &quot;she&apos;d&quot;, &quot;she&apos;ll&quot;, &quot;she&apos;s&quot;, &quot;should&quot;, &quot;shouldn&apos;t&quot;, &quot;so&quot;, &quot;some&quot;, &quot;such&quot;, &quot;than&quot;, &quot;that&quot;, &quot;that&apos;s&quot;, &quot;the&quot;, &quot;their&quot;, &quot;theirs&quot;, &quot;them&quot;, &quot;themselves&quot;, &quot;then&quot;, &quot;there&quot;, &quot;there&apos;s&quot;, &quot;these&quot;, &quot;they&quot;, &quot;they&apos;d&quot;, &quot;they&apos;ll&quot;, &quot;they&apos;re&quot;, &quot;they&apos;ve&quot;, &quot;this&quot;, &quot;those&quot;, &quot;through&quot;, &quot;to&quot;, &quot;too&quot;, &quot;under&quot;, &quot;until&quot;, &quot;up&quot;, &quot;very&quot;, &quot;was&quot;, &quot;wasn&apos;t&quot;, &quot;we&quot;, &quot;we&apos;d&quot;, &quot;we&apos;ll&quot;, &quot;we&apos;re&quot;, &quot;we&apos;ve&quot;, &quot;were&quot;, &quot;weren&apos;t&quot;, &quot;what&quot;, &quot;what&apos;s&quot;, &quot;when&quot;, &quot;when&apos;s&quot;, &quot;where&quot;, &quot;where&apos;s&quot;, &quot;which&quot;, &quot;while&quot;, &quot;who&quot;, &quot;who&apos;s&quot;, &quot;whom&quot;, &quot;why&quot;, &quot;why&apos;s&quot;, &quot;with&quot;, &quot;won&apos;t&quot;, &quot;would&quot;, &quot;wouldn&apos;t&quot;, &quot;you&quot;, &quot;you&apos;d&quot;, &quot;you&apos;ll&quot;, &quot;you&apos;re&quot;, &quot;you&apos;ve&quot;, &quot;your&quot;, &quot;yours&quot;, &quot;yourself&quot;, &quot;yourselves&quot;];


// Word replace

var tipuesearch_replace = {&apos;words&apos;: [
     {&apos;word&apos;: &apos;tipua&apos;, &apos;replace_with&apos;: &apos;tipue&apos;},
     {&apos;word&apos;: &apos;javscript&apos;, &apos;replace_with&apos;: &apos;javascript&apos;},
     {&apos;word&apos;: &apos;jqeury&apos;, &apos;replace_with&apos;: &apos;jquery&apos;}
]};


// Weighting

var tipuesearch_weight = {&apos;weight&apos;: [
     {&apos;url&apos;: &apos;http://tipue.dev/search&apos;, &apos;score&apos;: 200},
     {&apos;url&apos;: &apos;http://tipue.dev/about&apos;, &apos;score&apos;: 100},
     {&apos;url&apos;: &apos;http://tipue.dev/tos&apos;, &apos;score&apos;: -1200}
]};


// Stemming

var tipuesearch_stem = {&apos;words&apos;: [
     {&apos;word&apos;: &apos;e-mail&apos;, &apos;stem&apos;: &apos;email&apos;},
     {&apos;word&apos;: &apos;javascript&apos;, &apos;stem&apos;: &apos;jquery&apos;},
     {&apos;word&apos;: &apos;javascript&apos;, &apos;stem&apos;: &apos;js&apos;}
]};


// Internal strings

var tipuesearch_string_1 = &apos;No title&apos;;
var tipuesearch_string_2 = &apos;Showing results for&apos;;
var tipuesearch_string_3 = &apos;Search instead for&apos;;
var tipuesearch_string_4 = &apos;1 result&apos;;
var tipuesearch_string_5 = &apos;results&apos;;
var tipuesearch_string_6 = &apos;Prev&apos;;
var tipuesearch_string_7 = &apos;Next&apos;;
var tipuesearch_string_8 = &apos;Nothing found&apos;;
var tipuesearch_string_9 = &apos;Common words are largely ignored&apos;;
var tipuesearch_string_10 = &apos;Search too short&apos;;
var tipuesearch_string_11 = &apos;Should be one character or more&apos;;
var tipuesearch_string_12 = &apos;Should be&apos;;
var tipuesearch_string_13 = &apos;characters or more&apos;;
