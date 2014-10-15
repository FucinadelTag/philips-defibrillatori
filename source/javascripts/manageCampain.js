function manageCampain () {

    var campaignData = {};

    var paramsToGet = {
        generic: {
                    utm_source: 'source',
                    utm_medium: 'medium',
                    utm_campaign: 'campaign',
                    gclid: 'source'
                }
    };

    var setParam = function ()
    {
        url = $.url();

        campaignObject = {};


        $.each(paramsToGet.generic, function(key, value) {

            paramValue = url.param(key);

            if (paramValue)
            {
                if (key == 'gclid')
                {
                    campaignObject[value] = 'google';
                }
                else
                {
                    campaignObject[value] = paramValue;
                }

            }

        });


        if (jQuery.isEmptyObject(campaignObject))
        {
            return;
        }
        else
        {
            $.cookie('campaign', campaignObject, { expires: 60 });
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

    var updateWufoo = function (fieldID, string)
    {
        if($(".wufooNew").length)
        {
            $(".wufooNew").html($(".wufooNew").html().replace(fieldID, string));
            //console.log ($(".wufooNew").html());
        }
    }

    var manageData = function ()
    {

        campaignObjectFromCookie = $.cookie('campaign');

        if (jQuery.isEmptyObject(campaignObjectFromCookie))
        {
            updateWufoo ('::field451Data::', 'NULLA');

        }
        else
        {
            updateWufoo ('::field451Data::', campaignObjectFromCookie['source']);

        }


    }

    this.doManage = function ()
    {
        setParam ();

        manageData ();

        //console.log ($.cookie('headerData'));

    };
}