export enum OrderStatus{
  //when the order is order has been created , but the ticket he is trying to 
  //order/purchase has not been reserved yet
  Created = "created",

  //the ticket the order is trying to reserve has already been reserved ,
  //or when the user has cancelled the order
  //the order expires before payment
  Cancelled = "cancelled",

  //the order has scessfully reserved the ticket 
  ///meaning the timer is set to vanish it from the view
  AwaitingPayment = "awaiting:payment",

  //the order has reserved the ticket and the user has provided the payment
  Complete = "complete"
}