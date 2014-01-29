require 'yaml'

class Deck 
  attr_reader :cards

  def initialize(path)
    @cards = []
    data = YAML::load(File.open(path))
    data.each do |card_data|
      @cards << Card.new(card_data)
    end
  end
  
end