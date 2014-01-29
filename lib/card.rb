class Card
  attr_reader :price, :question, :answer

  def initialize(data)
    @price, @question, @answer = data["price"], data["question"], data["answer"];
  end

end