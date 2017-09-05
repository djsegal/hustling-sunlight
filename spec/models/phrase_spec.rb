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

require 'rails_helper'

RSpec.describe Phrase, type: :model do

  context 'manual input' do

    it "checks for name presence" do
      expect {
        Phrase.create!(first_word: "bedroom")
      }.to raise_error(
        ActiveRecord::RecordInvalid,
        "Validation failed: Last word can't be blank"
      )

      expect {
        Phrase.create!(last_word: "boredom")
      }.to raise_error(
        ActiveRecord::RecordInvalid,
        "Validation failed: First word can't be blank"
      )

      expect {
        Phrase.create!(first_word: "bedroom", last_word: nil)
      }.to raise_error(
        ActiveRecord::RecordInvalid,
        "Validation failed: Last word can't be blank"
      )

      expect {
        Phrase.create!(first_word: "", last_word: "boredom")
      }.to raise_error(
        ActiveRecord::RecordInvalid,
        "Validation failed: First word can't be blank"
      )
    end

    it "checks for same characters" do
      expect {
        Phrase.create!(first_word: "bar", last_word: "baz")
      }.to raise_error(
        ActiveRecord::RecordInvalid,
        "Validation failed: First word must have same letters"
      )
    end

    it "checks for same length words" do
      expect {
        Phrase.create!(first_word: "moo", last_word: "mooo")
      }.to raise_error(
        ActiveRecord::RecordInvalid,
        "Validation failed: First word must be same length"
      )
    end

    it "checks for redundancy" do
      expect {
        Phrase.create!(first_word: "bang", last_word: "bang")
      }.to raise_error(
        ActiveRecord::RecordInvalid,
        "Validation failed: First word must be a different word"
      )
    end

    it "downcases everything" do
      cur_phrase = Phrase.create! first_word: "COSMIC", last_word: "CoMiCs"

      expect(cur_phrase.first_word).to eq "cosmic"
      expect(cur_phrase.last_word).to eq "comics"
    end

    it "requires unique words", focus: true do
      expect{
        Phrase.create!(first_word: "lame", last_word: "male")
      }.to change{Phrase.count}.from(0).to(1)

      expect {
        Phrase.create!(first_word: "lame", last_word: "meal")
      }.to raise_error(
        ActiveRecord::RecordInvalid,
        "Validation failed: First word has already been taken"
      )

      expect {
        Phrase.create!(first_word: "male", last_word: "meal")
      }.to raise_error(
        ActiveRecord::RecordInvalid,
        "Validation failed: First word must be unique word"
      )
    end

  end

end
