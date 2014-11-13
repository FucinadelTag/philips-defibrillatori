function manageBlog () {

    var initPrismicApi = function ()
    {
        Prismic.Api(Configuration.apiEndpoint, doQuery)
    }

    var doQuery = function (err, Api)
    {
        Api.form('everything').ref(Api.master()).query('[[:d = at(document.type, "blog")]]').orderings('[my.blog.date desc]').submit(getData)
    }

    var getData = function (err, documents)
    {
        if (err) { console.log(err); return; }

        new EJS({url: '/javascripts/ejs-templates/listBlog.js'}).update('results', documents)

    }


    this.doList = function ()
    {

        results = initPrismicApi ()
    }


    //DETAIL
    var initPrismicApiForDetail = function ()
    {
        Prismic.Api(Configuration.apiEndpoint, doQueryDetail)
    }

    var doQueryDetail = function (err, Api)
    {
        url = $.url();
        param = url.param('id');
        console.log(param);

        if (param)
        {
            Api.form('everything').ref(Api.master()).query('[[:d = at(document.id, "'+ param +'")]]').submit(getDataDetail);
        }
        else
        {
            window.location.href = "/preview_blog";
        }


    }

    var getDataDetail = function (err, documents)
    {
        if (err) { console.log(err); return; }

        console.log (documents);

        document.title = documents.results[0].getText('blog.title');

        new EJS({url: '/javascripts/ejs-templates/detailBlog.js'}).update('results', documents)

    }


    this.doDetail = function ()
    {

        results = initPrismicApiForDetail ()
    }


}