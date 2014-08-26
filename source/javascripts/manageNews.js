function manageNews () {

    var initPrismicApi = function ()
    {
        Prismic.Api(Configuration.apiEndpoint, doQuery)
    }

    var doQuery = function (err, Api)
    {
        Api.form('everything').ref(Api.master()).query('[[:d = at(document.type, "news")]]').orderings('[my.news.date desc]').submit(getData)
    }

    var getData = function (err, documents)
    {
        if (err) { console.log(err); return; }

        new EJS({url: '/javascripts/ejs-templates/listNews.js'}).update('results', documents)

    }


    this.doList = function ()
    {

        results = initPrismicApi ()
    }

    var initPrismicApiForDetail = function ()
    {
        Prismic.Api(Configuration.apiEndpoint, doQueryDetail)
    }

    var doQueryDetail = function (err, Api)
    {
        url = $.url();
        param = url.param('slug');
        console.log(param);

        if (param)
        {
            Api.form('everything').ref(Api.master()).query('[[:d = fulltext(my.news.title, "'+ param +'")]]').submit(getDataDetail);
        }
        else
        {
            window.location.href = "/news";
        }


    }

    var getDataDetail = function (err, documents)
    {
        if (err) { console.log(err); return; }

        console.log (documents);

        if (documents.results.length == 0 )
        {
            window.location.href = "/news";
        }

        document.title = documents.results[0].getText('news.title');

        new EJS({url: '/javascripts/ejs-templates/detailNews.js'}).update('results', documents)

    }


    this.doDetail = function ()
    {

        results = initPrismicApiForDetail ()
    }

    var initPrismicApiForAside = function ()
    {
        Prismic.Api(Configuration.apiEndpoint, doQueryAside)
    }

    var doQueryAside = function (err, Api)
    {

            Api.form('everything').ref(Api.master()).query('[[:d = at(document.type, "news")]]').orderings('[my.news.date desc]').pageSize(10).page(1).submit(getDataAside)

    }

    var getDataAside = function (err, documents)
    {
        if (err) { console.log(err); return; }

        new EJS({url: '/javascripts/ejs-templates/asideNews.js'}).update('asideResults', documents)

    }

    this.doAside = function ()
    {

        results = initPrismicApiForAside ()
    }


}