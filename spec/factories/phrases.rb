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

FactoryGirl.define do
  factory :phrase do
    first_word "hustling"
    last_word "sunlight"
    position 1
  end
end
