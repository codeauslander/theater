class CreateMovies < ActiveRecord::Migration[5.1]
  def change
    create_table :movies do |t|
      t.integer :cinema_id
      t.string :name
      t.datetime :showtime
      t.integer :duration
      t.integer :seats

      t.timestamps
    end
  end
end
