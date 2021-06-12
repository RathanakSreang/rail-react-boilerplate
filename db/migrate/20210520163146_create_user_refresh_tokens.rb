class CreateUserRefreshTokens < ActiveRecord::Migration[6.0]
  def change
    create_table :user_refresh_tokens, id: :uuid do |t|
      t.uuid  :user_id
      t.string   :refresh_token
      t.datetime  :expires_at

      t.timestamps
    end

    add_index :user_refresh_tokens, :refresh_token, unique: true
  end
end
