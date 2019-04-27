class StaticPagesController < ApplicationController
  skip_before_action :require_logged_in
  def root
  end
end
