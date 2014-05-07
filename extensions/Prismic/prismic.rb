require 'middleman-core'
require 'prismic'

# The Contentful Middleman extensions allows to load managed content into Middleman projects through the Contentful Content Management Platform.
class PrismicMiddleman < ::Middleman::Extension

  def initialize(app, options_hash={}, &block)
    super
  end

  helpers do
    def prismic_search_form ()
        api = Prismic.api ('https://philips-defibrillatori.prismic.io/api');
        ref = api.master();
        results = api.form('everything').query('[[:d = at(document.type, "blog")]]').submit(ref)
        return results
    end
  end
end


