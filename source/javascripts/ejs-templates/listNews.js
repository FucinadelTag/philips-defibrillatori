<% for(var i=0; i<results.length; i++) {%>
   <li>
        <article>
            <div class="row">
                <div class="large-12 medium-12  columns">
                    <h2><%= link_to(results[i].getText('news.title'), '/news/view/?slug='+results[i].slug) %></h2>
                </div>
            </div>
            <div class="row">
                <div class="large-5 medium-5 columns">
                    <%= link_to(results[i].getImageView('news.image', 'hitlist').asHtml(), '/news/view/?slug='+results[i].slug) %>
                </div>
                <div class="large-7 columns">
                    <p>
                        <i>
                            <%= results[i].getText('news.abstract') %>
                        </i>
                    </p>
                    <p>
                        <%= link_to('Leggi tutto...', '/news/view/?slug='+results[i].slug) %></h3>
                    </p>
                </div>
            </div>
        </article>
    </li>
    <hr>
<%}%>