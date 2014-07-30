var Configuration = {

  // -- API endpoint
  apiEndpoint: 'https://philips-defibrillatori.prismic.io/api',
}

$.cookie.json = true;

function manageHeader () {

    var headerData = {};
    headerData['default'] = {};

    var paramOk = 'default';

    var setParam = function ()
    {
        url = $.url();
        param = url.param('t');

        if (param)
        {
            paramOk = param
            $.cookie('target', param, { expires: 60 });
            return;
        }

        if  ($.cookie('target'))
        {
            paramOk = ($.cookie('target'));
            return;
        }

    }

    var initPrismicApi = function ()
    {
        Prismic.Api(Configuration.apiEndpoint, doQuery);
    }

    var doQuery = function (err, Api)
    {
        Api.form('everything').ref(Api.master()).query('[[:d = fulltext(my.testate-pagine.target, "'+ paramOk +'")]]').submit(getData);

    }

    var getData = function (err, documents)
    {
        if (err) { console.log(err); return; }

        if (documents.results.length > 0)
        {
            headerData[paramOk] = {
                prima_linea: documents.results[0].getText('testate-pagine.prima-linea'),
                seconda_linea: documents.results[0].getText('testate-pagine.seconda-linea'),
                image_testata: documents.results[0].getImageView('testate-pagine.image', 'wide').url
            };

            changeHeader (headerData[paramOk]);



        }
        else
        {
            headerData[paramOk] = {};
        }

        $.cookie('headerData', headerData, { expires: 30 });

    }

    var changeHeader = function (data) {

        $('#prima-linea').html(data['prima_linea']);
        $('#seconda-linea').html(data['seconda_linea']);
        $('#image-testata').attr("src", data['image_testata']);
    }

    var manageData = function ()
    {

        headerDataCookie = $.cookie('headerData');

        if (headerDataCookie)
        {
            headerData = headerDataCookie;
        }

        if(headerData[paramOk])
        {
            changeHeader (headerData[paramOk]);
        }
        else
        {
            Api = initPrismicApi ();
        }

    }

    this.doManage = function ()
    {
        setParam ();

        manageData ();

        //console.log ($.cookie('headerData'));

    };
}