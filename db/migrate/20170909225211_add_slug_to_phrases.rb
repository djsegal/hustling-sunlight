class AddSlugToPhrases < ActiveRecord::Migration[5.1]
  def change
    add_column :phrases, :slug, :string
    add_index :phrases, :slug, unique: true
  end
end
