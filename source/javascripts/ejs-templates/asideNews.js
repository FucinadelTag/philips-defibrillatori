<% for(var i=0; i<results.length; i++) {%>
   <li>
    <%= link_to(results[i].getText('news.title'), '/news/view/?slug='+results[i].slug) %> <i><%= results[i].getDate('news.date') %></i>
    </li>
<%}%>