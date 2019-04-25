class CreateTrips < ActiveRecord::Migration[5.2]
  def change
    create_table :trips do |t|
      t.string    :destination, null: false
      t.text      :comment
      t.date      :start_date, null: false
      t.date      :end_date, null: false

      t.timestamps
    end
  end
end
