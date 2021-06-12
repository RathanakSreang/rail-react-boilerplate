class AddPlanToUser < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :plan, :integer, default: 0
  end
end
