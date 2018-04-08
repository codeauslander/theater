class OrdersController < ApplicationController
  before_action :set_order, only: [:show, :update, :destroy]

  # GET /orders
  def index
    @orders = Order.all

    render json: @orders
  end

  # GET /orders/1
  def show
    render json: @order
  end

  # POST /orders
  def create
    @order = Order.new(
        user_id: params[:user_id],
        credit_card: params[:credit_card],
        expiration_date: params[:expiration_date]
      )

    if @order.save
      total = 0
      params[:tickets].each do |ticket|
        puts ticket
        Ticket.create!(
          {
            movie_id: ticket[:movie_id],
            order_id: @order.id
          })
        total += ticket[:movie_price]
      end

      @order.update(total: total)

      render json: @order, status: :created, location: @order
    else
      render json: @order.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /orders/1
  def update
    if @order.update(order_params)
      render json: @order
    else
      render json: @order.errors, status: :unprocessable_entity
    end
  end

  # DELETE /orders/1
  def destroy
    @order.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_order
      @order = Order.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def order_params
      params.require(:order).permit(:user_id, :credit_card, :expiration_date)
    end
end
