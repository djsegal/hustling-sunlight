class CreatePhrases < ActiveRecord::Migration[5.1]
  def change
    create_table :phrases do |t|
      t.string :first_word
      t.string :last_word
      t.integer :position

      t.timestamps
    end
  end
end
