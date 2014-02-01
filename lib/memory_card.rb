class Card
  attr_reader :points, :siblings

  def initialize(data)
    @points, @siblings = data["points"], data["siblings"];
  end

end