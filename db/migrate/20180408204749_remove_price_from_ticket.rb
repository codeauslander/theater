class RemovePriceFromTicket < ActiveRecord::Migration[5.1]
  def change
    remove_column :tickets, :price, :integer
    add_column :movies, :price, :integer
  end
end
