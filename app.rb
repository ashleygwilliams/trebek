require "bundler"
Bundler.require

Dir.glob('./lib/*.rb') do |model|
  require model
end

class Gambit < Sinatra::Application

  configure do
    set :root, File.dirname(__FILE__)
    set :public_folder, 'public'
  end

  get "/" do
    haml :index
  end

  get "/deck/:file_name" do
    deck = Deck.new("data/#{params[:file_name]}.yml")
    @cards = deck.cards
    haml :deck
  end

  get "/styles.css" do
    scss :trebek
  end

  helpers do

    def partial(template,locals=nil)
      if template.is_a?(String) || template.is_a?(Symbol)
        template = :"_#{template}"
      else
        locals=template
        template = template.is_a?(Array) ? :"_#{template.first.class.to_s.downcase}" : :"_#{template.class.to_s.downcase}"
      end
      if locals.is_a?(Hash)
        haml template, {}, locals      
      elsif locals
        locals=[locals] unless locals.respond_to?(:inject)
        locals.inject([]) do |output,element|
          output << haml(template,{template.to_s.delete("_").to_sym => element})
        end.join("\n")
      else 
        haml template
      end
    end
    
  end

end