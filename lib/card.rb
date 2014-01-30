class Card
  attr_reader :category, :value, :question, :answer

  def initialize(data)
    @category, @value, @question, @answer = data["category"], data["value"], data["question"], data["answer"];
  end

end