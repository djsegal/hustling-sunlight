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
#  slug       :string
#
# Indexes
#
#  index_phrases_on_slug  (slug) UNIQUE
#

require 'rails_helper'

RSpec.describe Phrase, type: :model do

  context 'seed input' do
    phrase_file = Rails.root.join('db', 'seeds', 'phrases.yml')
    phrase_list = YAML::load_file(phrase_file)

    phrase_list.shuffle.each do |cur_phrase|
      cur_test_name = "#{cur_phrase["first_word"]} - #{cur_phrase["last_word"]}"

      it "works for: #{cur_test_name}" do
        expect {
          Phrase.create! cur_phrase
        }.to_not raise_error
      end
    end
  end

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
        Phrase.create!(first_word: "bad", last_word: "bar")
      }.to raise_error(
        ActiveRecord::RecordInvalid,
        "Validation failed: First word must have same letters"
      )
    end

    it "checks for same length words" do
      expect {
        Phrase.create!(first_word: "stop", last_word: "stoop")
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

    it "requires unique words" do
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
