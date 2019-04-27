class Trip < ApplicationRecord
  validates :destination, :start_date, :end_date, presence: true

  belongs_to :user
end
