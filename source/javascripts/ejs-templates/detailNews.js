<% for(var i=0; i<results.length; i++) {%>
        <article>
            <div class="row">
                <div class="large-12 medium-12 columns">
                    <h1><%= results[i].getText('news.title') %></h1>
                </div>
            </div>
            <div class="row">
                <div class="large-5 medium-5 columns">
                    <%= results[i].getImageView('news.image', 'hitlist').asHtml() %>
                </div>
                <div class="large-7 medium-7 columns">
                    <p>
                        <i>
                            <%= results[i].getDate('news.date') %><br />
                            <%= results[i].getText('news.abstract') %>

                        </i>

                    </p>
                </div>
            </div>
            <p/>
            <div class="row">
                <div class="large-12 medium-12 columns">
                        <%= results[i].getStructuredText('news.body').asHtml () %>

                        <p>
                            <i>Fonte: <a href="<%= results[i].getText('news.fonte') %>" target="_blank"><%= results[i].getText('news.fonte') %></a></i>
                        </p>
                </div>
            </div>
        </article>
<%}%>