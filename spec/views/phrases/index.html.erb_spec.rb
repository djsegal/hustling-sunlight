require 'rails_helper'

RSpec.describe "phrases/index", type: :view do
  before(:each) do
    assign(:phrases, [
      Phrase.create!(
        :first_word => "Hustling",
        :last_word => "Sunlight",
        :position => 1
      ),
      Phrase.create!(
        :first_word => "Lure",
        :last_word => "Rule",
        :position => 2
      )
    ])
  end

  it "renders a list of phrases" do
    render

    assert_select "tr>td", :text => "hustling".to_s, :count => 1
    assert_select "tr>td", :text => "sunlight".to_s, :count => 1
    assert_select "tr>td", :text => 1.to_s, :count => 1

    assert_select "tr>td", :text => "lure".to_s, :count => 1
    assert_select "tr>td", :text => "rule".to_s, :count => 1
    assert_select "tr>td", :text => 1.to_s, :count => 1
  end
end
