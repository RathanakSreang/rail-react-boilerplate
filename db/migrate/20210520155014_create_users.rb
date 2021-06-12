class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users, id: :uuid do |t|
      t.string :username
      t.string :password_digest
      t.string :email

      t.string   :reset_password_token
      t.datetime :reset_password_sent_at

      t.timestamps
    end

    add_index :users, :reset_password_token, unique: true
  end
end
