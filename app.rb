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

  get "/styles.css" do
    scss :trebek
  end

  get "/" do
    haml :index
  end

  get "/games/new/" do
    haml :game_form
  end

  post "/games/jeopardy/" do
    # @game = Game.new(Deck.new("data/#{params[:deck_file]}.yml"))
    haml :results
  end

  get "/games/:type/:deck_file" do
    deck = Deck.new("data/#{params[:deck_file]}.yml")
    @cards = deck.cards
    haml :"#{params[:type]}"
  end

  get "/games/students/:type/:deck_file" do
    deck = Deck.new("data/#{params[:deck_file]}.yml")
    @cards = deck.cards
    haml :"#{params[:type]}2"
  end

  get "/decks/:deck_file" do
    deck = Deck.new("data/#{params[:deck_file]}.yml")
    @cards = deck.cards
    haml :deck
  end

  get "/:deck_file" do
    @deck = YAML::load(File.open("data/#{params[:deck_file]}.yml"))
    haml :test
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