
/*
Tipue Search 5.0
Copyright (c) 2015 Tipue
Tipue Search is released under the MIT License
http://www.tipue.com/search
*/


(function($) {

     $.fn.tipuesearch = function(options) {

          var set = $.extend( {
          
               &apos;show&apos;                   : 7,
               &apos;newWindow&apos;              : false,
               &apos;showURL&apos;                : true,
               &apos;showTitleCount&apos;         : true,
               &apos;minimumLength&apos;          : 3,
               &apos;descriptiveWords&apos;       : 25,
               &apos;highlightTerms&apos;         : true,
               &apos;highlightEveryTerm&apos;     : false,
               &apos;mode&apos;                   : &apos;static&apos;,
               &apos;liveDescription&apos;        : &apos;*&apos;,
               &apos;liveContent&apos;            : &apos;*&apos;,
               &apos;contentLocation&apos;        : &apos;tipuesearch/tipuesearch_content.json&apos;,
               &apos;debug&apos;                  : false
          
          }, options);
          
          return this.each(function() {

               var tipuesearch_in = {
                    pages: []
               };
               $.ajaxSetup({
                    async: false
               });
               var tipuesearch_t_c = 0;

               if (set.mode == &apos;live&apos;)
               {
                    for (var i = 0; i &lt; tipuesearch_pages.length; i++)
                    {
                         $.get(tipuesearch_pages[i])
                              .done(function(html)
                              {
                                   var cont = $(set.liveContent, html).text();
                                   cont = cont.replace(/\s+/g, &apos; &apos;);
                                   var desc = $(set.liveDescription, html).text();
                                   desc = desc.replace(/\s+/g, &apos; &apos;);
                                                                      
                                   var t_1 = html.toLowerCase().indexOf(&apos;<title>&apos;);
                                   var t_2 = html.toLowerCase().indexOf(&apos;</title>&apos;, t_1 + 7);
                                   if (t_1 != -1 &amp;&amp; t_2 != -1)
                                   {
                                        var tit = html.slice(t_1 + 7, t_2);
                                   }
                                   else
                                   {
                                        var tit = tipuesearch_string_1;
                                   }

                                   tipuesearch_in.pages.push(
                                   {
                                        &quot;title&quot;: tit,
                                        &quot;text&quot;: desc,
                                        &quot;tags&quot;: cont,
                                        &quot;url&quot;: tipuesearch_pages[i] 
                                   });    
                              });
                    }
               }
               
               if (set.mode == &apos;json&apos;)
               {
                    $.getJSON(set.contentLocation)
                         .done(function(json)
                         {
                              tipuesearch_in = $.extend({}, json);
                         });
               }

               if (set.mode == &apos;static&apos;)
               {
                    tipuesearch_in = $.extend({}, tipuesearch);
               }                              
               
               var tipue_search_w = &apos;&apos;;
               if (set.newWindow)
               {
                    tipue_search_w = &apos; target=&quot;_blank&quot;&apos;;      
               }

               function getURLP(name)
               {
                    return decodeURIComponent((new RegExp(&apos;[?|&amp;]&apos; + name + &apos;=&apos; + &apos;([^&amp;;]+?)(&amp;|#|;|$)&apos;).exec(location.search)||[,&quot;&quot;])[1].replace(/\+/g, &apos;%20&apos;)) || null;
               }
               if (getURLP(&apos;q&apos;))
               {
                    $(&apos;#tipue_search_input&apos;).val(getURLP(&apos;q&apos;));
                    getTipueSearch(0, true);
               }               
               
               $(this).keyup(function(event)
               {
                    if(event.keyCode == &apos;13&apos;)
                    {
                         getTipueSearch(0, true);
                    }
               });
               

               function getTipueSearch(start, replace)
               {
                    $(&apos;#tipue_search_content&apos;).hide();
                    $(&apos;#tipue_search_content&apos;).html(&apos;<div class="tipue_search_spinner"><div class="tipue_search_rect1"></div><div class="tipue_search_rect2"></div><div class="rect3"></div></div>&apos;);
                    $(&apos;#tipue_search_content&apos;).show();
                    
                    var out = &apos;&apos;;
                    var results = &apos;&apos;;
                    var show_replace = false;
                    var show_stop = false;
                    var standard = true;
                    var c = 0;
                    found = [];
                    
                    var d = $(&apos;#tipue_search_input&apos;).val().toLowerCase();
                    d = $.trim(d);
                    
                    if ((d.match(&quot;^\&quot;&quot;) &amp;&amp; d.match(&quot;\&quot;$&quot;)) || (d.match(&quot;^&apos;&quot;) &amp;&amp; d.match(&quot;&apos;$&quot;)))
                    {
                         standard = false;
                    }
                    
                    if (standard)
                    {
                         var d_w = d.split(&apos; &apos;);
                         d = &apos;&apos;;
                         for (var i = 0; i &lt; d_w.length; i++)
                         {
                              var a_w = true;
                              for (var f = 0; f &lt; tipuesearch_stop_words.length; f++)
                              {
                                   if (d_w[i] == tipuesearch_stop_words[f])
                                   {
                                        a_w = false;
                                        show_stop = true;          
                                   }
                              }
                              if (a_w)
                              {
                                   d = d + &apos; &apos; + d_w[i];
                              }
                         }
                         d = $.trim(d);
                         d_w = d.split(&apos; &apos;);
                    }
                    else
                    {
                         d = d.substring(1, d.length - 1);
                    }
               
                    if (d.length &gt;= set.minimumLength)
                    {
                         if (standard)
                         {
                              if (replace)
                              {
                                   var d_r = d;
                                   for (var i = 0; i &lt; d_w.length; i++)
                                   {
                                        for (var f = 0; f &lt; tipuesearch_replace.words.length; f++)
                                        {
                                             if (d_w[i] == tipuesearch_replace.words[f].word)
                                             {
                                                  d = d.replace(d_w[i], tipuesearch_replace.words[f].replace_with);
                                                  show_replace = true;
                                             }
                                        }
                                   }
                                   d_w = d.split(&apos; &apos;);
                              }                   
                    
                              var d_t = d;
                              for (var i = 0; i &lt; d_w.length; i++)
                              {
                                   for (var f = 0; f &lt; tipuesearch_stem.words.length; f++)
                                   {
                                        if (d_w[i] == tipuesearch_stem.words[f].word)
                                        {
                                             d_t = d_t + &apos; &apos; + tipuesearch_stem.words[f].stem;
                                        }
                                   }
                              }
                              d_w = d_t.split(&apos; &apos;);

                              for (var i = 0; i &lt; tipuesearch_in.pages.length; i++)
                              {
                                   var score = 0;
                                   var s_t = tipuesearch_in.pages[i].text;
                                   for (var f = 0; f &lt; d_w.length; f++)
                                   {
                                        var pat = new RegExp(d_w[f], &apos;gi&apos;);
                                        if (tipuesearch_in.pages[i].title.search(pat) != -1)
                                        {
                                             var m_c = tipuesearch_in.pages[i].title.match(pat).length;
                                             score += (20 * m_c);
                                        }
                                        if (tipuesearch_in.pages[i].text.search(pat) != -1)
                                        {
                                             var m_c = tipuesearch_in.pages[i].text.match(pat).length;
                                             score += (20 * m_c);
                                        }
                                        
                                        if (set.highlightTerms)
                                        {
                                             if (set.highlightEveryTerm) 
                                             {
                                                  var patr = new RegExp(&apos;(&apos; + d_w[f] + &apos;)&apos;, &apos;gi&apos;);
                                             }
                                             else
                                             {
                                                  var patr = new RegExp(&apos;(&apos; + d_w[f] + &apos;)&apos;, &apos;i&apos;);
                                             }
                                             s_t = s_t.replace(patr, &quot;<span class="\" h01\""="">$1</span>&quot;);
                                        }
                                        
                                        if (tipuesearch_in.pages[i].tags.search(pat) != -1)
                                        {
                                             var m_c = tipuesearch_in.pages[i].tags.match(pat).length;
                                             score += (10 * m_c);
                                        }

                                        if (tipuesearch_in.pages[i].url.search(pat) != -1)
                                        {
                                             score += 20;
                                        }
                                        
                                        if (score != 0)
                                        {
                                             for (var e = 0; e &lt; tipuesearch_weight.weight.length; e++)
                                             {
                                                  if (tipuesearch_in.pages[i].url == tipuesearch_weight.weight[e].url)
                                                  {
                                                       score += tipuesearch_weight.weight[e].score;
                                                  }
                                             }
                                        }
                                        
                                        if (d_w[f].match(&apos;^-&apos;))
                                        {
                                             pat = new RegExp(d_w[f].substring(1), &apos;i&apos;);
                                             if (tipuesearch_in.pages[i].title.search(pat) != -1 || tipuesearch_in.pages[i].text.search(pat) != -1 || tipuesearch_in.pages[i].tags.search(pat) != -1)
                                             {
                                                  score = 0;     
                                             }    
                                        }
                                   }
                                   
                                   if (score != 0)
                                   {
                                        found.push(
                                        {
                                             &quot;score&quot;: score,
                                             &quot;title&quot;: tipuesearch_in.pages[i].title,
                                             &quot;desc&quot;: s_t,
                                             &quot;url&quot;: tipuesearch_in.pages[i].url 
                                        });
                                        c++;                                                                   
                                   }
                              }
                         }
                         else
                         {
                              for (var i = 0; i &lt; tipuesearch_in.pages.length; i++)
                              {
                                   var score = 0;
                                   var s_t = tipuesearch_in.pages[i].text;
                                   var pat = new RegExp(d, &apos;gi&apos;);
                                   if (tipuesearch_in.pages[i].title.search(pat) != -1)
                                   {
                                        var m_c = tipuesearch_in.pages[i].title.match(pat).length;
                                        score += (20 * m_c);
                                   }
                                   if (tipuesearch_in.pages[i].text.search(pat) != -1)
                                   {
                                        var m_c = tipuesearch_in.pages[i].text.match(pat).length;
                                        score += (20 * m_c);
                                   }
                                   
                                   if (set.highlightTerms)
                                   {
                                        if (set.highlightEveryTerm) 
                                        {
                                             var patr = new RegExp(&apos;(&apos; + d + &apos;)&apos;, &apos;gi&apos;);
                                        }
                                        else
                                        {
                                             var patr = new RegExp(&apos;(&apos; + d + &apos;)&apos;, &apos;i&apos;);
                                        }
                                        s_t = s_t.replace(patr, &quot;<span class="\" h01\""="">$1</span>&quot;);
                                   }
                                   
                                   if (tipuesearch_in.pages[i].tags.search(pat) != -1)
                                   {
                                        var m_c = tipuesearch_in.pages[i].tags.match(pat).length;
                                        score += (10 * m_c);
                                   }
                              
                                   if (tipuesearch_in.pages[i].url.search(pat) != -1)
                                   {
                                        score += 20;
                                   }
                                   
                                   if (score != 0)
                                   {
                                        for (var e = 0; e &lt; tipuesearch_weight.weight.length; e++)
                                        {
                                             if (tipuesearch_in.pages[i].url == tipuesearch_weight.weight[e].url)
                                             {
                                                  score += tipuesearch_weight.weight[e].score;
                                             }
                                        }
                                   }
                              
                                   if (score != 0)
                                   {
                                        found.push(
                                        {
                                             &quot;score&quot;: score,
                                             &quot;title&quot;: tipuesearch_in.pages[i].title,
                                             &quot;desc&quot;: s_t,
                                             &quot;url&quot;: tipuesearch_in.pages[i].url
                                        });
                                        c++;                                                                  
                                   }                              
                              }
                         }                         
                         
                         if (c != 0)
                         {
                              if (set.showTitleCount &amp;&amp; tipuesearch_t_c == 0)
                              {
                                   var title = document.title;
                                   document.title = &apos;(&apos; + c + &apos;) &apos; + title;
                                   tipuesearch_t_c++;
                              }                         
                         
                              if (show_replace == 1)
                              {
                                   out += &apos;<div id="tipue_search_warning">&apos; + tipuesearch_string_2 + &apos; &apos; + d + &apos;. &apos; + tipuesearch_string_3 + &apos; <a id="tipue_search_replaced">&apos; + d_r + &apos;</a></div>&apos;;
                              }
                              if (c == 1)
                              {
                                   out += &apos;<div id="tipue_search_results_count">&apos; + tipuesearch_string_4 + &apos;</div>&apos;;
                              }
                              else
                              {
                                   c_c = c.toString().replace(/\B(?=(\d{3})+(?!\d))/g, &quot;,&quot;);
                                   out += &apos;<div id="tipue_search_results_count">&apos; + c_c + &apos; &apos; + tipuesearch_string_5 + &apos;</div>&apos;;
                              }
                              
                              found.sort(function(a, b) { return b.score - a.score } );
                              
                              var l_o = 0;
                              for (var i = 0; i &lt; found.length; i++)
                              {
                                   if (l_o &gt;= start &amp;&amp; l_o &lt; set.show + start)
                                   {                                   
                                        out += &apos;<div class="tipue_search_content_title"><a href="&apos; + found[i].url + &apos;" '="" +="" tipue_search_w="">&apos; +  found[i].title + &apos;</a></div>&apos;;
 
                                        if (set.debug)
                                        {                                             
                                             out += &apos;<div class="tipue_search_content_debug">Score: &apos; + found[i].score + &apos;</div>&apos;;
                                        }
                                        
                                        if (set.showURL)
                                        {
                                             var s_u = found[i].url.toLowerCase();
                                             if(s_u.indexOf(&apos;http://&apos;) == 0)
                                             {
                                                  s_u = s_u.slice(7);
                                             }                                             
                                             out += &apos;<div class="tipue_search_content_url"><a href="&apos; + found[i].url + &apos;" '="" +="" tipue_search_w="">&apos; + s_u + &apos;</a></div>&apos;;
                                        }
                                        
                                        if (found[i].desc)
                                        {                                        
                                             var t = found[i].desc;
                                             var t_d = &apos;&apos;;
                                             var t_w = t.split(&apos; &apos;);
                                             if (t_w.length &lt; set.descriptiveWords)
                                             {
                                                  t_d = t;
                                             }
                                             else
                                             {
                                                  for (var f = 0; f &lt; set.descriptiveWords; f++)
                                                  {
                                                       t_d += t_w[f] + &apos; &apos;; 	
                                                  }
                                             }
                                             t_d = $.trim(t_d);
                                             if (t_d.charAt(t_d.length - 1) != &apos;.&apos;)
                                             {
                                                  t_d += &apos; ...&apos;;
                                             }
                                             out += &apos;<div class="tipue_search_content_text">&apos; + t_d + &apos;</div>&apos;;
                                        }
                                   }
                                   l_o++;     
                              }
                              
                              if (c &gt; set.show)
                              {
                                   var pages = Math.ceil(c / set.show);
                                   var page = (start / set.show);
                                   out += &apos;<div id="tipue_search_foot"><ul id="tipue_search_foot_boxes">&apos;;
                                   
                                   if (start &gt; 0)
                                   {
                                       out += &apos;<li><a class="tipue_search_foot_box" id="&apos; + (start - set.show) + &apos;_&apos; + replace + &apos;">&apos; + tipuesearch_string_6 + &apos;</a></li>&apos;; 
                                   }
                                                       
                                   if (page <= 2)="" {="" var="" p_b="pages;" if="" (pages=""> 3)
                                        {
                                             p_b = 3;
                                        }                    
                                        for (var f = 0; f &lt; p_b; f++)
                                        {
                                             if (f == page)
                                             {
                                                  out += &apos;<li class="current">&apos; + (f + 1) + &apos;</li>&apos;;
                                             }
                                             else
                                             {
                                                  out += &apos;<li><a class="tipue_search_foot_box" id="&apos; + (f * set.show) + &apos;_&apos; + replace + &apos;">&apos; + (f + 1) + &apos;</a></li>&apos;;
                                             }
                                        }
                                   }
                                   else
                                   {
                                        var p_b = page + 2;
                                        if (p_b &gt; pages)
                                        {
                                             p_b = pages; 
                                        }
                                        for (var f = page - 1; f &lt; p_b; f++)
                                        {
                                             if (f == page)
                                             {
                                                  out += &apos;<li class="current">&apos; + (f + 1) + &apos;</li>&apos;;
                                             }
                                             else
                                             {
                                                  out += &apos;<li><a class="tipue_search_foot_box" id="&apos; + (f * set.show) + &apos;_&apos; + replace + &apos;">&apos; + (f + 1) + &apos;</a></li>&apos;;
                                             }
                                        }
                                   }                         
                                                      
                                   if (page + 1 != pages)
                                   {
                                       out += &apos;<li><a class="tipue_search_foot_box" id="&apos; + (start + set.show) + &apos;_&apos; + replace + &apos;">&apos; + tipuesearch_string_7 + &apos;</a></li>&apos;; 
                                   }                    
                                   
                                   out += &apos;</=></ul></div>&apos;;
                              }                        
                         }
                         else
                         {
                              out += &apos;<div id="tipue_search_warning">&apos; + tipuesearch_string_8 + &apos;</div>&apos;; 
                         }
                    }
                    else
                    {
                         if (show_stop)
                         {
                              out += &apos;<div id="tipue_search_warning">&apos; + tipuesearch_string_8 + &apos;. &apos; + tipuesearch_string_9 + &apos;</div>&apos;;     
                         }
                         else
                         {
                              out += &apos;<div id="tipue_search_warning">&apos; + tipuesearch_string_10 + &apos;</div>&apos;;
                              if (set.minimumLength == 1)
                              {
                                   out += &apos;<div id="tipue_search_warning">&apos; + tipuesearch_string_11 + &apos;</div>&apos;;
                              }
                              else
                              {
                                   out += &apos;<div id="tipue_search_warning">&apos; + tipuesearch_string_12 + &apos; &apos; + set.minimumLength + &apos; &apos; + tipuesearch_string_13 + &apos;</div>&apos;;
                              }
                         }
                    }                
                    
                    $(&apos;#tipue_search_content&apos;).hide();
                    $(&apos;#tipue_search_content&apos;).html(out);
                    $(&apos;#tipue_search_content&apos;).slideDown(200);
                    
                    $(&apos;#tipue_search_replaced&apos;).click(function()
                    {
                         getTipueSearch(0, false);
                    });                
               
                    $(&apos;.tipue_search_foot_box&apos;).click(function()
                    {
                         var id_v = $(this).attr(&apos;id&apos;);
                         var id_a = id_v.split(&apos;_&apos;);
                    
                         getTipueSearch(parseInt(id_a[0]), id_a[1]);
                    });                                                       
               }          
          
          });
     };
   
})(jQuery);
