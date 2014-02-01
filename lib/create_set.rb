# require 'yaml'

# def offset_color(hash)
#   if hash["color"] == "blue"
#     hash["width"] -= 99
#   elsif hash["color"] == "green"
#     hash["width"] -= 198
#   end
# end

# def offset_symbol(hash)
#   if hash["symbol"] == "diamond"
#     hash["height"] -= 55
#   elsif hash["symbol"] == "squiggle"
#     hash["height"] -= 110
#   end
# end

# def offset_shade(hash)
#   if hash["shade"] == "open"
#     hash["width"] -= 33
#   elsif hash["shade"] == "striped"
#     hash["width"] -= 66
#   end
# end

# numbers = [1, 2, 3]
# symbols = ["diamond", "squiggle", "oval"]
# shades = ["solid", "striped", "open"]
# colors = ["red", "blue", "green"]
# options = [numbers, symbols, shades, colors]

# cards = options.inject(&:product).map(&:flatten)
# collection = []

# cards.each do |card|
#   hash = {}
#   hash["width"] = 0
#   hash["height"] = 0
#   hash["number"] = card[0]
#   hash["symbol"] = card[1]
#   hash["shade"] = card[2]
#   hash["color"] = card[3]
#   offset_color(hash)
#   offset_symbol(hash)
#   offset_shade(hash)
#   collection << hash
# end

# File.open('../data/set.yml', 'w') do |f|
#   f.puts YAML::dump(collection)
# end