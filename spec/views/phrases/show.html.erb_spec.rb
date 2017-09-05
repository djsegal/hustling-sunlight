require 'rails_helper'

RSpec.describe "phrases/show", type: :view do
  before(:each) do
    @phrase = assign(:phrase, Phrase.create!(
      :first_word => "Optic",
      :last_word => "Topic",
      :position => 2
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(/optic/)
    expect(rendered).to match(/topic/)
    expect(rendered).to match(/2/)
  end
end
