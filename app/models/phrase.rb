# == Schema Information
#
# Table name: phrases
#
#  id         :integer          not null, primary key
#  first_word :string
#  last_word  :string
#  position   :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Phrase < ApplicationRecord

  before_validation :downcase_words

  validates :first_word, presence: true, uniqueness: { case_sensitive: false }
  validates :last_word, presence: true, uniqueness: { case_sensitive: false }

  validate :same_length
  validate :same_letters
  validate :unique_words
  validate :different_word

  def downcase_words
    self.first_word.downcase! \
      if self.first_word.present?

    self.last_word.downcase! \
      if self.last_word.present?
  end

  def same_length
    return unless \
      first_word.present? && last_word.present?

    return if first_word.length == last_word.length
    errors.add(:first_word, "must be same length")
  end

  def same_letters
    return unless \
      first_word.present? && last_word.present?

    first_characters = Set.new first_word.chars
    last_characters = Set.new last_word.chars

    return if first_characters == last_characters
    errors.add(:first_word, "must have same letters")
  end

  def unique_words
    not_unique = !Phrase.where(first_word: last_word).empty?
    not_unique |= !Phrase.where(last_word: first_word).empty?

    return unless not_unique
    errors.add(:first_word, "must be unique word")
  end

  def different_word
    return unless \
      first_word.present? && last_word.present?

    return if first_word != last_word
    errors.add(:first_word, "must be a different word")
  end

end
