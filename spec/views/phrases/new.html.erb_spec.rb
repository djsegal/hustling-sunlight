require 'rails_helper'

RSpec.describe "phrases/new", type: :view do
  before(:each) do
    assign(:phrase, Phrase.new(
      :first_word => "Arts",
      :last_word => "Star",
      :position => 1
    ))
  end

  it "renders new phrase form" do
    render

    assert_select "form[action=?][method=?]", phrases_path, "post" do

      assert_select "input[name=?]", "phrase[first_word]"

      assert_select "input[name=?]", "phrase[last_word]"

      assert_select "input[name=?]", "phrase[position]"
    end
  end
end
