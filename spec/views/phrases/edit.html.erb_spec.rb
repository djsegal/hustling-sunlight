require 'rails_helper'

RSpec.describe "phrases/edit", type: :view do
  before(:each) do
    @phrase = assign(:phrase, Phrase.create!(
      :first_word => "Signed",
      :last_word => "Design",
      :position => 1
    ))
  end

  it "renders the edit phrase form" do
    render

    assert_select "form[action=?][method=?]", phrase_path(@phrase), "post" do

      assert_select "input[name=?]", "phrase[first_word]"

      assert_select "input[name=?]", "phrase[last_word]"

      assert_select "input[name=?]", "phrase[position]"
    end
  end
end
