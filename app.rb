require "bundler"
Bundler.require

class Trebek < Sinatra::Application

    configure do
      set :root, File.dirname(__FILE__)
      set :public_folder, 'public'
    end

  get "/" do
    haml :index
  end

  get "/styles.css" do
    scss :trebek
  end

  helpers do

    def partial(file)
      haml :"_#{file}", :layout => false
    end
  end

end