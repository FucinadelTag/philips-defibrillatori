<% for(var i=0; i<results.length; i++) {%>
        <article>
            <div class="row">
                <div class="large-12 medium-12  columns">
                    <%= link_to(results[i].getText('blog.title'), '/preview_blog/view/?id='+results[i].id) %>
                </div>
            </div>
        </article>
    <hr>
<%}%>