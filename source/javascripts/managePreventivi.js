function managePreventivi () {

    var preventivoData = {};
    preventivoData['default'] = {};

    var paramOk = 'default';

    var setParam = function ()
    {
        url = $.url();
        param = url.param('p');

        if (param)
        {
            paramOk = param
            $.cookie('preventivo', param, { expires: 60 });
            return;
        }

        if  ($.cookie('preventivo'))
        {
            paramOk = ($.cookie('preventivo'));
            return;
        }

    }

    var initOsmekApi = function ()
    {
        $.ajax({
                url: "https://api.osmek.com/feed/jsonp",

                dataType: "jsonp",

                data: {api_key: OsmekConfiguration.api_key, section_id: OsmekConfiguration.section_id, format: 'JSON'},

                // work with the response
                success: function( response, status ) {
                    getData( response, status ); // server response
                }
        });

    }


    var getData = function (response, status)
    {
        if (status != 'success') { console.log(err); return; }

        console.log(response); // server response

        if (response.items.length > 0)
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

        preventivoDataCookie = $.cookie('preventivoData');

        if (preventivoDataCookie)
        {
            preventivoData = preventivoData;
        }

        if(preventivoData[paramOk])
        {
            changeHeader (preventivoData[paramOk]);
        }
        else
        {
            Api = initOsmekApi ();
        }

    }

    this.doManage = function ()
    {
        setParam ();

        manageData ();

        //console.log ($.cookie('headerData'));

    };
}