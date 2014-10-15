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