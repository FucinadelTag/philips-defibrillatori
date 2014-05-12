$(document).foundation();

function manageReferrerCampaign () {

    var paramsToGet = {
        google: { param: 'gclid'},
        generic: {
                    utm_source: 'source',
                    utm_medium: 'medium',
                    utm_campaign: 'campaign'
                }
    };

    var getParameterByName = function (name)
    {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
        return results == null ? false : decodeURIComponent(results[1].replace(/\+/g, " "));
    };

    this.getCampaignData = function ()
    {
        campaignObject = {};

        $.each(paramsToGet.generic, function(key, value) {

            paramValue = getParameterByName(key);


            if (paramValue)
            {
                campaignObject[value] = paramValue;
            }

        });

        return campaignObject;
    };

    this.saveCampaignData = function ()
    {
        if (localStorage.campaignData)
        {
            return this.getCampaignData ();
        }
        else
        {
            campaignData = this.getCampaignData ();

            localStorage.campaignData = JSON.stringify(campaignData);

            return campaignData;
        }


    };

    this.getCampaignData = function ()
    {
        if (!localStorage.campaignData)
        {
            return {};
        }
        campaignData = JSON.parse(localStorage.campaignData);

        return campaignData
    };

    this.getDataForDefaultValue = function ()
    {
        campaignData = this.getCampaignData ();

        campagnString = '';

        $.each(campaignData, function( index, value ) {
            campagnString = ( campagnString + index + ":" + value + ".");
        });

        return campagnString;
    }
};