# /Users/dan/code/hustling-sunlight/config/initializers/lemmatizer.rb

# Assuming Lemmatizer is a class
class LemmatizerInitializer
  # Initialize the Lemmatizer instance
  @@lemmatizer = Lemmatizer.new

  # Define a class method to access the Lemmatizer instance
  def self.lemmatizer
    @@lemmatizer
  end
end
